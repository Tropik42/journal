import React, {Component} from 'react'
import axios from '../../axios/axios'
import './Links.css'

import AddLink from  '../../components/AddLink/AddLink'

export default class Links extends Component {

    state = {
        links: []
    }

    onAddNewLink = (response) => {
        const newLink = response
        const links = this.state.links
        links.push(newLink)
        this.setState({links})
    }

    getLinks = async () => {
        try {
            const response = await axios.get('/links')
            this.setState({links: response.data})
        } catch (err) {
            console.error(err.message)
        }
    }

    componentDidMount() {this.getLinks()}     
    

    render() {
        return(
            <div className="links container-fluid">
            <div className="row">
                <h1 className="mt-5 text-center">Закладки</h1> 
                <AddLink
                    onAddNewLink = {this.onAddNewLink}
                />
            </div>
            {this.state.links.map(link => (
                <a className="link" href={link.link} key={link.link_id}>
                    <div className="d-flex flex-column">                  
                        <div><h3 className="float-left">{link.title}</h3><p className="float-right">{link.type}</p></div>
                        <div><p>{link.description}</p></div>    
                    </div>                 
                </a>
            ))}

            </div>
        )
    }
}