import React, { Component, Fragment } from 'react'
import axios from '../../../axios/axios'
import './EditPerson.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class EditPerson extends Component {

state = {
    title: '',
    description: '',
    type: ''
}

    personUpdate = async (id) => {
        const body = this.state
        await axios.put(`/persons/${id}`, body)
        this.props.onPersonUpdate(id, body)
    }    

    render() {

        const id = this.props.person.person_id

        return (
            <Fragment>            
                
            <button 
                className="btn btn-primary float-right" 
                data-toggle="modal"
                data-target={`#id${id}`}
                onClick={() => {
                    this.setState({
                        title: this.props.person.title,
                        description: this.props.person.description,
                        type: this.props.person.type
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
                        onClick={() => this.personUpdate(id)}
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