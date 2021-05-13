import React, {Fragment, useState} from 'react'
import axios from '../../axios/axios'

import './EditTodo.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description)
    const [type, setType] = useState(todo.type)

    //edit description function
    const updateDescription = async (e) => {
        e.preventDefault()
        try {
            const body = {description, type}

            const response = await axios.put(`/todos/${todo.todo_id}`, body)
            console.log(response)

        window.location = "/"         
        } catch (err) {
            console.error(err.message)            
        }
    }
    
    return (
    <Fragment>
        <button 
            type="button" 
            className="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}
            disabled //Пока не работает
        >
            <FontAwesomeIcon icon="edit" />
        </button>

        <div 
            className="modal" 
            id={`id${todo.todo_id}`}
            // onClick={()=> {
            //     setDescription(todo.description)
                // setType(todo.type)
                // }
            // }
            >
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Редактировать задание</h4>
                <button 
                    type="button" 
                    className="close" 
                    data-dismiss="modal"
                    onClick={()=> {
                        setDescription(todo.description)
                        setType(todo.type)
                        }
                    }
                >
                    &times;
                </button>
            </div>

            <div className="modal-body">
                <input type='text' 
                className="form-control" 
                value={description} 
                onChange={e => 
                setDescription(e.target.value)}
                />
                <label htmlFor="exampleFormControlSelect1">Тип заметки</label>
                <select 
                    className="form-control" 
                    id="exampleFormControlSelect1"
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                </div>

            <div className="modal-footer">
                <button 
                    type="button" 
                    className="btn btn-warning" 
                    data-dismiss="modal"
                    onClick={e => updateDescription(e)}
                >
                    Сохранить
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    data-dismiss="modal"
                    onClick={()=> {
                        setDescription(todo.description)
                        setType(todo.type)
                        }
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

export default EditTodo