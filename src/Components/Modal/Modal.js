import React from 'react';
import './Modal.scss';
import axios from "axios";


const urlForAllSymbols = 'http://api.exchangeratesapi.io/v1/symbols?access_key=227a2856d8390870a8e707b7b28ae1f2'

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
            selectedCurrencies: [],
            loading: true,
        }
    }

    addElementToSelected = (el) => {
        this.setState({selectedCurrencies: [...this.state.selectedCurrencies, el]})
    }

    resetForm = () => {
        this.setState({selectedCurrencies: []})
    }

    isSelected = (el) => {
        let founded = false
        this.state.selectedCurrencies.forEach((ele) => {
            if (ele[0] === el[0]) {
                founded = true
            }
        })
        return founded
    }

    componentDidMount() {
        axios.get(urlForAllSymbols)
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    this.setState({currencies: res.data.symbols, loading: false})
                } else {
                    this.setState({loading: false})
                }
            })
    }

    render() {
        return !this.props.modalStatus ? null : (
            <React.Fragment>
                <div className='backdrop'/>
                <div className='modal-wrapper'>
                    <div className='modal-header'>
                        <span className='close-modal' onClick={() => {
                            this.setState({selectedCurrencies: []})
                            this.props.toggleModal()
                        }}/>
                    </div>
                    <div className='modal-content'>
                        {this.state.loading
                            ? <h3>This page is still loading</h3>
                            : Object.entries(this.state.currencies).map((el, index) => {
                                return <div className='modal-card'
                                    onClick={() => this.addElementToSelected(el)}
                                    key={index}
                                    style={{backgroundColor: this.isSelected(el) ? 'yellow' : 'white'}}
                                >
                                    {el[0]} - {el[1]}
                                </div>
                            })
                        }
                    </div>
                    <div className='modal-footer'>
                        <button className='modal-reset-button' onClick={this.resetForm}>Reset</button>
                        <button className='modal-add-button'
                                onClick={() => {
                                    this.setState({selectedCurrencies: []})
                                    this.props.saveData(this.state.selectedCurrencies)}
                                }
                        >Add currency</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
