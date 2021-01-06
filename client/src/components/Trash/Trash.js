import React, { Component } from 'react'
// import axios from '../../axios/axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Trash extends Component {

render() {
    
    return (
    <div className="tabcontent" id="Trash" style={{border: "none"}}>
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
            {this.props.deletedTodos.map(todo => (
                <tr className="d-flex" key = {todo.todo_id}>
                    <td className="col-lg-2">{todo.time}</td>
                    <td className="col-lg-5">{todo.description}</td>
                    <td className="col-lg-2">{todo.type}</td>
                    <td className="col-lg-3">
                        <button
                            className="btn bnt-danger"
                            // onClick={()=>this.deleteTodo(todo.todo_id)}
                        ><FontAwesomeIcon icon="trash-restore" />
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