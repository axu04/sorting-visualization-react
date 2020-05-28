//SortingButtons.js

import React from 'react'
import { bubbleSortAnimations, 
        insertionSortAnimations,
        heapSortAnimations,
        mergeSortAnimations,
        selectionSortAnimations } from './SortingAlgorithms'

import ColorPick from './ColorPick/ColorPick'
import Slider from './Slider/Slider'
import './SortingButtons.css'

//Maximum sorting speed
const MAX_SPEED = 12

export default class SortingButtons extends React.Component {

        constructor(props) {
                super(props)

                //animation array
                this.animation = []
                //timeout array
                this.timeoutAnimation = [];

                //initial values of this class' state
                this.state = {
                        disabled: false,
                        sortingSpeed: 6,
                        sliderDisabled: false,
                        colorPickDisabled: false,
                        swapColor: {
                                r: `${this.props.secondColor.r}`,
                                g: `${this.props.secondColor.g}`,
                                b: `${this.props.secondColor.b}`,
                                a: `${this.props.secondColor.a}`
                        }
                }

                //bind methods that update state
                this.heapSort = this.heapSort.bind(this)
                this.changeSortingSpeed = this.changeSortingSpeed.bind(this)
                this.changeSwapColor = this.changeSwapColor.bind(this)
        }

        //bubbleSort function
        //Parameters: array - array of un-sorted values
        //Returns: Nothing
        //Does: Performs and visualizes a bubble sort 
        bubbleSort(array) {
                this.animation = bubbleSortAnimations(array)
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        //heapSort function
        //Parameters: array - array of un-sorted values
        //Returns: Nothing
        //Does: Performs and visualizes a heap sort
        heapSort(array) {
                this.animation = heapSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        //insertionSort function
        //Parameters: array - array of un-sorted values
        //Returns: Nothing
        //Does: Performs and visualizes an insertion sort
        insertionSort(array) {
                this.animation = insertionSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        //selectionSort function
        //Parameters: array - array of un-sorted values
        //Returns: Nothing 
        //Does: Performs and visualizes a selection sort
        selectionSort(array) {
                this.animation = selectionSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        //mergeSort function
        //Parameters: array - array of un-sorted values
        //Returns: Nothing
        //Does: Performs and visualizes a merge sort 
        mergeSort(array) {
                this.setState({disabled: true})
                this.setState({sliderDisabled: true})
                this.setState({colorPickDisabled: true})
                let bars = document.getElementsByClassName('singleBar')
                this.animation = mergeSortAnimations(array)
                for (let i = 0; i < this.animation.length; i++) {
                        let [firstIndex, secondIndex, typeChange, instruction] = this.animation[i];
                        if (typeChange === 'color') {
                                this.colorSwap(firstIndex, secondIndex, instruction, bars, i);
                        } else {
                                this.timeoutAnimation.push(setTimeout( () => {
                                        const [index, heightVal] = this.animation[i];
                                        bars[index].style.height = heightVal + 'px';
                                }, i*(MAX_SPEED-this.state.sortingSpeed)));
                        } 
                }
        }

        //resetArray function
        //Parameters: Nothing
        //Returns: Nothing
        //Does: clears all unfinished animations, clears all timeouts, 
        //      and re-enables all buttons/sliders 
        resetArray() {
                // this.animation = []
                let bars = document.getElementsByClassName('singleBar')
                for (let i = 0; i < bars.length; i++) {
                        bars[i].style.backgroundColor = `rgba(${ this.props.barColor.r }, 
                                                                ${ this.props.barColor.g }, 
                                                                ${ this.props.barColor.b }, 
                                                                ${ this.props.barColor.a })`
                }
                for (let i = 0; i < this.timeoutAnimation.length; i++) {
                        clearTimeout(this.timeoutAnimation[i])
                }
                this.timeoutAnimation = []
                
                this.setState({disabled: false})
                this.setState({sliderDisabled: false})
                this.setState({colorPickDisabled: false})
        }

        //animationSwap function
        //Parameters: array - array of un-sorted values 
        //            bars - array of div tags corresponding to each array value
        //Returns: Nothing
        //Does: disables all buttons and the slider, and loops through 
        //      array and gets animation data
        animationSwap(array, bars) {
                this.setState({disabled: true})
                this.setState({sliderDisabled: true})
                this.setState({colorPickDisabled: true})
                for (let i = 0; i < array.length; i++) {
                        let [firstIndex, secondIndex, typeChange, instruction] = array[i];
                        this.typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i);
                }
        }

        //typeCheck function
        //Parameters: firstIndex - first index being swapped
        //            secondIndex - second index being swapped
        //            typeChange - type of swap being performed (color/height swap)
        //            instruction - 'direction' of change (change/revert)
        //            bars - array of div tags corresponding to each array value
        //            i - the current index in the main for loop 
        //Returns: Nothig
        //Does: Checks and performs the correct swap in the animation array
        typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i) {
                if (typeChange === 'color') {
                        this.colorSwap(firstIndex, secondIndex, instruction, bars, i);
                } else {
                        this.barSwap(firstIndex, secondIndex, bars, i);
                } 
        }
        
        //barSwap function
        //Parameters: firstVal - first index being swapped
        //            secondVal - second index being swapped
        //            bars - array of div tags corresponding to each array value
        //            i - the current index in the main for loop
        //Returns: Nothing
        //Does: Swaps the bar heights of the div tags at the firstVal and secondVal 
        //      indices 
        barSwap(firstVal, secondVal, bars, i) {
                this.timeoutAnimation.push(setTimeout( () => {
                        let temp = bars[firstVal].style.height;
                        bars[firstVal].style.height = bars[secondVal].style.height;
                        bars[secondVal].style.height = temp;
                }, i*(MAX_SPEED-this.state.sortingSpeed)));
        }

        //colorSwap fucntion
        //Parameters: firstIndex - first index being swapped 
        //            secondIndex - second index being swapped
        //            instruction - 'direction' of change (change/revert)
        //            bars - array of div tags corresponding to each array value
        //            i - the current index in the main for loop
        //Returns: Nothing
        //Does: Changes/Reverts the color of the bars located at firstIndex and 
        //      secondIndex to indicate to the user that those bars are being
        //      currently checked
        colorSwap(firstIndex, secondIndex, instruction, bars, i) {
                const checkColor = `rgba(${ this.state.swapColor.r }, 
                        ${ this.state.swapColor.g }, 
                        ${ this.state.swapColor.b }, 
                        ${ this.state.swapColor.a })`
                const barColor = `rgba(${ this.props.barColor.r }, 
                        ${ this.props.barColor.g }, 
                        ${ this.props.barColor.b }, 
                        ${ this.props.barColor.a })`
                let firstBar = bars[firstIndex].style;
                let secondBar = bars[secondIndex].style;
                let changeColor = instruction === 'change' ? checkColor : barColor;
                this.timeoutAnimation.push(setTimeout( () => {
                        firstBar.backgroundColor = changeColor;
                        secondBar.backgroundColor = changeColor;
                }, i*(MAX_SPEED-this.state.sortingSpeed)));
        }

        //changeBarColor function
        //Parameters: Nothing
        //Returns: Nothing
        //Does: changes the color of each bar, calls method 
        //      contained in the parent component
        changeBarColor() {
                this.props.changeColor();
        }

        //changeSortingSpeed function
        //Parameters: speed - new sorting speed entered by the user
        //Returns: Nothing
        //Does: Updates the speed the sorting animations execute 
        changeSortingSpeed(speed) {
                this.setState({sortingSpeed: speed})
        }

        //changeSwapColor function
        //Parameters: r,g,b,a - RGBA values of a color
        //Returns: Nothing
        //Does: Updates the secondary color of the animation
        changeSwapColor(r,g,b,a) {
                this.setState({swapColor: {
                                r: r, g: g, b: b, a: a}})
        }
        
        render() {
                return (
                        <div className="sortingButtonsBar">
                                {/* Buttons for each sorting algorithm as well as 
                                    a button to reset the array bars */}
                                <button 
                                        className='sortingButtons'
                                        onClick={() => {
                                                this.props.reset()
                                                this.resetArray()
                                        }}
                                        >Create New Array 
                                </button>
                                <button 
                                        className='sortingButtons'
                                        onClick={() => this.bubbleSort(this.props.stateArray)} 
                                        disabled={this.state.disabled}>Bubble Sort
                                </button>
                                <button 
                                        className='sortingButtons'
                                        onClick={() => this.mergeSort(this.props.stateArray)}
                                        disabled={this.state.disabled}>Merge Sort
                                </button>
                                <button 
                                        className='sortingButtons'
                                        onClick={() => this.insertionSort(this.props.stateArray)}
                                        disabled={this.state.disabled}>Insertion Sort
                                </button>
                                <button 
                                        className='sortingButtons'
                                        onClick={() => this.heapSort(this.props.stateArray)}
                                        disabled={this.state.disabled}>Heap Sort
                                </button>
                                <button 
                                        className='sortingButtons'
                                        onClick={() => this.selectionSort(this.props.stateArray)}
                                        disabled={this.state.disabled}>Selection Sort
                                </button>
                                {/* Slider component that allows the user to select the speed of 
                                    the sorting algorithms */}
                                <Slider 
                                        className='sortingButtons'
                                        changeSpeedValue={this.changeSortingSpeed}
                                        value={this.state.sortingSpeed}
                                        sliderDisabled={this.state.sliderDisabled}/>
                                {/* ColorPick component that allows the user to chose the color 
                                    of the bars as well as the color used when swapping */}
                                <div className="changeColorButtons">
                                        <ColorPick 
                                                className="colorBars"
                                                barColor={this.props.barColor}
                                                changeColor={this.props.changeColor}
                                                buttonText={"Change Primary Color"}
                                                colorPickDisabled={this.state.colorPickDisabled}/>
                                        <ColorPick 
                                                className="colorBars"
                                                barColor={this.state.swapColor}
                                                changeColor={this.changeSwapColor}
                                                buttonText={"Change Secondary Color"}
                                                colorPickDisabled={this.state.colorPickDisabled}/>
                                </div>
                        </div>
                )
        }
}