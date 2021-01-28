import React, { Component, Fragment } from 'react'
import axios from '../../axios/axios'
import './EditList.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class EditList extends Component {

    constructor(props) {
        super(props);
        this.onListUpdate = this.onListUpdate.bind(this);
        this.state = {
            title: '',
            description: '',
            type: ''
        }
      }

    onListUpdate(id) {
       
        const newLists = [];
        const lists = this.props.lists;
        const newList = {}; 
        lists.forEach(list => {
            if (list.list_id !== id) {
                newLists.push(list)
            } else {
                newList.list_id = this.props.list.list_id
                newList.time = this.props.list.time
                newList.title = this.state.title
                newList.description = this.state.description
                newList.type = this.state.type
                // console.log(newList)

                newLists.push(newList)
                // console.log(newLists)
            }
        })
        // console.log(newLists, lists, newList)        
        
        this.props.onListUpdate(newLists)    
        // console.log('Работает')     
    }

    listUpdate = async (id) => {
        const body = this.state

        const response = await axios.put(`/lists/${id}`, body)
        this.onListUpdate(id)
        //console.log(response)
    }

    

    render() {

        const id = this.props.list.list_id

        return (
            <Fragment>            
                
            <button 
                className="btn btn-primary float-right" 
                data-toggle="modal"
                data-target={`#id${id}`}
                onClick={() => {
                    this.setState({
                        title: this.props.list.title,
                        description: this.props.list.description,
                        type: this.props.list.type
                    })
                    }
                }
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

                    <label htmlFor={`${id}editListTitleInput`}>Заголовок</label>
                    <input type='text' 
                    className="form-control" 
                    value={this.state.title} 
                    id={`${id}editListTitleInput`}
                    onChange={e => {
                    this.setState({
                        title: e.target.value})      
                        console.log(this.state.title)                                      
                    }}
                    />
                    <label htmlFor={`${id}editListDescriptionInput`}>Описание</label>
                    <textarea 
                    type='text' 
                    className="form-control" 
                    rows="15"
                    value={this.state.description} 
                    id={`${id}editListDescriptionInput`}
                    onChange={e => {
                    this.setState({
                        description: e.target.value})      
                        console.log(this.state.description)                                      
                    }}
                    />
                    <label htmlFor={`${id}editListTypeInput`}>Тип</label>
                    <input type='text' 
                    className="form-control" 
                    value={this.state.type} 
                    id={`${id}editListTypeInput`}
                    onChange={e => {
                    this.setState({
                        type: e.target.value})      
                        console.log(this.state.type)                                      
                    }}
                    />
                    
                    </div>
    
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        data-dismiss="modal"
                        onClick={() => this.listUpdate(this.props.list.list_id)}
                    >
                        Сохранить
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick={() => 
                            this.setState({
                                title: this.props.list.title,
                                description: this.props.list.description,
                                type: this.props.list.type
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