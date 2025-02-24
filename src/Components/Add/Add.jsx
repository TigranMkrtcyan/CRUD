import React from 'react'

import style from './Add.module.css'

const Add = (props) => {
    return (
        <div className={style.add}>
            <input type="text" value={props.inp} onChange={(e) => props.setInp(e.target.value)} className={style.inp} placeholder="Write your ToDo" />
            <button onClick={props.create} className={style.btn}>Add</button>
        </div>
    )
}

export default Add