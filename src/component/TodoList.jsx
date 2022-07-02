import { useState } from "react";
const TodoList = () => {
    const [todo, setTodo] = useState([{ c: false, t: "Hello" }]);
    const rowCount = (s) => {
        let v = Number(s.match(/\n/g)?.length)
        if (v === 0 || v === NaN)
            v = 1;
        else if (v > 3)
            v = 3;
        return v + 1;
    }
    const [lfocus, setLfocus] = useState(-1);
    
    return (
        <div className="todoList bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2">
            {todo.map((item, index) => (
                <div key={index} className="todoItem flex flex-row">

                    <input type="checkbox" checked={item.c} onChange={() => setTodo(p => p.map((d, i) => i === index ? ({ c: !d.c, t: d.t }) : d))} />

                    <textarea
                        suppressContentEditableWarning
                        contentEditable
                        style={{ resize: "none" }}
                        value={item.t}
                        autoFocus={lfocus===index}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.ctrlKey) {
                                setTodo(p => [...p, { c: false, t: "" }])
                                setLfocus(todo.length);
                                // getFocus();
                            }
                        }}
                        rows={rowCount(item.t) || 1}
                        onChange={(e) => {
                            setTodo(p => p.map((d, i) => i === index ? ({ c: d.c, t: e.target.value }) : d))
                        }}
                        className="ml-2 w-full  bg-transparent" />

                </div>
            ))}
        </div>
    );
}

export default TodoList;