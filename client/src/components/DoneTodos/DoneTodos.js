import React, { Component } from 'react'
import axios from '../../axios/axios'
import EditTodo from '../EditTodo/EditTodo'

import './DoneTodos.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class DoneTodos extends Component {
    constructor(props) {
        super(props);
        this.onMoveToTrash = this.onMoveToTrash.bind(this);
    }

    onMoveToTrash (id) {
        const newTodos = [];
        const todos = this.props.todos;
        const newTodo = {}
        todos.forEach(todo => {
            if (todo.todo_id !== id) { 
            newTodos.push(todo)
            } else {
                newTodo.todo_id = todo.todo_id
                newTodo.time = todo.time
                newTodo.description = todo.description
                newTodo.done = todo.done
                newTodo.type = todo.type
                newTodo.deleted = true
                console.log(newTodo)
                
                newTodos.push(newTodo) 
            }
        })

        const newSelectedTodos = [];
        const selectedTodos = this.props.selectedTodos;
        const newSelectedTodo = {}
        selectedTodos.forEach(selectedTodo => {
            if (selectedTodo.todo_id !== id) {
                newSelectedTodos.push(selectedTodo)
            } else {
                newSelectedTodo.todo_id = selectedTodo.todo_id
                newSelectedTodo.time = selectedTodo.time
                newSelectedTodo.description = selectedTodo.description
                newSelectedTodo.done = selectedTodo.done
                newSelectedTodo.type = selectedTodo.type
                newSelectedTodo.deleted = true
                console.log(newSelectedTodo)
                
                newSelectedTodos.push(newSelectedTodo)
            }
        })
        this.props.onTodosChange(newTodos, newSelectedTodos)
    }

    moveToTrash = async (id) => {
        try {
            const moveToTrash = await axios.put(`/todos/to_trash/${id}`)
            this.onMoveToTrash(id)

        } catch (err) { 
            console.error(err.message)            
        }
    }
 
render() { 
    
    return (
    <div className="tabcontent" id="Done" style={{border: "none"}}>
        {" "}
        <table className="text-center">
            <thead>
            <tr className="d-flex">
                <th className="col-lg-2">Время</th>
                <th className="col-lg-5">Описание</th>
                <th className="col-lg-2">Тип</th>
                <th className="col-lg-3">Редактировать</th>
            </tr>
            </thead>
            <tbody>
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
            </tr> */}
            {this.props.doneTodos.map(todo => (
                <tr className="d-flex" key = {todo.todo_id}>
                    <td className="col-lg-2">{todo.time}</td>
                    <td className="col-lg-5">{todo.description}</td>
                    <td className="col-lg-2">{todo.type}</td>
                    <td className="col-lg-2"><EditTodo todo={todo}/></td>
                    <td className="col-lg-1">
                        <button
                            className="btn bnt-danger"
                            onClick={()=>this.moveToTrash(todo.todo_id)}
                        ><FontAwesomeIcon icon="trash" />
                        </button> 
                    </td>
                </tr> 
            ))}           
            </tbody>
        </table>
    </div>
    )
}
}