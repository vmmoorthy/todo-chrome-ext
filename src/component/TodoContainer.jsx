import { createContext, useEffect, useRef, useState } from "react";
import { update } from "storage_engine";
import { v4 as uuidv4 } from 'uuid';
import { DB } from "../App";
import PriorityContext from "../context/priorityContext";
import Text from "./Text";
import TextInput from "./TextInput";
import TodoList from "./TodoList";


export const todoListSetstateContext = createContext([]);

const TodoContainer = ({ val, deleteTodo }) => {

    const [todo, setTodo] = useState(val || {
        title: "",
        uuid: "0" + uuidv4(),
        list: [{
            type: "text",// text||todo||pic||aud||video
            content: "",
            uuid: uuidv4(),
        },
        {
            uuid: uuidv4(),
            type: "todo",
            content: [{
                uuid: uuidv4(),
                todo: "",
                status: false
            }],
        }],
    });

    
    useEffect(() => {

            if (DB.db) {
                update(DB.db, "notes", { ...todo, list: todo.list.map(i => i.uuid) });

                todo.list.forEach(i => {
                    update(DB.db, "todo", i);
                })
            }

        // else
        //     setTimeout(() => update(DB.db, "notes", todo), 100);
    }, [todo]);



    const addElement = (ele) => {
        if (ele === "notes") {
            setTodo(p => ({
                ...p, list: [...p.list, {
                    type: "text",
                    // pinned: false,
                    content: "",
                    uuid: uuidv4(),
                },]
            }))
        } else if (ele === "checkBox") {
            setTodo(p => ({
                ...p, list: [...p.list, {
                    type: "todo",
                    pinned: false,
                    uuid: uuidv4(),
                    content: [{
                        uuid: uuidv4(),
                        todo: "",
                        status: false
                    }],
                }]
            }))

        }
    }



    return (
        <div className="todoContainer w-[23rem] h-full relative">
            <div className="addToolsModel bg-[#6A1B4D] absolute p-2 rounded-[8px] right-[-0.1rem] top-4 flex flex-col gap-4">
                {/* Notes */}
                <svg onClick={() => addElement("notes")} className='cursor-pointer hover:bg-sky-300 rounded' width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 36H30V32H6V36ZM6 12V16H42V12H6ZM6 26H42V22H6V26Z" fill="white" />
                </svg>
                {/* check box todo */}
                <svg onClick={() => addElement("checkBox")} className='cursor-pointer hover:bg-sky-300 rounded' width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 17.9996V13.9996H44V17.9996H26ZM26 33.9996V29.9996H44V33.9996H26ZM11.1 21.9996L4 14.8996L6.8 12.0996L11.05 16.3496L19.55 7.84961L22.35 10.6996L11.1 21.9996ZM11.1 37.9996L4 30.8996L6.8 28.0996L11.05 32.3496L19.55 23.8496L22.35 26.6996L11.1 37.9996Z" fill="white" />
                </svg>
                {/* picture */}
                <svg onClick={() => addElement("pic")} className='cursor-pointer hover:bg-sky-300 rounded' width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 6H10C7.794 6 6 7.794 6 10V38C6 40.206 7.794 42 10 42H38C40.206 42 42 40.206 42 38V10C42 7.794 40.206 6 38 6ZM10 38V10H38L38.004 38H10Z" fill="white" />
                    <path d="M20 28L18 26L12 34H36L26 20L20 28Z" fill="white" />
                </svg>
                {/* Audio */}
                <svg onClick={() => addElement("aud")} className='cursor-pointer hover:bg-sky-300 rounded' width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.7996 4.7998L38.3996 14.3998V43.1998H9.59961V4.7998H28.7996ZM28.7996 14.3998H35.9996L28.7996 7.1998V14.3998ZM31.1996 31.8238V19.4158C31.201 19.2864 31.1762 19.158 31.1267 19.0384C31.0772 18.9188 31.0041 18.8104 30.9116 18.7198C30.8324 18.6287 30.7315 18.5589 30.6183 18.517C30.505 18.475 30.3831 18.4623 30.2636 18.4798C30.2636 18.4798 20.7356 20.1838 20.0636 20.3518C19.3676 20.4958 19.1996 21.1198 19.1996 21.5998V29.6878C18.7196 29.4718 18.1916 29.5198 17.7596 29.5198C16.8476 29.5198 16.0796 29.8318 15.4556 30.4558C14.8316 31.1038 14.4956 31.8478 14.4956 32.7598C14.4956 33.6478 14.8316 34.4158 15.4556 35.0398C16.0796 35.6878 16.8476 35.9998 17.7596 35.9998C18.5756 35.9998 19.4396 35.9038 20.0636 35.3758C20.6876 34.8238 21.5996 33.8158 21.5996 32.6878V24.7198L28.7996 23.2798V28.7998C27.1916 28.3198 25.9916 28.8958 25.3436 29.5438C24.7196 30.1678 24.4076 30.9358 24.4076 31.8238C24.4076 32.7358 24.7196 33.4798 25.3436 34.1278C25.9916 34.7518 27.0476 35.0638 27.9356 35.0638C28.8476 35.0638 29.6156 34.7518 30.2396 34.1278C30.8636 33.4798 31.1996 32.7358 31.1996 31.8238V31.8238Z" fill="white" />
                </svg>
                {/* video */}
                <svg onClick={() => addElement("vid")} className='cursor-pointer hover:bg-sky-300 rounded' width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36 8H12C7.58172 8 4 11.5817 4 16V32C4 36.4183 7.58172 40 12 40H36C40.4183 40 44 36.4183 44 32V16C44 11.5817 40.4183 8 36 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30 24L20 18V30L30 24Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="rounded-[20px] w-80 m-2 h-[95%] relative  text-white bg-[#8D3DAF]  ">
                <div onClick={() => deleteTodo(todo.uuid)} className="closeTodo absolute opacity-20 invisible hover:opacity-100 bg-[#6A1B4D] w-6 cursor-pointer hover:bg-sky-300 rounded-full top-[-.5rem] h-6 p-1 right-[-.5rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                        <path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
                </div>
                {/* Title Edit box */}
                <TextInput cb={v => setTodo(p => ({ ...p, title: v }))} title={todo.title} />

                {/* <div className="listContainer"> */}
                <todoListSetstateContext.Provider value={setTodo}>
                    <div className="list w-full h-[36rem] p-1 rounded-[20px] rounded-t-none overflow-auto ">
                        <PriorityContext>
                            {todo.list.map((item) => {
                                if (item?.type === "text") return <Text item={item} key={item.uuid} />
                                else if (item?.type === "todo") return <TodoList item={item} key={item.uuid} />
                                else return <h1 className="text-white">Something went Wrong</h1>
                            })}
                        </PriorityContext>
                        {/* <Picture url={"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} />
                <Audio />
                <Video /> */}
                        {/* <div className="text"></div>
                <div className="todoList"></div>
                <div className="pic"></div>
                <div className="aud"></div>
                <div className="vid"></div> */}

                    </div>
                </todoListSetstateContext.Provider>
                {/* </div> */}
            </div>
        </div>
    );
}

export default TodoContainer;