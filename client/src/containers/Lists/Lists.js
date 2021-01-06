import React from 'react'
import { Component } from 'react';
import axios from '../../axios/axios'
import EditList from '../../components/EditList/EditList'

import './Lists.css'


export default class Lists extends Component {

    constructor(props) {
        super(props);
        this.onListUpdate = this.onListUpdate.bind(this);        
        this.state = {
            lists: []
        }
      } 

    

    onListsGet (response) {
        this.setState(
            {lists: response.data}
        )
        // console.log(this.state)        
    }

    onListUpdate(lists) {
        this.setState(
            {lists}
        )
        // console.log('На главной странице работает')
        
    }

    getLists = async () => {        
        try {
            const response = await axios.get("/lists")
            this.onListsGet(response)
        } catch (err) {
            console.error(err.message)            
        }
    }

    componentDidMount() {
        this.getLists() 
    }

    render () {
        return (
            <div className="Tabs d-flex flex-wrap align-content-start mt-5">
                {this.state.lists.map(list => (
                    <div className="listTab" key={list.list_id}>
                        <h1 className="text-left">{list.title}</h1> 
                        <p>{list.description}</p>
                        <div>
                        <h6 className="float-left">Тип: {list.type}</h6>
                            <EditList 
                                list={list}
                                lists={this.state.lists}
                                onListUpdate={this.onListUpdate}
                            />     
                        </div>                
                    </div>
                ))}
            </div>
        )
    }
}