import React from 'react';
import './Homepage.scss';
import Card from "../Components/Card/Card";
import CardInfo from "../CardInfo";
import Modal from "../Components/Modal/Modal";
import axios from "axios";

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.changeMainCurrency = this.changeMainCurrency.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    state = {
        modalStatus: false,
        mainCurrency: null,
        currencies: []
    }

    changeMainCurrency = (id) => {
        this.setState({mainCurrency: id})
        let response = this.state.currencies.map((el) => el.short).filter((el) => el !== id)
        const url = `http://api.exchangeratesapi.io/v1/latest?access_key=227a2856d8390870a8e707b7b28ae1f2&base=${id}&symbols=${response.join()}`
        axios.get(url).then(res => {
            if(res.status === 200 && res.data){
                let result = [...this.state.currencies]
                result = result.map(el => {
                    el.to = res.data.rates[el.short]
                    return el
                })
            }
        })
    }

    toggleModal = () => {
        this.setState({modalStatus: !this.state.modalStatus})
    }

    removeCurrency = (id) => {
        const result = this.state.currencies.filter((el) => el.short !== id)
        this.setState({currencies: result})
    }

    saveModalData = (data) => {
        if (data.length > 0) {
            let resultList = []
            data.forEach((el) => {
                const card = new CardInfo('', '', '', el[0], el[1])
                resultList.push(card)
            })
            this.setState({currencies: resultList})

        }
    }

    changeValueMainCurrency = (value) => {
        let result = [...this.state.currencies]
        result = result.map((el) => {
            el.from = value
            return el
        })
        this.setState({currencies: result})
    }


    render() {
        return (
            <div className='homepage'>
                <div className='cards'>
                    {this.state.currencies.map((el, index) =>
                        <Card
                            key={index}
                            changeMainCurrency={this.changeMainCurrency}
                            changeValueMainCurrency={this.changeValueMainCurrency}
                            currencies={el}
                            mainCurrency={this.state.mainCurrency}
                            removeCurrency={this.removeCurrency}
                        />
                    )}
                </div>
                <Modal
                    modalStatus={this.state.modalStatus}
                    toggleModal={this.toggleModal}
                    saveData={this.saveModalData}
                />
                <button className='add-currency' onClick={() => {
                    this.toggleModal()
                }}>Add Currency
                </button>
            </div>
        )
    }
}
