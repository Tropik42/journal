import React, { Component, Fragment } from 'react'
import axios from '../../axios/axios'
import './AddLink.css'

export default class AddLink extends Component {

    state = {
                title: '',
                link: '',
                description: '',
                type: ''
            }

    // constructor(props) {
    //     super(props);
    //     this.onAddNewList = this.onAddNewList.bind(this);
    //     this.state = {
    //         title: '',
    //         description: '',
    //         type: ''
    //     }
    //   }

    onAddNewLink (response) {
        this.props.onAddNewLink(response);
    }

    addNewLink = async () => {
        try {
            const body = {
                title: this.state.title,
                link:  this.state.link,
                description: this.state.description,
                type: this.state.type
            }
            const response = await axios.post("/links", body)
            this.onAddNewLink(response.data)
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
                data-target="#addList"
                onClick={() => {
                    this.setState({
                        title: '',
                        link: '',
                        description: '',
                        type: ''
                    })
                    }
                }
            >
                Добавить закладку
            </button> 
    
            <div 
                className="modal" 
                id="addList"              
            >
            <div className="modal-dialog">
                <div className="modal-content">
    
                <div className="modal-header">
                    <h4 className="modal-title">Добавление закладки</h4>
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
                    <label htmlFor="link">Ссылка</label>
                    <input type='text' 
                    className="form-control" 
                    value={this.state.link} 
                    id="link"
                    onChange={e => {
                    this.setState({
                        link: e.target.value})      
                    }}
                    />
                    <label htmlFor="description">Описание</label>
                    <textarea 
                    type='text' 
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
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => this.addNewLink()}
                    >
                      Save changes</button>
                  </div>
    
            </div>
            </div>
            </div>
        </Fragment>
        )
    }
}