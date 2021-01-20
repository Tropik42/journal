import React, {Component} from 'react'
import './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
        {to: '/Todos', label: 'Зарубки', exact: true}, 
        {to: '/Links', label: 'Закладки', exact: false}, 
        {to: '/Lists', label: 'Списки', exact: false}, 
        {to: '/Calendar', label: 'Календарь', exact: false}, 
    ]

    export default class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                   <NavLink
                    to = {link.to}
                    exact = {link.exact}
                    activeClassName="active"
                    onClick={this.clickHandler}
                   >
                        {link.label}
                   </NavLink> 
                </li>
            )
        })
    }
   
    render() {

        const cls = ['Drawer']

        if (!this.props.isOpen) {
            cls.push('close')
        }

        return (
            <>
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks() }                    
                </ul>
            </nav>
            { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
            </>
        )
    }    
}
 
