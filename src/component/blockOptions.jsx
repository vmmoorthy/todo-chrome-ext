import { useContext } from "react";
import { deleteData } from "storage_engine";
import { DB } from "../App";
import { todoListSetstateContext } from "./TodoContainer";

const BlockOptions = ({ item }) => {
    const todoSetState = useContext(todoListSetstateContext)
    return (
        <div contentEditable={false} className="blockOptions grid grid-flow-col items-end absolute z-10  top-[-1rem] w-full ">
            <div className="opacity-20 transition-opacity hover:opacity-90 border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] pined w-6 p-1 h-6 bg-[#6A1B4D] rounded">
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.7127 2.25586C30.918 2.2555 31.1214 2.2956 31.3112 2.37389C31.501 2.45217 31.6735 2.56711 31.8189 2.71211L47.2877 18.1809C47.5806 18.4739 47.7451 18.8712 47.7451 19.2855C47.7451 19.6999 47.5806 20.0972 47.2877 20.3902C45.7877 21.8902 43.9377 22.2277 42.5908 22.2277C42.0377 22.2277 41.5439 22.1715 41.1533 22.1059L31.3595 31.8996C31.6174 32.9384 31.7847 33.9976 31.8595 35.0652C32.0033 37.259 31.7595 40.3371 29.6095 42.4871C29.3165 42.78 28.9192 42.9446 28.5049 42.9446C28.0905 42.9446 27.6932 42.78 27.4002 42.4871L18.5595 33.6496L8.61579 43.5934C8.00642 44.2027 4.80642 46.4121 4.19704 45.8027C3.58767 45.1934 5.79704 41.9902 6.40642 41.384L16.3502 31.4402L7.51267 22.5996C7.21974 22.3066 7.05519 21.9092 7.05519 21.4949C7.05519 21.0806 7.21974 20.6832 7.51267 20.3902C9.66267 18.2402 12.7408 17.9934 14.9345 18.1402C16.0022 18.215 17.0614 18.3823 18.1002 18.6402L27.8939 8.84961C27.8122 8.37373 27.7704 7.89184 27.7689 7.40899C27.7689 6.06524 28.1064 4.21524 29.6095 2.71211C29.9024 2.42002 30.2991 2.25595 30.7127 2.25586ZM31.0939 8.85586V8.84961V8.85586ZM31.0939 8.84961V8.85586C31.1842 9.13077 31.1963 9.42533 31.129 9.70673C31.0617 9.98813 30.9175 10.2453 30.7127 10.4496L19.6658 21.4934C19.4605 21.6977 19.2025 21.841 18.9205 21.9073C18.6385 21.9735 18.3437 21.96 18.0689 21.8684H18.0627L18.0189 21.8559C17.7216 21.7668 17.4215 21.6876 17.1189 21.6184C16.3328 21.435 15.5334 21.3138 14.7283 21.2559C13.4095 21.1684 12.1158 21.2809 11.0564 21.7246L28.2752 38.9402C28.7158 37.8777 28.8283 36.5871 28.7408 35.2684C28.6612 34.1519 28.46 33.0474 28.1408 31.9746L28.1283 31.934V31.9309C28.036 31.6557 28.0222 31.3602 28.0885 31.0776C28.1547 30.795 28.2983 30.5364 28.5033 30.3309L39.5533 19.284C39.7661 19.0699 40.0363 18.922 40.3314 18.8583C40.6264 18.7945 40.9336 18.8175 41.2158 18.9246L41.5158 18.9934C41.7877 19.0465 42.1658 19.0996 42.5908 19.0996C42.947 19.0996 43.3095 19.0652 43.6627 18.9746L31.022 6.33711C30.9314 6.69024 30.897 7.05586 30.897 7.40899C30.8986 7.89456 30.9637 8.37784 31.0908 8.84649L31.0939 8.84961Z" fill="white" />
                </svg>

            </div>
            <div className="opacity-20 transition-opacity hover:opacity-90 border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] priority grid grid-flow-col items-center bg-[#6A1B4D] gap-1 justify-center w-min h-min max-h-6 px-1 py-[0.2rem] rounded ">
                <div className="color w-3 h-3 rounded-full bg-red-500 "></div>
                <span className="text-[0.87rem] leading-none ">High</span>
                <svg className="w-4 h-4" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.8282 11.7188H7.17195C6.40242 11.7188 5.97273 12.5313 6.44929 13.0859L19.2774 27.9609C19.6446 28.3867 20.3516 28.3867 20.7227 27.9609L33.5509 13.0859C34.0274 12.5313 33.5977 11.7188 32.8282 11.7188Z" fill="white" />
                </svg>

            </div>
            <div className="opacity-20 transition-opacity hover:opacity-90 border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] time text-[.75rem] w-min h-min max-h-6 whitespace-nowrap p-1 rounded bg-[#6A1B4D] ">05 Jun 2020 18:45PM</div>
            <div onClick={() => {
                todoSetState(p => ({ ...p, list: p.list.filter(todoli => todoli.uuid !== item.uuid) }))
                deleteData(DB.db, "todo", item.uuid)
            }} className="opacity-20 transition-opacity hover:opacity-90 border-white border-solid border-[1px] cursor-pointer hover:bg-[#6D385A] remove w-6 p-1 h-min bg-[#6A1B4D] rounded">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
            </div>
        </div>
    );
}

export default BlockOptions;