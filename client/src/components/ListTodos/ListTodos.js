import React, { Fragment, Component } from 'react'
import axios from '../../axios/axios'
import EditTodo from '../EditTodo/EditTodo'
import Pagination from '../Pagination/Pagination'

import './ListTodos.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ListTodos extends Component {

    constructor(props) {
        super(props);
        this.onTodosGet = this.onTodosGet.bind(this);
        this.onItsDelete = this.onItsDelete.bind(this);
        this.paginate = this.paginate.bind(this);
      }

    onTodosGet(response) {
        this.props.onTodosGet(response.data);
    }  

    getTodos = async () => {
        
        try {
            const response = await axios.get("/todos")
            this.onTodosGet(response)
        } catch (err) {
            console.error(err.message)            
        }
    }

    paginate = (number) => {this.props.paginate(number)}

    onItsDelete(id) {
        const newTodos = [];
        const todos = this.props.todos;
        const newTodo = {}
        todos.forEach(todo => {
            if (todo.todo_id !== id) {
            newTodos.push(todo)}
            else {
                newTodo.todo_id = todo.todo_id
                newTodo.time = todo.time
                newTodo.description = todo.description
                newTodo.done = todo.done
                newTodo.type = todo.type
                newTodo.deleted = true
                console.log(newTodo)
                
                newTodos.push(newTodo)
            }
        });
        this.props.onItsDelete(newTodos)
    } 

    deleteTodo = async (id) => {

        try {
            const moveToTrash = await axios.put(`/todos/to_trash/${id}`)
            this.onItsDelete(id)

        } catch (err) {
            console.error(err.message)            
        }
    }    

componentDidMount() {
    this.getTodos() 
}

render() {

    return (
    <Fragment>
        <div className="tabcontent" id="All" style={{border: "none"}}>
            {" "}
            <table className="table text-center">
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
                {this.props.listTodos.map(todo => (
                    <tr 
                        className={`d-flex ${todo.done===true?'done':null}`} 
                        key = {todo.todo_id}>
                        <td className="col-lg-2">{todo.time}</td>
                        <td className="col-lg-5">{todo.description}</td>
                        <td className="col-lg-2">{todo.type}</td>
                        <td className="col-lg-2"><EditTodo todo={todo}/></td>
                        <td className="col-lg-1">
                            <button 
                                className="btn bnt-danger"
                                onClick={()=>this.deleteTodo(todo.todo_id)}
                            ><FontAwesomeIcon icon="trash" />
                            </button> 
                        </td>
                    </tr> 
                ))}           
                </tbody>
            </table>
            <Pagination
                todosPerPage={this.props.todosPerPage}  
                totalTodos={this.props.totalTodos}  
                paginate={this.props.paginate}
            />
        </div>
        
    </Fragment>
    )
}
}