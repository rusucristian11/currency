import React from 'react';
import './Card.scss';
import CardInfo from "../../CardInfo";

export default class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyInput: null,
        }
    }

    handleInputChange(value) {
        this.setState({currencyInput: value});
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className='card'
                    style={{backgroundColor: `${this.props.mainCurrency === this.props.currencies.short ? '#E9EBF8' : ''}`}}
                    onClick={() => {this.props.changeMainCurrency(this.props.currencies.short)}}>
                    <span className='delete-card' onClick={() => {this.props.removeCurrency(this.props.currencies.short)}}/>
                    <div className='flag-sign-input'>
                        {/*<img src= {this.props.currencies.flag} />*/}
                        <div className='sign'>{this.props.currencies.sign}</div>
                        <input
                            className='input'
                            type="number"
                            onChange={(event) => this.handleInputChange(event.target.value)}
                            onBlur={(event) => this.props.changeValueMainCurrency(this.state.currencyInput, event)}
                            value={this.props.currencies.from * this.props.currencies.to || this.state.currencyInput }
                        />
                    </div>
                    <div className='symbol-full-name'>{this.props.currencies.short} - {this.props.currencies.long}</div>
                    <div className='conversion'>1 {this.props.mainCurrency} = {this.props.currencies.to} {this.props.currencies.short}</div>
                </div>
            </React.Fragment>
        );
    }
}
