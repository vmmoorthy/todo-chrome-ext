import { useEffect, useState } from "react";
import { getAll } from "storage_engine";
import { DB } from "../App";

const Reminder = () => {

    const [reminderList, setReminderList] = useState([])
    const [listOfTask, setListOfTask] = useState([]);

    useEffect(() => {
        (async () => {
            const list = await getAll(DB.db, "todo")
            setListOfTask(list)
            setReminderList(list.filter(t => t.time).sort((b, a) => (new Date(a.time)) - (new Date(b.time))))
        })()
    }, []);

    const changeOrder = e => {
        if (e.target.value === "asc")
            setReminderList(listOfTask.filter(t => t.time).sort((b, a) => (new Date(a.time)) - (new Date(b.time))))
        else
            setReminderList(listOfTask.filter(t => t.time).sort((a, b) => (new Date(a.time)) - (new Date(b.time))))
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="rounded-[20px] w-80 m-2 h-full text-white bg-[#8D3DAF]  ">
                <div tabIndex={0} className="priority z-20 relative transition-opacity  border-white border-solid border-[1px]    grid grid-flow-col  items-center bg-[#6A1B4D] gap-1 justify-evenly w-full h-min max-h-8 px-1 py-[0.2rem] rounded ">
                    <label htmlFor="latest" className="cursor-pointer"><input onChange={changeOrder} value="asc" type="radio" name="order" id="latest" />Latest</label>
                    <label htmlFor="oldest" className="cursor-pointer"><input onChange={changeOrder} value="desc" type="radio" name="order" id="oldest" />Oldest</label>
                </div>
                <div className="list z-0 w-full h-[36rem] p-1 rounded-[20px] rounded-t-none overflow-auto ">
                    <ReadOnlyList list={reminderList} />
                </div>
            </div>
        </div>
    );
}

export default Reminder;

const ReadOnlyText = ({ content, time }) => {
    return (
        <div className="todoContainerWraper relative mt-5">
            <div contentEditable={false} className=" grid grid-flow-col justify-end absolute z-10  top-[-1.1rem] w-full ">
                {/* time */}
                <div className=" relative   border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] time text-[.75rem] w-full h-min max-w-[8.5rem] text-center max-h-6 whitespace-nowrap rounded bg-[#6A1B4D] pl-2">
                    <input type="datetime-local"
                        defaultValue={time}
                        disabled
                        className="text-[.63rem] cursor-pointer bg-transparent w-[8.3rem] px-[0.5px] py-1 top-[-0.2rem] left-0 text-center" />
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content.replaceAll("\n", "<br/>") }} className="text relative text-white bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">
            </div>
        </div>
    );
}

const ReadOnlyList = ({ list, focusToElement }) => list.map((item) => {
    const GetTaskOption = () => {
        if (item?.type === "text") return <ReadOnlyText content={item.content} time={item.time} />
        else if (item?.type === "todo") return <ReadOnlyTodo content={item.content} time={item.time} />
        else return <h1 className="text-white">Something went Wrong</h1>
    }
    //for scroll to view
    return <div className="" key={item.uuid} onClick={() => focusToElement(item.uuid)}>
        <GetTaskOption />
    </div>
})



const ReadOnlyTodo = ({ content, time }) => {
    return (

        <div className="todoContainerWraper relative mt-5">
            <div contentEditable={false} className=" grid grid-flow-col justify-end absolute z-10  top-[-1.1rem] w-full ">
                {/* time */}
                <div className=" relative   border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] time text-[.75rem] w-full h-min max-w-[8.5rem] text-center max-h-6 whitespace-nowrap rounded bg-[#6A1B4D] pl-2">
                    <input type="datetime-local"
                        defaultValue={time}
                        disabled
                        className="text-[.63rem] cursor-pointer bg-transparent w-[8.3rem] px-[0.5px] py-1 top-[-0.2rem] left-0 text-center" />
                </div>
            </div>
            <div className="todoList bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2">
                {content.map((item) => (
                    <div key={item.uuid} className="todoItem flex flex-row items-center border-gray-400  border-solid border-[.5px] border-t-0 border-r-0 border-l-0">

                        <input type="checkbox" checked={item.status} disabled />

                        <div
                            disabled
                            placeholder="Todo..."
                            className="ml-2 w-full text-white  bg-transparent " >{item.todo}</div>
                        <div className="  cursor-pointer  remove w-4  h-min ">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}