import React, { useEffect, useState } from "react"


export const TodoFetch = () => {

    const [tareas, setTareas] = useState('')
    const [data,setData] = useState([])

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/djangoisthebest', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>{

            if(!resp.ok) throw new Error(`error status code: ${resp.status}`)
                return resp.json()
        })
  
        .then(data=>getUsersTodos())
        .catch(err => console.log(err))
    }

    const getUsersTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/djangoisthebest') ///GET
            .then(response => {
                console.log(response)
                if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
            })
            .then(parsedJson => setData(parsedJson))
            .catch(err => createUser())
    }

   const createTask = () => {
        //POST
        fetch('https://playground.4geeks.com/todo/todos/djangoisthebest', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ label: tareas, is_done: false })
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
                return resp.json()
            })
            .then(data => getUsersTodos())
            .catch(err => console.log(err))
    }

    const handleDelete = id => {
        fetch('https://playground.4geeks.com/todo/todos/' + id,  {
            method: "DELETE", 
             })
            .then(resp=>{
                getUsersTodos();
             })
            .catch(err => console.log(err))
    }

    useEffect (()=>{

    getUsersTodos()
    
     
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        createTask()
        setTareas('')
    } 

    return (
        <div>
            <h1>To do(s) list</h1>
            <div className="container">

             <form onSubmit={handleSubmit} >
                <input type="text" value={tareas} onChange={e=>setTareas(e.target.value)} />
                <input type="submit" hidden />
             </form>

             <div>
                <ul>

                {data.todos?.map((el, i)=> <li key={i}>{el.label} <button className="btn" onClick={()=>handleDelete(el.id)} ><i class="fa-solid fa-delete-left"></i></button> </li>)}
                
                </ul>
            </div>
                <hr />
                <p>
                    Made by Alice [ with <i class="fa-solid fa-hand-holding-heart"></i> ]
                    
                </p>
             </div>
        </div>
    )
}