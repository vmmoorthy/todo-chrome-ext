import { useState } from "react";
import { useTextInput } from "../hooks/TextDebounce";

const Todo = ({ setTodoList, index, item, todoList, Focus }) => {

    const [lfocus, setLfocus] = Focus;

    const todoText = useTextInput((e) => {
        setTodoList(p => p.map((d, i) => i === index ? ({ status: d.status, todo: e.target.value }) : d))
    });
    //Text area controller
    const rowCount = (s) => {
        let v = Number(s.match(/\n/g)?.length)
        if (v === 0 || v === NaN)
            v = 1;
        else if (v > 3)
            v = 3;
        return v + 1;
    }

    return (<div key={index} className="todoItem flex flex-row items-center">

        <input type="checkbox" checked={item.status} onChange={() => setTodoList(p => p.map((d, i) => i === index ? ({ status: !d.status, todo: d.todo }) : d))} />

        <textarea
            suppressContentEditableWarning
            contentEditable
            style={{ resize: "none" }}
            defaultValue={item.todo}
            placeholder="Todo..."
            // onInput={e=>console.log(e.target.value)}
            autoFocus={lfocus === index}
            onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                    setTodoList(p => [...p, { status: false, todo: "" }])
                    setLfocus(todoList.length);
                }
            }}
            rows={rowCount(item.todo) || 1}
            onChange={todoText}
            className="ml-2 w-full  bg-transparent " />
        <div className="  cursor-pointer  remove w-4  h-min ">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#fff" d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297L325.297 256z" /></svg>
        </div>

    </div>);
}

export default Todo;