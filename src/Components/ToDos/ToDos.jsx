import { useEffect } from "react"
import { useState } from "react"
import Add from "../Add/Add"

import style from './ToDOs.module.css'

const ToDos = () => {
    const [todos, setTodos] = useState([])
    const [inp, setInp] = useState('')

    const basicUrl = 'https://jsonplaceholder.typicode.com/'

    useEffect(() => {
        fetch(basicUrl + 'todos?_limit=20')
            .then((res) => res.json())
            .then((res) => setTodos(res))
    }, [])

    const create = () => {
        fetch(basicUrl + 'todos/', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title: inp, completed: false })
        }).then((res) => res.json())
            .then((res) => {
                setTodos([res, ...todos])
                setInp('')
            })
    }

    const remove = (id) => {
        fetch(basicUrl + `todos/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
        }).then(() => (setTodos(prev => prev.filter((el) => el.id !== id))))
    }

    const complet = ({ id, completed }) => {
        fetch(basicUrl + `todos/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ completed: !completed })
        }).then((res) => {
            setTodos((prev) =>
                prev.map((el) =>
                    el.id === id ? { ...el, completed: !completed } : el
                )
            );
        })
    }

    return (
            <div className={style.todos}>
            <Add create={create} inp={inp} setInp={setInp} />
                {
                    todos.map((el, ind) => (
                        <div key={ind} className={style.todo}>
                            <input type="checkbox" checked={el.completed} onChange={() => complet(el)} />
                            <span className= {el.completed ? style.line : style.text}>{el.title}</span>
                            <button onClick={() => remove(el.id)} className= {style.delete}>Delete</button>
                        </div>
                    ))
                }
            </div>
    )
}

export default ToDos