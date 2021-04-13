import React from 'react'
import { Component } from 'react';
import axios from '../../axios/axios'
import AddPerson from '../../components/Persons/AddPerson/AddPerson'
import EditPerson from '../../components/Persons/EditPerson/EditPeson'

import './Persons.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Persons extends Component {

      
    state = {
            persons: []
        }

    getPersons = async () => {        
        try {
            const response = await axios.get("/persons")
            this.setState(
                {persons: response.data}
            )
        } catch (err) {
            console.error(err.message)            
        }
    }

    onAddNewPerson = (response) => {
        var newState = this.state.persons
        newState.push(response)
        this.setState({
         persons: newState
        })
      } 

    onPersonUpdate = (id, body) => {
        const state = this.state.persons;
        const persons = [];
        let newPerson = {};
        state.forEach(person => {
            if (person.person_id !== id) {
                persons.push(person)
            } else {
                newPerson = {
                    ...person,
                    title: body.title,
                    type: body.type,
                    description: body.description
                }
                persons.push(newPerson)
            }
        })        
        this.setState({persons})
        // console.log(id, body);
    }

    // listDelete = async (id) => {
    //     const lists = this.state.lists.filter(list => list.list_id !== id)
    //     this.setState({lists})
    //     try {
    //         await axios.delete(`/lists/${id}`)
    //     } catch (err) {
    //         console.error(err.message)
    //     }       
    // }

    componentDidMount() {this.getPersons()}

    render () {
        return (

            <div className="con2 container-fluid">
            <div className="Tabs d-flex flex-wrap align-content-start mt-5">
                {this.state.persons.map(person => (
                    <div className="listTab d-flex flex-column" key={person.person_id}>
                        <div className="tab-head container">
                            <h3 className="float-left">{person.title}</h3> 
                            <button 
                                className="btn btn-danger float-right" 
                                // onClick={()=>this.listDelete(list.list_id)}                               
                            >
                                <FontAwesomeIcon icon="times" />
                            </button> 
                        </div>
                        <div className="tab-body">
                            <pre>{person.description}</pre>
                        </div>
                        <div className="tab-footer">
                            <h6 className="float-left ">Тип: {person.type}</h6>
                            <EditPerson 
                                person={person}
                                onPersonUpdate={this.onPersonUpdate}
                            />      
                        </div>                
                    </div>
                ))}
                <div className="listTab mb-5">
                    <AddPerson
                        onAddNewPerson={this.onAddNewPerson}
                    />
                </div>
            </div>
            </div>
        )
    }
}