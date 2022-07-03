import { useState } from "react";
import BlockOptions from "./blockOptions";
import Todo from "./Todo";
const TodoList = ({ list, cb }) => {
    const [todoList, setTodoList] = useState(list || [{ status: false, todo: "" }]);
    const Focus = useState(-1);


    return (
        <div className="todoContainerWraper relative mt-5">
            <BlockOptions />
            <div className="todoList bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2">
                {todoList.map((item, index) => (
                    <Todo item={item} index={index} todoList={todoList} setTodoList={setTodoList} Focus={Focus} key={index} />
                ))}
            </div>
        </div>
    );
}

export default TodoList;