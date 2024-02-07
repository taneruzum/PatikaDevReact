import React, { useEffect, useMemo, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import ToDoList from './todolist';

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
    }, []);//unmount - dependency array

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

    //FIRST FUNCTIONS
    // const toggleDone = (index) => {
    //     const newTodoList = todoList.map((todo, i) => i === index ? { ...todo, done: !todo.done } : todo);
    //     setToDoList(newTodoList);
    //     localStorage.setItem('todoList', JSON.stringify(newTodoList));
    // };

    // const removeTodo = (index) => {
    //     const newTodoList = todoList.filter((_, i) => i !== index);
    //     setToDoList(newTodoList);
    //     localStorage.setItem('todoList', JSON.stringify(newTodoList));
    // };


    //MEMOIZATION - Optimizasyon
    const toggleDone = useMemo(() => {
        return (index) => {
            //Bir done state tanımlarsak genel bir done olur ve listedeki bir elemanı tiklersek
            // tüm elemanlar tiklenmiş görünür. Bu yüzden her eleman için ayrı bir done belirlemek gerekli
            const newTodoList = todoList.map((todo, i) => i === index ? { ...todo, done: !todo.done } : todo);
            setToDoList(newTodoList);
            localStorage.setItem('todoList', JSON.stringify(newTodoList));
        };
    }, [todoList, setToDoList]);

    const removeTodo = useMemo(() => {
        return (index) => {
            //local storage den silmek için önce diziden veriyi siliyoruz
            const newTodoList = todoList.filter((_, i) => i !== index);
            setToDoList(newTodoList);
            // güncellenen diziyi local storage e kaydediyoruz
            localStorage.setItem('todoList', JSON.stringify(newTodoList));
        };
    }, [todoList, setToDoList]);

    console.log("input kısmı çalıştı.");
    return (
        <div className='w-[550px] min-h-[590px] h-auto flex flex-col '>
            <h1 className=' w-full h-12 text-center text-4xl text-[#f59e0b] font-bold'>My To-Do List</h1>
            <form className='w-full h-full flex border-b-2 border-black bg-orange-300 '>
                <button onClick={toggleAllDone} tabIndex={-1} className='w-20 h-auto flex justify-center border-r-2  border-black transition-all hover:bg-orange-500 hover:text-white'><IoIosArrowDown size={40} /></button>
                <input
                    value={todo}
                    onChange={(e) => setToDo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder='Tamamlamam gereken ne var ?'
                    tabIndex={1}
                    className='w-full px-5 text-xl font-semibold outline-none' />
            </form>
            <div className='w-full max-h-[500px] overflow-x-hidden shadow-2xl shadow-[#000000da] '>
                <ToDoList todoList={todoList} toggleDone={toggleDone} removeTodo={removeTodo} />
            </div>

        </div>
    )
}
export default ToDoApp;
