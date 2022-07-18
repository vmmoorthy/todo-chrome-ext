import { useContext, useEffect, useLayoutEffect } from "react";
import { useRef } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import BlockOptions from "./blockOptions";
import { todoListSetstateContext } from "./TodoContainer";

const Text = ({ item, cb = () => { } }) => {
    const setTodo = useContext(todoListSetstateContext)
    const ele = useRef(null)



    useEffect(() => {

        //to focus last charcter
        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(ele.current);
        range.collapse(false);
        selection.addRange(range);
        
    }, [item.content]);

    const textfn = useTextInput(v => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === item.uuid ? { ...i, content: v.replaceAll("<br/>", "\n") } : i) })))
    return (
        <div className="todoContainerWraper relative mt-5">
            <BlockOptions item={item} />
            <div placeholder="hello" dangerouslySetInnerHTML={{ __html: item.content.replaceAll("\n", "<br/>") }} ref={r => ele.current = r} onInput={e => textfn(e.target.innerText)} suppressContentEditableWarning contentEditable
                className="text relative bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">
            </div>
        </div>
    );
}

export default Text;

