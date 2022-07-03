import { useEffect, useRef, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";

const TextInput = ({ title, cb }) => {
    const ele = useRef(null)

    const titleFn = useTextInput(cb)


    return (
        <h1 suppressContentEditableWarning
            ref={r => ele.current = r}
            contentEditable onInput={e => titleFn(e.target.innerText)}
            className="title font-bold text-3xl p-2 empty:before:content-['Title...'] before:text-[#fff8]">
            {title}
        </h1>
    );
}

export default TextInput;