import React, { Component } from 'react'
import axios from '../../axios/axios'

import './Trash.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Trash extends Component {
    constructor(props) {
        super(props);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
        this.onRestoreTodo = this.onRestoreTodo.bind(this);
    }

    deleteTodo = async (id) => {
            try {
                await axios.delete(`/todos/${id}`)
                this.onDeleteTodo(id)
            } catch (err) {
                console.error(err.message)            
            }
        }

    onDeleteTodo (id) { 
        const newTodos = this.props.todos.filter(todo => todo.todo_id !== id)
        const newSelectedTodos = this.props.selectedTodos.filter(todo => todo.todo_id !== id)
        this.props.onTodosChange(newTodos, newSelectedTodos)
    }    

    restoreTodo = async (id) => {
        try {
            await axios.put(`/todos/restore/${id}`)
            this.onRestoreTodo(id)
        } catch (err) {
            console.error(err.message);
        }
    }

    onRestoreTodo (id) {
        const newTodos = [];
        const todos = this.props.todos;
        const newTodo = {}

        //THE GREAT MAX RECOMMENDED - сократить всё
            // const index = todos.find(todo => todo.todo_id === id);
            // todos[index].done = true;

        todos.forEach(todo => {
            if (todo.todo_id !== id) { 
                newTodos.push(todo)
            } else {

        //THE GREAT MAX RECOMMENDED - сократить только создание нового объекта
            // newTodo = {
            //     ...todo,
            //     done: true,
            // };

                newTodo.todo_id = todo.todo_id
                newTodo.time = todo.time
                newTodo.description = todo.description
                newTodo.done = todo.done
                newTodo.type = todo.type
                newTodo.deleted = false
                
                newTodos.push(newTodo)
            }
        });

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
                newSelectedTodo.deleted = false
                
                newSelectedTodos.push(newSelectedTodo)
            }
        })
        this.props.onTodosChange(newTodos, newSelectedTodos)
      }  
    

render() {
    
    return (
    <div className="tabcontent" id="Trash" style={{border: "none"}}>
        {" "}
        <table className="text-center">
            <thead>
            <tr className="d-flex">
                <th className="col-lg-2">Время</th>
                <th className="col-lg-5">Описание</th>
                <th className="col-lg-2">Тип</th>
                <th className="col-lg-3">Действия</th>
            </tr>
            </thead>
            <tbody>
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
            </tr> */}
            {this.props.deletedTodos.map(todo => (
                <tr className="d-flex" key = {todo.todo_id}>
                    <td className="col-lg-2">{todo.time}</td>
                    <td className="col-lg-5">{todo.description}</td>
                    <td className="col-lg-2">{todo.type}</td>
                    <td className="col-lg-2">
                        <button
                            className="btn btn-default"
                            onClick={()=>this.restoreTodo(todo.todo_id)}
                        ><FontAwesomeIcon icon="trash-restore" />
                        </button> 
                    </td>
                    <td className="col-lg-1">
                        <button
                            className="btn btn-danger"
                            onClick={()=>this.deleteTodo(todo.todo_id)}
                        ><FontAwesomeIcon icon="minus-square" />
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