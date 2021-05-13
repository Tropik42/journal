import React, {Component, Fragment} from 'react'
import axios from '../../axios/axios'
import AddType from '../AddType/AddType'
import EditTypes from '../EditTypes/EditTypes'

import './InputTodo.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class InputTodo extends Component {

    constructor(props) {
        super(props);
        this.onNewTodos = this.onNewTodos.bind(this);
        this.onGetTypes = this.onGetTypes.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onNewType = this.onNewType.bind(this);
        this.state = {
            description: 'Дратути',
            type: 'Общее',
            comment: ''
        }
    }

    onGetTypes(response) {
        this.props.onChangeTypes(response.data)
    }

    getTypes = async () => {
        try {
            const response = await axios.get("/types")
            this.onGetTypes(response)
        } catch (err) {
            console.error(err.message)
        }
    }

    onNewTodos(response) {
            this.props.onNewTodos(response);
    }

    onNewType(response) {
            this.props.onNewType(response);
    }

    onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = {
                description: this.state.description, 
                type: this.state.type,
                comment: this.state.comment}

            const response = await axios.post("/todos", body)
            console.log(response.data)
            
            this.onNewTodos(response.data)

        } catch (err) {
            console.error(err.message)            
        }
    }

    // ty = () => {
    //     console.log(this.props.types)
    // }

    onClear () {
        this.setState({
            description: ''
        })
    }
    

    componentDidMount() {
        this.getTypes()
        // setTimeout(this.ty, 2000
        // )
    }

    render() {

    return (
        <Fragment>
            <h1 className="text-center mt-5">Заметки</h1> 
                
            <form className="mt-5" 
            onSubmit={this.onSubmitForm}
            >

            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.description}
                    onChange={e => this.setState({
                        description: e.target.value
                    })}
                />
                <div className="input-group-append">
                    <button className="btn btn-warning" type="button"
                        onClick={this.onClear}
                    >
                        <FontAwesomeIcon icon="times" /> 
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="comment">Комментарий:</label>
                <textarea 
                    className="form-control" 
                    rows="2" 
                    id="comment"
                    placeholder="Введите комментарий"
                    value={this.state.comment}
                    onChange={e => this.setState({
                        comment: e.target.value
                    })}
                ></textarea>
            </div>

            <p>Тип заметки</p> 
            
            <div className="input-group mb-3">
            <label htmlFor="exampleFormControlSelect1"></label>
                <select 
                    className="custom-select" 
                    id="inputGroupSelect02"
                    value={this.state.type}
                    onChange={e => this.setState({
                        type: e.target.value
                    })}
                >
                    {this.props.types.map( type => (
                        <option key={type.type_id}>{type.description}</option>
                    ))}
                </select>
                <div className="input-group-append">
                    <AddType
                        onNewType = {this.onNewType}
                    />
                </div>
                <div className="input-group-append">
                    <EditTypes
                        types={this.props.types}
                        onChangeTypes={this.props.onChangeTypes}
                    />
                </div>
            </div>
            
                <button className="btn btn-success">Добавить</button> 
            </form>         

        </Fragment>
    )
}
}
