import React, {Component, Fragment} from 'react'
import axios from '../../axios/axios'
import './EditTypes.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class EditTypes extends Component {

  constructor(props) {
    super(props);
        this.onDeleteType = this.onDeleteType.bind(this);
    }

    onDeleteType(id) {
        const newTypes = this.props.types.filter(type => type.type_id !== id)
        this.props.onChangeTypes(newTypes)
    }

    async deleteType (id) {
        try {
            const deleteType = axios.delete(`/types/delete/${id}`)
            this.onDeleteType(id)
            console.log(`Тип с  id ${id} удалён`)
            
        } catch (err) {
            console.error(err.message)            
        }
    }


    // onNewType (response) {
    //   this.props.onNewType(response);
    // }

    // addNewType = async e => {
    //         try {

    //           // const newType = this.state.description
    //           const body = {description: this.state.description}
    //           const response = await axios.post("/types", body)
    //           console.log(response.data)
    //           this.onNewType(response.data)
              
    //         } catch (err) {
    //           console.error(err.message)
              
    //         }
    //       }

    render() {     

        return(

            <Fragment>

            <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editTypesModal">
                <FontAwesomeIcon icon="edit" />
            </button>

            <div className="modal fade" id="editTypesModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Редактирование типов заметок</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.props.types.map(type => (                      
                        <div className="row" key={type.type_id}>
                            <p className="col-md-6">{type.description}</p>
                            <button href="#" className="col-md-1 button27" tabIndex="0"
                                onClick={() => this.deleteType(type.type_id)}
                            >x</button>
                        </div>                        
                    ))}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            
            </Fragment>    
            
            

        )
    }
}