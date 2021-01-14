import React, { Component, Fragment } from 'react'
import axios from '../../axios/axios'
import EditTodo from '../EditTodo/EditTodo'
import Time from '../Time/Time'

import './UnDoneTodos.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class UnDoneTodos extends Component {

    constructor(props) {
        super(props);
        this.onItsDone = this.onItsDone.bind(this);
      }

      onItsDone(id) {
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
                newTodo.done = true
                newTodo.type = todo.type
                newTodo.deleted = todo.deleted
                console.log(newTodo)
                
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
                newSelectedTodo.done = true
                newSelectedTodo.type = selectedTodo.type
                newSelectedTodo.deleted = selectedTodo.deleted
                console.log(newSelectedTodo)
                
                newSelectedTodos.push(newSelectedTodo)
            }
        })
        this.props.onTodosChange(newTodos, newSelectedTodos)
      } 

   itsDone = async (id) => {

        try {
            const deleteTodo = await axios.put(`/todos/done/${id}`)
            this.onItsDone(id)

        } catch (err) { 
            console.error(err.message)            
        }
    }

render() {     
    
    return (
        <div className="tabcontent activeTab" id="unDone" style={{border: "none"}}>
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
                    {this.props.unDoneTodos.map(todo => (
                    <Fragment key={todo.todo_id}>
                    <tr className={`d-flex ${(!todo.comment) ? null : 'hasComment'}`}>
                            <td className="col-lg-2"><Time time={todo.time} /></td>
                            {/* <td className="col-lg-2">{todo.time}</td> */}
                            {/* <td className="col-lg-2">{+todo.time.slice(5,7) !== today ? todo.time : `Сегодня в ${todo.time.slice(11)}`}</td> */}
                            <td className="col-lg-5">{todo.description}</td>
                            <td className="col-lg-2">{todo.type}</td>
                            <td className="col-lg-2"><EditTodo todo={todo}/></td>
                            <td className="col-lg-1">
                                <button
                                    className="btn bnt-danger"
                                    onClick={()=>this.itsDone(todo.todo_id)}
                                ><FontAwesomeIcon icon="check" />
                                </button> 
                            </td>
                    </tr> 
                    
                    {!todo.comment ? null : 
                        <tr className="comment" >
                            <td>{todo.comment}</td>                            
                        </tr>}
                    </Fragment>
                    
                    ))}           
                    </tbody>
                </table>
            </div>
            
        )
    }
}

