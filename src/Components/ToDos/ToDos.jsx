import { useEffect } from "react"
import { useState } from "react"
import Add from "../Add/Add"

const ToDos = () => {
    const [todos, setTodos] = useState([])
    const [inp, setInp] = useState('')

    const basicUrl = 'https://jsonplaceholder.typicode.com/'

    useEffect(() => {
        fetch(basicUrl + 'todos?_limit=20')
            .then((res) => res.json())
            .then((res) => setTodos(res))
    }, [])

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
                    el.id === id ? { ...el, completed: res } : el
                )
            );
        })
    }

    return (
        <>
            <Add />
            <div>
                {
                    todos.map((el, ind) => (
                        <div key={ind}>
                            <input type="checkbox" checked={el.completed} onChange={() => complet(el)} />
                            <span>{el.title}</span>
                            <button onClick={() => remove(el.id)}>Delete</button>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ToDos