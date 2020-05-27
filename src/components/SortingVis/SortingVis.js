import React from 'react'
import './SortingVis.css'
import SortingButtons from './SortingButtons/SortingButtons'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const NUM_ARRAY_BARS = Math.floor(SCREEN_WIDTH/18)
const BAR_COLOR = 'pink'

function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class SortingVis extends React.Component {
        constructor(props) {
                super(props)

                this.state = {
                        array: []
                }

                this.generateNewArray = this.generateNewArray.bind(this)
        }

        componentDidMount() {
                this.generateNewArray()
        }

        generateNewArray() {
                const array = [];
                for (let i = 0; i < NUM_ARRAY_BARS; i++) {
                        array.push(generateRandomNumber(SCREEN_HEIGHT*0.05, SCREEN_HEIGHT*0.85))
                }
                this.setState({array: array})
        }

        render() {
                const finalArray = this.state.array
                return (
                        <div>
                                <div className='buttons'>
                                        <SortingButtons 
                                                reset={this.generateNewArray} 
                                                stateArray={this.state.array}/>
                                </div>
                                <div className='bars'>
                                        {finalArray.map((number, id) => (
                                                <div 
                                                        className='singleBar'
                                                        key = { id }
                                                        style = {{ 
                                                                backgroundColor: BAR_COLOR,
                                                                height: `${number}px`
                                                        }}>
                                                </div>
                                        ))}
                                </div>
                        </div>
                )
        }
}