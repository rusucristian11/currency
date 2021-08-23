import React from 'react';
import './Header.scss';

export default class Header extends React.Component {

    data = new Date()
    render(){
        return(
            <React.Fragment>
                <header className='header'>
                    <a className='header-logo-text' href="/">
                        <div className='logo'/>
                        Currency Exchange
                    </a>
                    <a className='date-of-today'>
                        <div className='dot-logo'/>
                        : {this.data.toLocaleDateString()}
                    </a>
                </header>
            </React.Fragment>
        );
    }
}