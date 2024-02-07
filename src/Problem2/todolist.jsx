import React, { memo } from 'react'
import { FaRegCircle, FaRegCheckCircle, FaTrash } from "react-icons/fa";
import classNames from 'classnames';

function ToDoList({ todoList, toggleDone, removeTodo }) {
    console.log("Eklenen todo kısmı çalıştı.");
    return (
        <div>
            {todoList?.map((todo, index) => (
                <div key={index} className='w-full h-full flex items-center justify-between bg-[#fcfcfc] border-b-2 border-black'>
                    <button onClick={() => toggleDone(index)} className='w-24 h-10 flex justify-center items-center'>{todo.done ? <FaRegCheckCircle size={30} color='green' /> : <FaRegCircle size={30} color='orange' />}</button>
                    <span className={classNames('w-full flex items-center  pl-4 text-xl font-semibold transition-all duration-700',
                        {
                            "line-through opacity-50": todo.done === true,
                        })}>{todo.text}</span>
                    <div onClick={() => removeTodo(index)} className='w-12 flex items-center cursor-pointer'><FaTrash size={30} className='w-full p-1  rounded-full transition-all hover:text-red-600 hover:scale-90 ' /></div>
                </div>
            ))}
        </div>
    )
}

export default memo(ToDoList);