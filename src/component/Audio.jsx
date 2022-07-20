import { useContext, useEffect, useRef, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import RecordAudio from "./RecordAudio";
import { todoListSetstateContext } from "./TodoContainer";

const Audio = ({ item }) => {
    const { content: urlAud = "", uuid, desc } = item;
    const inputRef = useRef(null)
    const setTodo = useContext(todoListSetstateContext)
    // const [urlPic, setUrlPic] = useState(content);

    const setUrlAud = (u) => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === uuid ? { ...i, content: u } : i) }))

    const textFn = useTextInput(v => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === uuid ? { ...i, desc: v } : i) })))

    const [showImg, setShowImg] = useState(false);
    const [showCapture, setShowCapture] = useState(false);
    // console.log(`urlPic: ${urlPic}`);
    // useEffect(() => {
    //     setUrlPic(picRef.current)
    // }, [picRef.current]);

    const fileToBlobStore = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUrlAud(reader.result)
            inputRef.current.value = ""
        }
    }

    const captureImg = e => {
        setShowCapture(true)
    }

    return (
        <div onMouseOver={e => e.target.parentElement.classList.remove('scrollFocus')} className="pic bg-[#222] border-[1px] flex justify-center items-center    border-solid border-white w-full min-h-[8rem] p-1 rounded-[10px] mb-2">
            {urlAud ? <div className="flex flex-col justify-center w-full items-center">
                <audio src={urlAud} controls ></audio>
                <input className="mt-2 bg-transparent rounded p-1 w-full border-[1px] border-solid " defaultValue={desc} placeholder="Description..." onChange={e => textFn(e.target.value)} type="text" />
            </div>
                : <div className="option grid grid-flow-col w-full h-full items-center justify-evenly">
                    <label className="cursor-pointer" htmlFor={`${uuid}_file`}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" className="[&>path]:hover:fill-white" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="#fff8" d="M8 12h4V6h3l-5-5l-5 5h3v6zm11.338 1.532c-.21-.224-1.611-1.723-2.011-2.114A1.503 1.503 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.274.274 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.276.276 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418c-.4.392-1.801 1.891-2.011 2.114c-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449z" /></svg>
                        <input type="file" accept="audio/*" ref={r => inputRef.current = r} onChange={fileToBlobStore} hidden id={`${uuid}_file`} />
                    </label>

                    {/* <svg  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" className="[&>g]:hover:fill-white" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="#fff8"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0z" /><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0z" /></g></svg> */}
                    <svg onClick={captureImg} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" className="[&>path]:hover:fill-white" ><path fill="#fff8" d="M16.399 7.643V10.4c0 2.236-1.643 4.629-5.399 4.959V18h2.6c.22 0 .4.18.4.4v1.2c0 .221-.181.4-.4.4H6.4c-.22 0-.4-.18-.4-.4v-1.2c0-.22.18-.4.399-.4H9v-2.641c-3.758-.33-5.4-2.723-5.4-4.959V7.643a.4.4 0 0 1 .4-.4h.6c.22 0 .4.18.4.4V10.4c0 1.336 1.053 3.6 5 3.6c3.946 0 5-2.264 5-3.6V7.643a.4.4 0 0 1 .399-.4H16a.399.399 0 0 1 .399.4zM10 12c2.346 0 3-.965 3-1.6V7.242H7V10.4c0 .635.652 1.6 3 1.6zm3-10.4c0-.637-.654-1.6-3-1.6c-2.348 0-3 .963-3 1.6v4.242h6V1.6z" /></svg>
                </div>
            }
            {showCapture && <RecordAudio  setUrlAud={url => { setUrlAud(url); setShowCapture(false); }} />}
        </div>);
}

export default Audio;