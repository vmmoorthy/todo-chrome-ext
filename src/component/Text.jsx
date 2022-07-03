import { useRef } from "react";
import { useTextInput } from "../hooks/TextDebounce";
import BlockOptions from "./blockOptions";

const Text = ({ item, cb = () => { } }) => {
    // const ele = useRef(null);
    console.log("from text");
    const textfn = useTextInput(cb)
    return (
        <div className="todoContainerWraper relative mt-5">
            <BlockOptions item={item} />
            <div placeholder="hello" onInput={e => textfn(e.target.innerText)} suppressContentEditableWarning contentEditable
                className="text relative bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2 empty:before:content-['Notes...'] before:text-[#fff8] ">
                {item.content}
            </div>
        </div>
    );
}

export default Text;