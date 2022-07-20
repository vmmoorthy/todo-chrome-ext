import './App.css';
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./component/TodoList";
import Text from "./component/Text";
import Picture from "./component/Picture";
import Audio from "./component/Audio";
import Video from "./component/Video";
import { createContext, useEffect, useRef, useState } from 'react';
import RecordVideo from './component/RecordVideo';
import TextInput from './component/TextInput';
import TodoContainer from './component/TodoContainer';
import { connect, insert, getAll, update, deleteData, getAllIndexValue } from 'storage_engine'
import Priority, { ReadOnlyList } from './pages/Priority';
import Reminder from './pages/Reminder';
import { DragDropContext } from 'react-beautiful-dnd';

export let DB = { db: null /*{ transaction: (d) => console.log("nothing to do ", d) }*/ };

export const scrollToViewContext = createContext([]);

const App = () => {

    const [page, setPage] = useState("notes");
    const [scrollLeft, setScrollLeft] = useState(false);
    const [pinnedList, setPinnedList] = useState([]);
    const [scrollToView, setScrollToView] = useState(null);

    const [todos, setTodos] = useState(() => [
        //     { //master model for todo list
        //     title: "",
        //     uuid: "0" + uuidv4(), // 0 added before uuid to maintain the order
        //     list: [
        //         {
        //             type: "text",// text||todo||pic||aud||video
        //             priority: "", //uuid of priority
        //             content: "",
        //             uuid: uuidv4(),
        //         },
        //         {
        //             type: "todo",
        //             priority: "", //uuid of priority
        //             uuid: uuidv4(),
        //             content: [{
        //                 todo: "",
        //                 status: false,
        //                 uuid: uuidv4()
        //             }],
        //         }
        //     ]
        // }
    ]); //each object represents a record in 'notes' store

    const notesContainer = useRef(null);


    const deleteTodo = (uuid) => {
        let listOfTodo = todos.find(i => i.uuid === uuid).list.map(i => i.uuid);


        listOfTodo.forEach(i => {
            deleteData(DB.db, "todo", i);
        })
        deleteData(DB.db, "notes", uuid);

        setTodos(p => p.filter(i => i.uuid !== uuid));

    }

    const getPinnedList = async () => setPinnedList(await getAllIndexValue(DB.db, "todo", "pinned", 1))


    //get the data from IDB first time only
    useEffect(() => {
        (async function () {
            try {
                DB.db = await connect({
                    dbName: 'todo',
                    dbVersion: 1,
                    store: [{
                        storeName: 'notes',
                        index: [{
                            indexName: 'uuid',
                            keyPath: 'uuid',
                            options: {
                                unique: true,
                                autoIncrement: false
                            }
                        }]
                    }, {
                        storeName: 'todo',
                        index: [{
                            indexName: 'uuid',
                            keyPath: 'uuid',
                            options: {
                                unique: true,
                                autoIncrement: false
                            }
                        }, {
                            indexName: 'priority',
                            keyPath: 'priority',
                            options: {
                                unique: false,
                                autoIncrement: false
                            }
                        },
                        {
                            indexName: 'pinned',
                            keyPath: 'pinned',
                            options: {
                                unique: false,
                                autoIncrement: false
                            }
                        }
                        ]
                    }, {
                        storeName: 'priority',
                        index: [{
                            indexName: 'uuid',
                            keyPath: 'uuid',
                            options: {
                                unique: true,
                                autoIncrement: false
                            }
                        }]
                    },]
                });

                //get all the data from IDB

                const notesList = await getAll(DB.db, "notes")

                const todoList = await getAll(DB.db, "todo")

                setTodos(notesList.map(note => ({ ...note, list: note.list.map(i => todoList.find(j => j.uuid === i)) })))

            } catch (error) {
                alert(error);
                console.log(error);
            }

        }
        )();
    }, []);

    // scroll the notes container to the left most position
    useEffect(() => {
        notesContainer.current.scrollLeft = notesContainer.current.scrollWidth
    }, [scrollLeft])


    const handleDragEnd = r => {
        console.log(r);
        console.log(todos);

        const { reason, destination, source, draggableId } = r;
        if (reason !== "DROP" || !destination) return;

        const newTodos = [...todos];

        //getting sourceElement
        const [srcEle] = newTodos.find(i => i.uuid === source.droppableId).list.splice(source.index, 1);
        // adding to destination path
        newTodos.find(i => i.uuid === destination.droppableId).list.splice(destination.index, 0, srcEle);

        setTodos(newTodos);

        //DB updation of source and destination
        const newSourceTodo = newTodos.find(i => i.uuid === source.droppableId);
        update(DB.db, "notes", { ...newSourceTodo, list: newSourceTodo.list.map(i => i.uuid) });

        const newDestinationTodo = newTodos.find(i => i.uuid === destination.droppableId);
        update(DB.db, "notes", { ...newDestinationTodo, list: newDestinationTodo.list.map(i => i.uuid) });


    }


    return (
        //app container
        <div
            // onDragOverCapture={e=>console.log(e)}
            className="bg-[#222222] w-full h-screen grid grid-flow-row grid-rows-[.8fr_9.2fr]">
            {/* app title container */}
            {/* {showRV && <RecordVideo />} */}
            <div className="w-full ">
                {/* head */}

            </div>
            <div className="w-full  grid grid-flow-col grid-cols-[19fr_1fr]">
                {/* todo list container */}
                {page === "notes" &&
                    <div ref={r => notesContainer.current = r} className="grid  grid-flow-col m-1 p-4 gap-0 max-h-[99%] overflow-auto">
                        <scrollToViewContext.Provider value={[scrollToView, setScrollToView]}>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                {todos.map((v, i) => (<TodoContainer key={v.uuid} setTodo={(param) =>
                                    setTodos(p => p.map(i => {
                                        if (i.uuid === v.uuid) {
                                            const newValue = typeof param === "function" ? param(i) : param;
                                            update(DB.db, "notes", { ...newValue, list: newValue.list.map(i => i.uuid) });
                                            newValue.list.forEach(i => update(DB.db, "todo", i))
                                            return newValue
                                        }
                                        return i
                                    }))} deleteTodo={deleteTodo} todo={v} />))}
                            </DragDropContext>
                        </scrollToViewContext.Provider>
                    </div>}
                {page === "reminder" && <Reminder />}
                {page === "priority" && <Priority />}


                {/* option bar container */}
                <div className="bg-[#23C4ED] border-white overflow-auto border-solid rounded-[18px] border-[1px] min-w-[4rem] max-w-10 p-2 h-[95%] mr-2">
                    {/* notes */}
                    <div title="Notes" onClick={() => setPage("notes")} style={{ backgroundColor: page === "notes" ? "#1B98F5" : 'unset' }} tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer">
                        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.84965 11.0494H31.1496M8.84965 18.5394H31.1496M8.84965 26.0294H31.1496M8.84965 33.5294H31.1496M11.6396 1.50941C11.2677 1.48263 10.8943 1.53617 10.5449 1.66641C10.1955 1.79665 9.87815 2.00053 9.61446 2.26422C9.35077 2.52791 9.14689 2.84524 9.01665 3.19467C8.88641 3.5441 8.83287 3.91746 8.85965 4.28941H6.07965C5.7056 4.25921 5.32945 4.31066 4.97725 4.4402C4.62505 4.56973 4.3052 4.77425 4.03984 5.0396C3.77449 5.30496 3.56997 5.62481 3.44044 5.97701C3.3109 6.32921 3.25945 6.70536 3.28965 7.07941V37.7094C3.26098 38.0827 3.31357 38.4577 3.44378 38.8087C3.574 39.1596 3.77875 39.4782 4.04393 39.7424C4.30911 40.0067 4.62841 40.2103 4.97985 40.3392C5.33129 40.4682 5.7065 40.5194 6.07965 40.4894H33.9196C34.2928 40.5194 34.668 40.4682 35.0194 40.3392C35.3709 40.2103 35.6902 40.0067 35.9554 39.7424C36.2205 39.4782 36.4253 39.1596 36.5555 38.8087C36.6857 38.4577 36.7383 38.0827 36.7096 37.7094V7.07941C36.7398 6.70536 36.6884 6.32921 36.5589 5.97701C36.4293 5.62481 36.2248 5.30496 35.9595 5.0396C35.6941 4.77425 35.3743 4.56973 35.022 4.4402C34.6698 4.31066 34.2937 4.25921 33.9196 4.28941H31.1396C31.1396 0.579409 25.5696 0.579409 25.5696 4.28941H14.4296C14.4566 3.91656 14.4028 3.54228 14.272 3.19209C14.1412 2.8419 13.9364 2.52404 13.6716 2.26018C13.4068 1.99632 13.0882 1.79266 12.7375 1.6631C12.3869 1.53354 12.0124 1.48112 11.6396 1.50941V1.50941Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* timer */}
                    <div title="Timer" onClick={() => setPage("reminder")} style={{ backgroundColor: page === "reminder" ? "#1B98F5" : 'unset' }} tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer">
                        <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 42C28.8366 42 36 34.8366 36 26C36 17.1634 28.8366 10 20 10C11.1634 10 4 17.1634 4 26C4 34.8366 11.1634 42 20 42Z" stroke="white" strokeWidth="4" />
                            <path d="M24 2H16M20 2V10M31 14L34 11M20 26V20M20 26H14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* priority */}
                    <div title="Priority" onClick={() => setPage("priority")} style={{ backgroundColor: page === "priority" ? "#1B98F5" : 'unset' }} tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer">
                        <svg width="40" height="40" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 33.4961H38.75V35.9961H20V33.4961ZM20 25.1627H38.75V27.6627H20V25.1627ZM20 16.8295H38.75V19.3295H20V16.8295ZM25.625 8.49609H38.75V10.9961H25.625V8.49609Z" fill="white" />
                            <path d="M23.5938 9.6677L13.0625 3.12207V8.49582H12.5965C9.5143 8.49582 6.63359 9.96105 4.48438 12.6216C2.39844 15.2041 1.25 18.6221 1.25 22.2458C1.25 25.8696 2.39844 29.2875 4.48438 31.87C6.63359 34.5306 9.5143 35.9958 12.5962 35.9958H16.875V33.4958H12.5962C7.71875 33.4958 3.75 28.4489 3.75 22.2458C3.75 16.0427 7.71875 10.9958 12.5962 10.9958H13.0625V16.4043L23.5938 9.6677ZM15.5625 7.61957L18.9062 9.69824L15.5625 11.8374V7.61957Z" fill="white" />
                        </svg>
                    </div>

                    {/* add todo list */}
                    {page === "notes" && <div title='Add' onClick={() => {
                        const modelTodo = { //master model for todo list
                            title: "",
                            uuid: String(todos.length) + uuidv4(),
                            list: []
                        }
                        update(DB.db, 'notes', modelTodo)
                        setTodos(p => [...p, modelTodo])
                        setScrollLeft(p => !p)
                    }} tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer  focus:bg-[#1B98F5]">
                        <svg width="40" height="40" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35 3.49609C35.663 3.49609 36.2989 3.75949 36.7678 4.22833C37.2366 4.69717 37.5 5.33305 37.5 5.99609V35.9961C37.5 36.6591 37.2366 37.295 36.7678 37.7639C36.2989 38.2327 35.663 38.4961 35 38.4961H5C4.33696 38.4961 3.70107 38.2327 3.23223 37.7639C2.76339 37.295 2.5 36.6591 2.5 35.9961V5.99609C2.5 5.33305 2.76339 4.69717 3.23223 4.22833C3.70107 3.75949 4.33696 3.49609 5 3.49609H35ZM5 0.996094C3.67392 0.996094 2.40215 1.52288 1.46447 2.46056C0.526784 3.39824 0 4.67001 0 5.99609L0 35.9961C0 37.3222 0.526784 38.5939 1.46447 39.5316C2.40215 40.4693 3.67392 40.9961 5 40.9961H35C36.3261 40.9961 37.5979 40.4693 38.5355 39.5316C39.4732 38.5939 40 37.3222 40 35.9961V5.99609C40 4.67001 39.4732 3.39824 38.5355 2.46056C37.5979 1.52288 36.3261 0.996094 35 0.996094L5 0.996094Z" fill="white" />
                            <path d="M20 10.9961C20.3315 10.9961 20.6495 11.1278 20.8839 11.3622C21.1183 11.5966 21.25 11.9146 21.25 12.2461V19.7461H28.75C29.0815 19.7461 29.3995 19.8778 29.6339 20.1122C29.8683 20.3466 30 20.6646 30 20.9961C30 21.3276 29.8683 21.6456 29.6339 21.88C29.3995 22.1144 29.0815 22.2461 28.75 22.2461H21.25V29.7461C21.25 30.0776 21.1183 30.3956 20.8839 30.63C20.6495 30.8644 20.3315 30.9961 20 30.9961C19.6685 30.9961 19.3505 30.8644 19.1161 30.63C18.8817 30.3956 18.75 30.0776 18.75 29.7461V22.2461H11.25C10.9185 22.2461 10.6005 22.1144 10.3661 21.88C10.1317 21.6456 10 21.3276 10 20.9961C10 20.6646 10.1317 20.3466 10.3661 20.1122C10.6005 19.8778 10.9185 19.7461 11.25 19.7461H18.75V12.2461C18.75 11.9146 18.8817 11.5966 19.1161 11.3622C19.3505 11.1278 19.6685 10.9961 20 10.9961Z" fill="white" />
                        </svg>
                    </div>}

                    <div onClick={getPinnedList} tabIndex={0} className="pinned priority relative icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer  focus:bg-[#1B98F5] ">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" >
                            <path fill="#fff" d="M3 9.018V14l.005.176A3 3 0 0 0 6 17h4.379l.176-.008a2 2 0 0 0 1.238-.578l4.621-4.621l.12-.13A2 2 0 0 0 17 10.38V6l-.005-.176A3 3 0 0 0 14 3H9.463c.254.3.416.644.49 1H14l.15.005A2 2 0 0 1 16 6v4h-3l-.176.005A3 3 0 0 0 10 13v3H6l-.15-.005A2 2 0 0 1 4 14V9.81a1.815 1.815 0 0 1-.615-.407L3 9.018ZM13 11l2.783.001c-.024.03-.05.058-.076.085l-4.621 4.621l-.086.074V13l.005-.15A2 2 0 0 1 13 11ZM8.538 3.387L6.611 1.46a1.5 1.5 0 0 0-2.409.404L3.4 3.51a1 1 0 0 1-.573.507l-1.102.38a1 1 0 0 0-.38 1.653l.948.948L1 8.29v.707h.707L3 7.706l.947.947a1 1 0 0 0 1.653-.38l.38-1.102a1 1 0 0 1 .507-.572l1.647-.803a1.5 1.5 0 0 0 .404-2.409Z" />
                        </svg>
                        <div className="fixed">
                            <div className="pinedListDropdown dropDown bg-[#E07C24] border-2 border-solid border-white w-[25rem] p-2 drop-shadow-2xl rounded  right-[0rem]  absolute top-[0rem]  max-h-[21rem] overflow-auto ">
                                {/* 
                                // direct render of the pinned list
                                (() => {
                                    let arr = []
                                    todos.forEach(todo => arr = [...arr, ...todo.list.filter(i => i.pinned === 1)])
                                    return arr
                                })() */}
                                <ReadOnlyList focusToElement={setScrollToView} list={pinnedList} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;