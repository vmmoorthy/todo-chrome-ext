import { useEffect, useState } from "react";
import { getAll, getAllIndexValue } from "storage_engine";
import { DB } from "../App";
import Text from "../component/Text";
import TodoList from "../component/TodoList";

const Priority = () => {

    const [priorityList, setPriorityList] = useState([])
    const [selctedPriorityIndex, setSelctedPriorityIndex] = useState("-1");
    const [listOfTask, setListOfTask] = useState([]);



    const getPriorityList = (key) => getAllIndexValue(DB.db, "todo", "priority", key)

    useEffect(() => {
        (async () => {
            const list = await getAll(DB.db, "priority")

            const data = await getPriorityList(list[0].uuid)



            setListOfTask(data)
            setPriorityList(list)
            setSelctedPriorityIndex(list[0].uuid)
        })()
    }, []);


    useEffect(() => {
        if (selctedPriorityIndex !== "-1")
            (async () => setListOfTask(await getPriorityList(priorityList.find(d => d.uuid === selctedPriorityIndex)?.uuid)))()
    }, [selctedPriorityIndex]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="rounded-[20px] w-80 m-2 h-full text-white bg-[#8D3DAF]  ">
                {/* <div className="flex flex-col items-center justify-center h-full">
                    {
                        priorityList.map(v =>
                            <div key={v.uuid} className="Midium flex flex-row items-center justify-between hover:bg-[#6D385A]">
                                <span className="flex flex-row justify-center items-center gap-1" >
                                    <div className="color w-3 h-3 rounded-full " style={{ backgroundColor: v.color }}></div>
                                    <span >{v.text}</span>
                                </span>
                            </div>
                        )
                    }
                </div> */}
                <div tabIndex={0} className="priority z-20 relative transition-opacity  border-white border-solid border-[1px] cursor-pointer   grid grid-flow-col items-center bg-[#6A1B4D] gap-1 justify-center w-min h-min max-h-6 px-1 py-[0.2rem] rounded ">
                    <div style={{ backgroundColor: priorityList.find(d => d.uuid === selctedPriorityIndex)?.color || "#fff5" }} className="color w-3 h-3 rounded-full "></div>
                    <span className="text-[0.87rem] leading-none ">{priorityList.find(d => d.uuid === selctedPriorityIndex)?.text || "--"}</span>
                    <svg className="w-4 h-4" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.8282 11.7188H7.17195C6.40242 11.7188 5.97273 12.5313 6.44929 13.0859L19.2774 27.9609C19.6446 28.3867 20.3516 28.3867 20.7227 27.9609L33.5509 13.0859C34.0274 12.5313 33.5977 11.7188 32.8282 11.7188Z" fill="white" />
                    </svg>
                    <div className="dropDown  bg-[#6A1B4D]  border-white border-solid border-[1px] rounded p-1 absolute top-[1.5rem] ">
                        <div className="relative">
                            {priorityList.map(v =>
                                <div key={v.uuid} className="Midium flex flex-row items-center justify-between hover:bg-[#6D385A]">
                                    <span className="flex flex-row justify-center items-center gap-1" onClick={() => setSelctedPriorityIndex(v.uuid)}>
                                        <div className="color w-3 h-3 rounded-full " style={{ backgroundColor: v.color }}></div>
                                        <span>{v.text}</span>
                                    </span>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="list z-0 w-full h-[36rem] p-1 rounded-[20px] rounded-t-none overflow-auto ">
                    {listOfTask.map((item) => {
                        if (item?.type === "text") return <div key={item.uuid} className="todoContainerWraper relative mt-5">
                            <div placeholder="hello" className="text relative bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">{item.content.replaceAll("\n", "<br/>")}
                            </div>
                        </div>
                        else if (item?.type === "todo") return <div key={item.uuid} className="todoContainerWraper relative mt-5">

                            <div className="todoList bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2">
                                {item.content.map((item) => (
                                    <div key={item.uuid} className="todoItem flex flex-row items-center border-gray-400  border-solid border-[.5px] border-t-0 border-r-0 border-l-0">

                                        <input type="checkbox" checked={item.status} disabled />

                                        <div

                                            // contentEditable
                                            disabled
                                            placeholder="Todo..."
                                            className="ml-2 w-full  bg-transparent " >{item.todo}</div>
                                        <div className="  cursor-pointer  remove w-4  h-min ">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                        else return <h1 className="text-white">Something went Wrong</h1>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Priority;