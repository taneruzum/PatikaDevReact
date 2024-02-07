import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCircle, FaRegCheckCircle, FaTrash } from "react-icons/fa";
import classNames from 'classnames';

function ToDoApp() {

    const [allDone, setAllDone] = useState()
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

    const toggleAllDone = (event) => {
        const newTodoList = todoList.map(todo => ({ ...todo, done: !allDone }));
        setToDoList(newTodoList);
        setAllDone(!allDone);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
        event.preventDefault();
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
        <div className='w-[550px] min-h-[590px] h-auto flex flex-col '>
            <h1 className=' w-full h-12 text-center text-4xl text-[#f59e0b] font-bold'>My To-Do List</h1>
            <form className='w-full h-full flex border-b-2 border-black bg-orange-300 '>
                <button onClick={toggleAllDone} tabIndex={-1} className='w-20 h-auto flex justify-center border-r-2  border-black transition-all hover:bg-orange-500'><IoIosArrowDown size={40} /></button>
                <input
                    value={todo}
                    onChange={(e) => setToDo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder='Tamamlamam gereken ne var ?'
                    tabIndex={1}
                    className='w-full px-5 text-xl font-semibold outline-none' />
            </form>
            <div className='w-full max-h-[500px] overflow-x-hidden '>
                {todoList?.map((todo, index) => (
                    <div key={index} className='w-full h-full flex items-center  bg-[#fcfcfc] border-b-2 border-black'>
                        <button onClick={() => toggleDone(index)} className='w-24 h-10 flex justify-center items-center'>{todo.done ? <FaRegCheckCircle size={30} color='green' /> : <FaRegCircle size={30} color='orange' />}</button>
                        <span className={classNames('w-full flex items-center  pl-4 text-xl font-semibold transition-all duration-700',
                            {
                                "line-through opacity-50": todo.done === true,
                            })}>{todo.text}</span>
                        <div onClick={() => removeTodo(index)} className='cursor-pointer'><FaTrash size={40} className='w-20 p-2 rounded-l-full transition-all hover:bg-[#e0e0e0] hover:text-red-600' /></div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ToDoApp;
