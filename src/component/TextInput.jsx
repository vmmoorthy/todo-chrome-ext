import { useEffect, useRef, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";

const TextInput = () => {
    const ele = useRef(null)
    const [text, setText] = useState("Title");

    const titleFn = useTextInput(v => { console.log(v); setText(v);console.log(ele.current) })


    return (
        <h1 suppressContentEditableWarning
            ref={r => ele.current = r}
            contentEditable onInput={e => titleFn(e.target.innerText)} className="title font-bold text-3xl p-2">
            {text}
        </h1>
    );
}

export default TextInput;