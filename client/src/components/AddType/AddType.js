import React, {Component, Fragment} from 'react'
import axios from '../../axios/axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AddType extends Component {

  constructor(props) {
    super(props);
    this.onNewType = this.onNewType.bind(this);
    this.state = {
        description: 'Введите новый тип заметки'
    }
}

    onNewType (response) {
      this.props.onNewType(response);
    }

    addNewType = async () => {
            try {

              // const newType = this.state.description
              const body = {description: this.state.description}
              const response = await axios.post("/types", body)
              console.log(response.data)
              this.onNewType(response.data)
              
            } catch (err) {
              console.error(err.message)
              
            }
          }

    render() {     

        return(

            <Fragment>

            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
              <FontAwesomeIcon icon="plus" />
            </button>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="recipient-name"
                          placeholder={this.state.description} 
                          onChange={e => this.setState({
                            description: e.target.value
                          })}
                        />
                    </div>
                </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={e => this.addNewType(e)}
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