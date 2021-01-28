import React, { Component, Fragment } from 'react'
import axios from '../../../axios/axios'
import './EditMonthTodo.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class EditMonthTodo extends Component {

    state = {
        todo: this.props.todo
    }    

    monthUpdate = async (id) => {
        const todo = this.state
        await axios.put(`/calendar/${id}`, todo)
        this.props.onCalendarUpdate(id, this.state.todo)
        // console.log(id, todo)
    }

    

    render() {

        const id = this.props.id

        return (
            <Fragment>           
                <button 
                    className="btn btn-warning main"
                    data-toggle="modal"
                    data-target={`#id${id}`}
                    // onClick={() => {
                    //     this.setState({
                    //         todo: '',
                    //     })
                    //     }
                    // }
    
                >
                    <FontAwesomeIcon icon="edit" />
                </button>
            <div 
                className="modal" 
                id={`id${id}`}                
            >
            <div className="modal-dialog">
                <div className="modal-content">
    
                <div className="modal-header">
                    <h4 className="modal-title">Редактировать список</h4>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal"
                        // onClick={()=> {
                        //     setDescription(todo.description)
                        //     setType(todo.type)
                        //     }
                        // }
                    >
                        &times;
                    </button>
                </div>
    
                <div className="modal-body">
                    
                    <label htmlFor={`${id}editListDescriptionInput`}>Описание</label>
                    <textarea 
                    type='text' 
                    className="form-control" 
                    rows="15"
                    value={this.state.todo} 
                    id={`${id}editListDescriptionInput`}
                    onChange={e => {
                    this.setState({
                        todo: e.target.value})      
                    }}
                    />                    
                    
                    </div>
    
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        data-dismiss="modal"
                        onClick={() => this.monthUpdate(this.props.id)}
                    >
                        Сохранить
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick={() => 
                            this.setState({
                                todo: this.state.todo,
                            })
                        }
                    >
                        Закрыть
                    </button>
                </div>
    
            </div>
            </div>
            </div>
        </Fragment>
        )
    }
}