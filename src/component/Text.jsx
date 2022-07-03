import { useRef } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import BlockOptions from "./blockOptions";

const Text = ({ text = "", cb = () => { } }) => {
    const ele = useRef(null);
    const textfn = useTextInput(cb)
    return (
        <div className="todoContainerWraper relative mt-5">
            <BlockOptions />
            <div placeholder="hello" onInput={e => textfn(e.target.innerText)} suppressContentEditableWarning contentEditable
                className="text relative bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">
                {text}
            </div>
        </div>
    );
}

export default Text;