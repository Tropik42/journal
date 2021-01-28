import React, { Component, Fragment } from 'react'
import axios from '../../../axios/axios'
import './AddPerson.css'

export default class AddPerson extends Component {


    state = {
        title: '',
        description: '',
        type: ''
    }
 
    addNewPerson = async () => {
        try {
            const body = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type
            }
            const response = await axios.post("/persons", body)
            this.props.onAddNewPerson(response.data)
        } catch (err) {
            console.error(err.message)
        }
    }    

    render() {

        return (
            <Fragment>            
                
            <button 
                className="addBtn btn btn-warning btn-lg" 
                data-toggle="modal"
                data-target="#addPerson"
                onClick={() => {
                    this.setState({
                        title: '',
                        description: '',
                        type: ''
                    })
                    }
                }
            >
                Добавить человека
            </button> 
    
            <div 
                className="modal" 
                id="addPerson"              
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

                    <label htmlFor="title">Заголовок</label>
                    <input type='text' 
                    className="form-control" 
                    value={this.state.title} 
                    id="title"
                    onChange={e => {
                    this.setState({
                        title: e.target.value})      
                    }}
                    />
                    <label htmlFor="description">Описание</label>
                    <textarea 
                    type='text' 
                    rows="12" 
                    className="form-control" 
                    value={this.state.description} 
                    id="description"
                    onChange={e => {
                    this.setState({
                        description: e.target.value})      
                    }}
                    />
                    <label htmlFor="type">Тип</label>
                    <input type='text' 
                    className="form-control" 
                    value={this.state.type} 
                    id="type"
                    onChange={e => {
                    this.setState({
                        type: e.target.value})      
                    }}
                    />
                    
                    </div>
    
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => this.addNewPerson()}
                    >
                      Сохранить изменения</button>
                  </div>
    
            </div>
            </div>
            </div>
        </Fragment>
        )
    }
}