import { useContext, useEffect, useRef, useState } from "react";
import { deleteData, getAll, insert } from "storage_engine";
import { DB, scrollToViewContext } from "../App";
import { useTextInput } from "../hooks/TextDebounce";
import { todoListSetstateContext } from "./TodoContainer";
import { v4 as uuidv4 } from 'uuid'
import { priorityContext } from "../context/priorityContext";
// import editSVG from '../assert/edit.svg';

const BlockOptions = ({ item }) => {
    const todoSetState = useContext(todoListSetstateContext)
    const scrollToView = useContext(scrollToViewContext)

    const scVRef = useRef(null)

    if (scrollToView === item.uuid) {
        scVRef.current?.parentElement.classList.add('scrollFocus')
        scVRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [priorityList, setPriorityList] = useContext(priorityContext)

    const [priorityColor, setPriorityColor] = useState("#fff");

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (DB.db)
            (async () => setPriorityList(await getAll(DB.db, "priority")))()
    }, []);


    const changeColor = e => {
        e.preventDefault();
        setPriorityColor(e.target.value);
    }

    const updatePriority = (e, p_uuid) => {
        if (!edit) {
            todoSetState(p => ({
                ...p, list: p.list.map(todoli => {

                    if (todoli.uuid === item.uuid) {
                        return { ...todoli, priority: p_uuid }
                    }
                    return todoli
                })
            }))
        }
    }

    const updatePriorityText = useTextInput((e) => {

        if (e.key === "Enter" && e.ctrlKey) {
            const tdata = { uuid: uuidv4(), color: priorityColor, text: e.target.value }
            // add an priority 
            setPriorityList(p => ([...p, tdata]))
            insert(DB.db, "priority", tdata)
            //to reset the text & color values
            setPriorityColor("#fff")
            setTimeout(() => e.target.value = "", 0);
        }

    });

    const updatePinned = () => todoSetState(p => ({
        ...p, list: p.list.map(todoli => {

            if (todoli.uuid === item.uuid) {

                return { ...todoli, pinned: item.pinned ? 0 : 1 }
            }
            return todoli
        })
    }))

    const updateTime = (e) => {
        todoSetState(p => ({
            ...p, list: p.list.map(todoli => {

                if (todoli.uuid === item.uuid) {

                    return { ...todoli, time: e.target.value }
                }
                return todoli
            })
        }))
    }





    return (
        <div contentEditable={false} ref={r => scVRef.current = r} className="blockOptions opacity-20 transition-opacity hover:opacity-100 grid grid-flow-col items-end absolute z-10  top-[-1rem] w-full ">
            <div onClick={updatePinned} className="border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] pined w-6 p-1 h-6 bg-[#6A1B4D] rounded">
                {item.pinned ? <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                    <path fill="#fff" d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588c-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828l-3.182 3.182c-.195.195-1.219.902-1.414.707c-.195-.195.512-1.22.707-1.414l3.182-3.182l-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
                </svg> : <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.7127 2.25586C30.918 2.2555 31.1214 2.2956 31.3112 2.37389C31.501 2.45217 31.6735 2.56711 31.8189 2.71211L47.2877 18.1809C47.5806 18.4739 47.7451 18.8712 47.7451 19.2855C47.7451 19.6999 47.5806 20.0972 47.2877 20.3902C45.7877 21.8902 43.9377 22.2277 42.5908 22.2277C42.0377 22.2277 41.5439 22.1715 41.1533 22.1059L31.3595 31.8996C31.6174 32.9384 31.7847 33.9976 31.8595 35.0652C32.0033 37.259 31.7595 40.3371 29.6095 42.4871C29.3165 42.78 28.9192 42.9446 28.5049 42.9446C28.0905 42.9446 27.6932 42.78 27.4002 42.4871L18.5595 33.6496L8.61579 43.5934C8.00642 44.2027 4.80642 46.4121 4.19704 45.8027C3.58767 45.1934 5.79704 41.9902 6.40642 41.384L16.3502 31.4402L7.51267 22.5996C7.21974 22.3066 7.05519 21.9092 7.05519 21.4949C7.05519 21.0806 7.21974 20.6832 7.51267 20.3902C9.66267 18.2402 12.7408 17.9934 14.9345 18.1402C16.0022 18.215 17.0614 18.3823 18.1002 18.6402L27.8939 8.84961C27.8122 8.37373 27.7704 7.89184 27.7689 7.40899C27.7689 6.06524 28.1064 4.21524 29.6095 2.71211C29.9024 2.42002 30.2991 2.25595 30.7127 2.25586ZM31.0939 8.85586V8.84961V8.85586ZM31.0939 8.84961V8.85586C31.1842 9.13077 31.1963 9.42533 31.129 9.70673C31.0617 9.98813 30.9175 10.2453 30.7127 10.4496L19.6658 21.4934C19.4605 21.6977 19.2025 21.841 18.9205 21.9073C18.6385 21.9735 18.3437 21.96 18.0689 21.8684H18.0627L18.0189 21.8559C17.7216 21.7668 17.4215 21.6876 17.1189 21.6184C16.3328 21.435 15.5334 21.3138 14.7283 21.2559C13.4095 21.1684 12.1158 21.2809 11.0564 21.7246L28.2752 38.9402C28.7158 37.8777 28.8283 36.5871 28.7408 35.2684C28.6612 34.1519 28.46 33.0474 28.1408 31.9746L28.1283 31.934V31.9309C28.036 31.6557 28.0222 31.3602 28.0885 31.0776C28.1547 30.795 28.2983 30.5364 28.5033 30.3309L39.5533 19.284C39.7661 19.0699 40.0363 18.922 40.3314 18.8583C40.6264 18.7945 40.9336 18.8175 41.2158 18.9246L41.5158 18.9934C41.7877 19.0465 42.1658 19.0996 42.5908 19.0996C42.947 19.0996 43.3095 19.0652 43.6627 18.9746L31.022 6.33711C30.9314 6.69024 30.897 7.05586 30.897 7.40899C30.8986 7.89456 30.9637 8.37784 31.0908 8.84649L31.0939 8.84961Z" fill="white" />
                </svg>}

            </div>
            <div tabIndex={0} className="priority border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] priority grid grid-flow-col items-center bg-[#6A1B4D] gap-1 justify-center w-min h-min max-h-6 px-1 py-[0.2rem] rounded ">
                <div style={{ backgroundColor: priorityList.find(v => v.uuid === item.priority)?.color || "#fff5" }} className="color w-3 h-3 rounded-full "></div>
                <span className="text-[0.87rem] leading-none ">{priorityList.find(v => v.uuid === item.priority)?.text || "--"}</span>
                <svg className="w-4 h-4" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.8282 11.7188H7.17195C6.40242 11.7188 5.97273 12.5313 6.44929 13.0859L19.2774 27.9609C19.6446 28.3867 20.3516 28.3867 20.7227 27.9609L33.5509 13.0859C34.0274 12.5313 33.5977 11.7188 32.8282 11.7188Z" fill="white" />
                </svg>
                <div tabIndex={1} className="dropDown bg-[#6A1B4D] border-white border-solid border-[1px] rounded p-1 absolute top-[1.5rem] ">
                    <div className="relative">
                        {edit ? <div onClick={() => setEdit(false)} className="edit hover:opacity-100 right-[-1rem] top-[-.5rem] absolute h-5 w-5">
                            <svg
                                viewBox="0 0 50 38"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.9822 36.5533L0.732202 20.3033C-0.244067 19.327 -0.244067 17.7441 0.732202 16.7677L4.26765 13.2322C5.24392 12.2558 6.82693 12.2558 7.8032 13.2322L18.75 24.1789L42.1968 0.732202C43.173 -0.244067 44.756 -0.244067 45.7323 0.732202L49.2678 4.26775C50.244 5.24402 50.244 6.82693 49.2678 7.8033L20.5178 36.5534C19.5414 37.5297 17.9585 37.5297 16.9822 36.5533Z" fill="white" />
                            </svg>
                        </div>
                            :
                            <div onClick={() => setEdit(true)} className="edit   hover:opacity-100 right-[-1rem] top-[-.9rem] absolute h-5 w-5">
                                <svg viewBox="0 0 50 50"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath={`url(#clip0_6_833${item.uuid})`}>
                                        <path d="M34.9479 9.99992L42.7778 17.8298C43.1076 18.1596 43.1076 18.6978 42.7778 19.0277L23.8194 37.986L15.7639 38.8801C14.6875 39.0017 13.776 38.0902 13.8976 37.0138L14.7917 28.9583L33.75 9.99992C34.0799 9.67006 34.6181 9.67006 34.9479 9.99992ZM49.0104 8.01207L44.7743 3.77596C43.4549 2.45652 41.3108 2.45652 39.9826 3.77596L36.9097 6.84888C36.5799 7.17874 36.5799 7.71693 36.9097 8.04679L44.7396 15.8767C45.0694 16.2065 45.6076 16.2065 45.9375 15.8767L49.0104 12.8037C50.3299 11.4756 50.3299 9.33152 49.0104 8.01207ZM33.3333 32.8298V41.6666H5.55556V13.8888H25.5035C25.7812 13.8888 26.0417 13.776 26.2413 13.585L29.7135 10.1128C30.3733 9.45304 29.9045 8.33325 28.9757 8.33325H4.16667C1.86632 8.33325 0 10.1996 0 12.4999V43.0555C0 45.3558 1.86632 47.2221 4.16667 47.2221H34.7222C37.0226 47.2221 38.8889 45.3558 38.8889 43.0555V29.3576C38.8889 28.4287 37.7691 27.9687 37.1094 28.6197L33.6371 32.0919C33.4462 32.2916 33.3333 32.552 33.3333 32.8298Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id={`clip0_6_833${item.uuid}`}>
                                            <rect width="50" height="50" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>}
                        {priorityList.map(v =>
                            <div key={v.uuid} className="Midium flex flex-row items-center justify-between hover:bg-[#6D385A]">
                                <span className="flex flex-row justify-center items-center gap-1" onClick={e => updatePriority(e, v.uuid)}>
                                    <div className="color w-3 h-3 rounded-full " style={{ backgroundColor: v.color }}></div>
                                    <span contentEditable={edit}>{v.text}</span>
                                </span>
                                {edit && <div className="remove w-[0.85rem] h-[0.85rem] p-[0.05rem] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
                                </div>}
                            </div>)}
                        {edit && <div className="addNew flex flex-row items-center gap-1 hover:bg-[#6D385A]">
                            <label className="color w-3 h-3 rounded-full" style={{ backgroundColor: priorityColor }}>
                                <input type="color" value={priorityColor} onChange={changeColor} className=" invisible border-none" />
                            </label>
                            <input
                                type={"text"}
                                onKeyDown={updatePriorityText}
                                placeholder="Add..."
                                className="txt w-16 cursor-text bg-transparent"
                            />
                        </div>}
                    </div>
                </div>
            </div>

            {/* time */}
            <div className=" relative   border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] time text-[.75rem] w-min h-min max-w-[8.5rem] text-center max-h-6 whitespace-nowrap rounded bg-[#6A1B4D] ">
                <input type="datetime-local"
                    defaultValue={item.time}
                    onChange={updateTime}
                    className="text-[.63rem] cursor-pointer bg-transparent w-[8.3rem] px-[0.5px] py-1 top-[-0.2rem] left-0" />
            </div>


            <div onClick={() => {
                todoSetState(p => ({ ...p, list: p.list.filter(todoli => todoli.uuid !== item.uuid) }))
                deleteData(DB.db, "todo", item.uuid)
            }} className="   border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] remove w-6 p-1 h-min bg-[#6A1B4D] rounded">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
            </div>
        </div>
    );
}

export default BlockOptions;