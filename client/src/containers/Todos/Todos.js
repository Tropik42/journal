import React, { Component } from "react"
// import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlus, faCheck, faEdit, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons'

import './Todos.css';

//components 
import InputTodo from "../../components/InputTodo/InputTodo"
import ListTodos from "../../components/ListTodos/ListTodos"
import UnDoneTodos from "../../components/UnDoneTodos/UnDoneTodos";
import Trash from "../../components/Trash/Trash"
import DoneTodos from "../../components/DoneTodos/DoneTodos";

library.add(faTimes, faPlus, faCheck, faEdit, faTrash, faTrashRestore)

export default class Todos extends Component {

  constructor(props) {
    super(props);
    this.onTodosGet = this.onTodosGet.bind(this);
    this.onNewTodos = this.onNewTodos.bind(this);
    this.onNewType = this.onNewType.bind(this);
    this.onItsDone = this.onItsDone.bind(this);
    this.onMoveToTrash = this.onMoveToTrash.bind(this);
    this.onItsDelete = this.onItsDelete.bind(this);
    this.onDeleteDoneTodo = this.onDeleteDoneTodo.bind(this);
    this.onGetTypes = this.onGetTypes.bind(this);
    this.onDeleteType = this.onDeleteType.bind(this);
    this.state = {
      todos: [],
      selectedTodos: [],
      types: [],
      isAll: true,
      selectedType: "Всё",
      currentPage: 1,
      todosPerPage: 6
    }
  } 

  onTodosGet(todos) {
    this.setState({
      todos: todos,
      selectedTodos: todos
    });
    // console.log(this.state)    
  }

  //TODO: Если выбрано ВСЁ, должен обновляться только todos

  onNewTodos(response) {
    var newTodosState = this.state.todos
    newTodosState.push(response)
    if (this.state.isAll) {
      this.setState({
        todos: newTodosState
      })
    } else {
      var newSelectedTodosState = this.state.selectedTodos
      newSelectedTodosState.push(response)
      this.setState({
        todos: newTodosState,
        selectedTodos: newSelectedTodosState
      })
    }
  }

  onNewType(response) {
    var newState = this.state.types
    newState.push(response)
    this.setState({
      types: newState
    })
  }

  onGetTypes(types) {
    this.setState({types});
  }

  onDeleteType(types) {
    this.setState({types});
  }

  onItsDone(todos, selectedTodos) {
    this.setState({
      todos: todos,
      selectedTodos: selectedTodos
    });
  }

  onMoveToTrash(todos, selectedTodos) {
    this.setState({
      todos: todos,
      selectedTodos: selectedTodos
    });  
    console.log('Работает')
    
  }

  onItsDelete(todos) {
    this.setState({todos});
  }

  onDeleteDoneTodo(todos) {
    this.setState({todos})
  }

  onSelectType(e) {
    if (e === "Всё") {
      this.setState({
        selectedTodos: this.state.todos,
        isAll: true,
        selectedType: e
      })
    } else {
      const selectedTodos =  this.state.todos.filter(todo => todo.type === e)
      this.setState({
        selectedTodos,
        isAll: false,
        selectedType: e
      })
    }
  }

  paginate = pageNumber => this.setState({currentPage: pageNumber});
 

  openCity = (e, cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent")
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName("tablinks")
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" activeTab", "")
    }

    document.getElementById(cityName).style.display = "block"
    e.currentTarget.className += " activeTab"    
  }

render() {

  const todos = this.state.todos
  const selectedTodos = this.state.selectedTodos

  const listTodos = this.state.selectedTodos.filter(todo => todo.deleted === false)
  const unDoneTodos = this.state.selectedTodos.filter(todo => (todo.done === false && todo.deleted === false))
  const doneTodos = this.state.selectedTodos.filter(todo => (todo.done === true && todo.deleted === false)) 
  const deletedTodos = this.state.selectedTodos.filter(todo => todo.deleted === true)

  const types = this.state.types

  //pagination
  const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage
  const currentListTodos = listTodos.slice(indexOfFirstTodo, indexOfLastTodo)

    return (    
      <div className="container">
        
        <InputTodo 
          onNewTodos = {this.onNewTodos} 
          onGetTypes = {this.onGetTypes}
          onNewType = {this.onNewType}
          onDeleteType = {this.onDeleteType}
          types = {types}
        />  
            <div className="tab mt-3">
              <button className="tablinks" onClick={e => this.openCity(e, 'All')} >Все</button>
              <button className="tablinks active" onClick={e => (this.openCity(e, 'unDone'))}>Невыполненные</button>
              <button className="tablinks" onClick={e => this.openCity(e, 'Done')}>Выполненные</button>
              <button className="tablinks float-right" onClick={e => this.openCity(e, 'Trash')}>Удалённые</button>
              <button type="button" className="tablinks btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Выбрать тип
              </button>
              <div className="dropdown-menu">
                <button 
                      className="dropdown-item"  
                      value="Всё"
                      onClick={e => this.onSelectType(e.target.value)}
                    >Всё</button>
                {types.map(type => (
                  <button 
                    key={type.type_id}
                    className="dropdown-item" 
                    value={type.description}
                    onClick={e => this.onSelectType(e.target.value)}
                  >{type.description}</button>
                ))}
              </div>
                <div className="mt-3"><span >Выбранный тип: {this.state.selectedType}</span></div>
            </div>
            
        <ListTodos
          todos={todos}
          listTodos={currentListTodos}
          onTodosGet={this.onTodosGet}
          onItsDelete = {this.onItsDelete}
          todosPerPage={this.state.todosPerPage}
          totalTodos={listTodos.length}
          paginate={this.paginate}
        />
        <UnDoneTodos
          todos={todos}
          selectedTodos={selectedTodos}
          unDoneTodos={unDoneTodos}
          onItsDone = {this.onItsDone}
        />
        <DoneTodos
          todos={todos}
          selectedTodos={selectedTodos}
          doneTodos={doneTodos}
          onMoveToTrash = {this.onMoveToTrash}
        />            
        <Trash
          todos={todos}
          deletedTodos={deletedTodos}
        />
      </div>    
    )
  }
}

