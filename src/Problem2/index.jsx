import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import classNames from 'classnames';

function ToDoApp() {

    // const [allDone, setAllDone] = useState()
    const [todo, setToDo] = useState("")
    const [todoList, setToDoList] = useState([])

    // Uygulama ilk yüklendiğinde localStorage'dan verileri almak için
    useEffect(() => {
        const storedTodoList = localStorage.getItem('todoList');
        if (storedTodoList) {
            setToDoList(JSON.parse(storedTodoList));
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (todo.trim() === "") {
                alert("Hata: Giriş değeri boş olamaz!");
            } else {
                setToDo("");
                const newTodoList = [...todoList, { text: todo, done: false }];
                setToDoList(newTodoList);
                localStorage.setItem('todoList', JSON.stringify(newTodoList));
            }
            event.preventDefault();
        }
    };


    const toggleDone = (index) => {
        //Bir done state tanımlarsak genel bir done olur ve listedeki bir elemanı tiklersek
        // tüm elemanlar tiklenmiş görünür. Bu yüzden her eleman için ayrı bir done belirlemek gerekli
        const newTodoList = todoList.map((todo, i) => i === index ? { ...todo, done: !todo.done } : todo);
        setToDoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    };


    const removeTodo = (index) => {
        //local storage den silmek için önce diziden veriyi siliyoruz
        const newTodoList = todoList.filter((_, i) => i !== index);
        setToDoList(newTodoList);
        // güncellenen diziyi local storage e kaydediyoruz
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    };

    // console.log("problem 2 çalıştı...");
    return (
        <div className='w-[550px] min-h-[590px] h-auto flex flex-col'>
            <h1 className=' w-full h-12 text-center text-4xl text-[#f59e0b] font-bold'>My To-Do List</h1>
            <form className='w-full h-full flex border  bg-slate-200'>
                <button className='w-20 h-auto flex justify-center'><IoIosArrowDown size={40} /></button>
                <input
                    value={todo}
                    onChange={(e) => setToDo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder='Tamamlamam gereken ne var ?'
                    className='w-full px-5 text-xl outline-none' />
            </form>
            <div className='w-full max-h-[500px] overflow-x-hidden'>
                {todoList && todoList?.map((todo, index) => (
                    <div key={index} className='w-full h-full flex items-center border  bg-slate-200'>
                        <button onClick={() => toggleDone(index)} className='w-20 h-10 flex justify-center items-center'>{todo.done ? <FaRegCheckCircle size={30} /> : <FaRegCircle size={30} />}</button>
                        <span className={classNames('w-full flex items-center  pl-4 text-xl transition-all duration-500',
                            {
                                "line-through opacity-50": todo.done === true,
                            })}>{todo.text}</span>
                        <div onClick={() => removeTodo(index)}><HiMiniXMark size={40} /></div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ToDoApp;
