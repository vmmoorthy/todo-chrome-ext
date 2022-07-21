import { useContext, useRef, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import RecordVideo from "./RecordVideo";
import { todoListSetstateContext } from "./TodoContainer";

const Video = ({ item }) => {
    const { content: urlVid = "", uuid, desc } = item;
    const inputRef = useRef(null)
    const setTodo = useContext(todoListSetstateContext);

    const setUrlVid = (u) => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === uuid ? { ...i, content: u } : i) }))

    const textFn = useTextInput(v => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === uuid ? { ...i, desc: v } : i) })))

    const [showCapture, setShowCapture] = useState(false);

    const fileToBlobStore = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUrlVid(reader.result)
            inputRef.current.value = ""
        }
    }

    const captureImg = e => {
        setShowCapture(true)
    }

    return <div onMouseOver={e => e.target.parentElement.classList.remove('scrollFocus')} className="pic bg-[#222] border-[1px] flex justify-center items-center border-solid border-white w-full min-h-[8rem] p-1 rounded-[10px] mb-2">
        {urlVid ? <div className="flex flex-col justify-center w-full items-center">
            <video controls src={urlVid} className="bg-black max-h-[10rem]" alt="video by user" />
            <input className="mt-2 bg-transparent rounded p-1 w-full border-[1px] border-solid " defaultValue={desc} placeholder="Description..." onChange={e => textFn(e.target.value)} type="text" />
        </div> : <div className="option grid grid-flow-col w-full h-full items-center justify-evenly">
            <label className="cursor-pointer" htmlFor={`${uuid}_file`}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" className="[&>path]:hover:fill-white" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="#fff8" d="M8 12h4V6h3l-5-5l-5 5h3v6zm11.338 1.532c-.21-.224-1.611-1.723-2.011-2.114A1.503 1.503 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.274.274 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.276.276 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418c-.4.392-1.801 1.891-2.011 2.114c-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449z" /></svg>
                <input accept="video/*" type="file" ref={r => inputRef.current = r} onChange={fileToBlobStore} hidden id={`${uuid}_file`} />
            </label>
            <svg onClick={captureImg} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" preserveAspectRatio="xMidYMid meet" className="[&>path]:hover:fill-white" viewBox="0 0 16 16"><path fill="#fff8" d="M3.5 2.5A2.5 2.5 0 0 0 1 5v6a2.5 2.5 0 0 0 2.5 2.5h5A2.5 2.5 0 0 0 11 11V5a2.5 2.5 0 0 0-2.5-2.5h-5Zm10.684 1.61L12 5.893v4.215l2.184 1.78a.5.5 0 0 0 .816-.389v-7a.5.5 0 0 0-.816-.387Z" /></svg>
        </div>}
        {showCapture && <RecordVideo setUrlVid={url => { setUrlVid(url); setShowCapture(false); }} />}
    </div>
}

export default Video;