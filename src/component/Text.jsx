import { useContext, useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import { todoListSetstateContext } from "./TodoContainer";

const Text = ({ item, cb = () => { } }) => {
    const setTodo = useContext(todoListSetstateContext)
    const [value] = useState(item.content);

    const textfn = useTextInput(v => setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === item.uuid ? { ...i, content: v.replaceAll("<br/>", "\n") } : i) })))
    return (
        <div placeholder="hello" onMouseOver={e => e.target.parentElement.classList.remove('scrollFocus')} dangerouslySetInnerHTML={{ __html: value.replaceAll("\n", "<br/>") }} onInput={e => textfn(e.target.innerText)} suppressContentEditableWarning contentEditable className="text relative bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">
        </div>
    );
}

export default Text;

