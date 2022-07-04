import { useEffect, useRef, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";

const TextInput = ({ title, cb }) => {
    const ele = useRef(null)

    const titleFn = useTextInput((v) => {
        cb(v);
        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(ele.current);
        range.collapse(false);
        selection.addRange(range);
        ele.current.focus();
    })


    return (
        <h1 suppressContentEditableWarning
            ref={r => ele.current = r}
            contentEditable onInput={e => titleFn(e.target.innerText)}
            className="title font-bold max-h-[5.5rem] overflow-auto text-3xl p-2 empty:before:content-['Title...'] before:text-[#fff8]">
            {title}
        </h1>
    );
}

export default TextInput;