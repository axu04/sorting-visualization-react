//SortingVis.js

import React from 'react'
import './SortingVis.css'
import SortingButtons from './SortingButtons/SortingButtons'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const NUM_ARRAY_BARS = Math.floor(SCREEN_WIDTH/15)

//generateRandomNumber
//Parameters: min - minimum bound of number
//            max - maximum bound of number
//Returns: A random number
//Does: Generates a random number between the min value and the max 
//      value 
function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class SortingVis extends React.Component {
        constructor(props) {
                super(props)

                this.state = {
                        array: [],
                        primaryColor: {
                                r: '255', g: '192', b: '203', a: '1'
                        },
                        secondaryColor: {
                                r: '255', g: '0', b: '0', a: '1'
                        }
                }
                
                //bind methods of SortingVis class that update state
                this.generateNewArray = this.generateNewArray.bind(this)
                this.changeColor = this.changeColor.bind(this)
        }

        //componentDidMount React lifecycle method
        componentDidMount() {
                this.generateNewArray()
        }

        //generateNewArray function
        //Parameters: None
        //Returns: array
        //Does: Generates a new array containing randomly generated values 
        generateNewArray() {
                const array = [];
                for (let i = 0; i < NUM_ARRAY_BARS; i++) {
                        array.push(generateRandomNumber(SCREEN_HEIGHT*0.05, SCREEN_HEIGHT*0.80))
                }
                this.setState({array: array})
        }

        //changeColor function
        //Parameters: r,g,b,a - RGBA values of a color 
        //Returns: Nothing
        //Does: Changes the state of the current class based
        //      on the passed in color 
        changeColor(r,g,b,a) {
                this.setState({primaryColor: {
                                r: r, g: g, b: b, a: a}})
        }

        //render components
        render() {
                const finalArray = this.state.array
                //current bar color 
                let barColor = `rgba(${ this.state.primaryColor.r }, 
                        ${ this.state.primaryColor.g }, 
                        ${ this.state.primaryColor.b }, 
                        ${ this.state.primaryColor.a })`
                return (
                        <div>
                                <div className='buttons'>
                                {/* Creates a bar for each sorting algorithm button as 
                                    well as a speed slider and color selector */}
                                        <SortingButtons 
                                                reset={this.generateNewArray} 
                                                stateArray={finalArray}
                                                barColor={this.state.primaryColor}
                                                secondColor={this.state.secondaryColor}
                                                changeColor={this.changeColor}/>
                                </div>
                                {/* arrays values within the array and maps 
                                    each value to a bar and a corresponding height */}
                                <div className='bars'>
                                        {finalArray.map((number, id) => (
                                                <div 
                                                        className='singleBar'
                                                        key = { id }
                                                        style = {{ 
                                                                backgroundColor: barColor,
                                                                height: `${number}px`
                                                }}>
                                                </div>
                                        ))}
                        </div>
                        </div>
                        
                )
        }
}