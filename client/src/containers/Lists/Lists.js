import React from 'react'
import { Component } from 'react';
import axios from '../../axios/axios'
import EditList from '../../components/EditList/EditList'
import AddList from '../../components/AddList/AddList'

import './Lists.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Lists extends Component {

    constructor(props) {
        super(props);
        this.onListUpdate = this.onListUpdate.bind(this);        
        this.onAddNewList = this.onAddNewList.bind(this);        
        this.state = {
            lists: []
        }
      }   

    onListUpdate(lists) {this.setState({lists})}

    getLists = async () => {        
        try {
            const response = await axios.get("/lists")
            this.setState(
                {lists: response.data}
            )
        } catch (err) {
            console.error(err.message)            
        }
    }

    onAddNewList(response) {
        var newState = this.state.lists
        newState.push(response)
        this.setState({
         lists: newState
        })
      } 

    listDelete = async (id) => {
        const lists = this.state.lists.filter(list => list.list_id !== id)
        this.setState({lists})
        try {
            await axios.delete(`/lists/${id}`)
        } catch (err) {
            console.error(err.message)
        }   
    
    }

    componentDidMount() {this.getLists()}

    render () {
        return (

            <div className="con2 container-fluid">
            <div className="Tabs d-flex flex-wrap align-content-start mt-5">
                {this.state.lists.map(list => (
                    <div className="listTab d-flex flex-column" key={list.list_id}>
                        <div className="tab-head container">
                            <h3 className="float-left">{list.title}</h3> 
                            <button 
                                className="btn btn-danger float-right" 
                                onClick={()=>this.listDelete(list.list_id)}                               
                            >
                                <FontAwesomeIcon icon="times" />
                            </button> 
                        </div> 
                        <div className="tab-body">
                            <pre>{list.description}</pre>
                        </div>
                        <div className="tab-footer">
                            <h6 className="float-left ">Тип: {list.type}</h6>
                            <EditList 
                                list={list}
                                lists={this.state.lists}
                                onListUpdate={this.onListUpdate}
                            />     
                        </div>                
                    </div>
                ))}
                <div className="listTab mb-5">
                    <AddList
                        onAddNewList={this.onAddNewList}
                    />
                </div>
            </div>
            </div>
        )
    }
}