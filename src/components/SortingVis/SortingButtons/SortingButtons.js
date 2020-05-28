import React from 'react'
import { bubbleSortAnimations, 
        insertionSortAnimations,
        heapSortAnimations,
        mergeSortAnimations,
        selectionSortAnimations } from './SortingAlgorithms'

import Slider from './Slider/Slider'
import './SortingButtons.css'

const MAX_SPEED = 12
const CHECK_COLOR = 'red'
const BAR_COLOR = 'pink'

export default class SortingButtons extends React.Component {

        constructor() {
                super()

                this.animation = []
                this.timeoutAnimation = [];

                this.state = {
                        disabled: false,
                        sortingSpeed: 6,
                        sliderDisabled: false
                }
                this.heapSort = this.heapSort.bind(this)
                this.changeSortingSpeed = this.changeSortingSpeed.bind(this)
        }

        bubbleSort(array) {
                this.animation = bubbleSortAnimations(array)
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        heapSort(array) {
                this.animation = heapSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        insertionSort(array) {
                this.animation = insertionSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        selectionSort(array) {
                this.animation = selectionSortAnimations(array);
                let bars = document.getElementsByClassName('singleBar')
                this.animationSwap(this.animation, bars)
        }

        mergeSort(array) {
                this.setState({disabled: true})
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

        resetArray() {
                this.animation = []
                let bars = document.getElementsByClassName('singleBar')
                for (let i = 0; i < bars.length; i++) {
                        bars[i].style.backgroundColor = 'pink'
                }
                for (let i = 0; i < this.timeoutAnimation.length; i++) {
                        clearTimeout(this.timeoutAnimation[i])
                }
                this.setState({disabled: false})
                this.setState({sliderDisabled: false})
        }

        animationSwap(array, bars) {
                this.setState({disabled: true})
                this.setState({sliderDisabled: true})
                for (let i = 0; i < array.length; i++) {
                        let [firstIndex, secondIndex, typeChange, instruction] = array[i];
                        this.typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i);
                }
        }

        barSwap(firstVal, secondVal, bars, i) {
                this.timeoutAnimation.push(setTimeout( () => {
                        let temp = bars[firstVal].style.height;
                        bars[firstVal].style.height = bars[secondVal].style.height;
                        bars[secondVal].style.height = temp;
                }, i*(MAX_SPEED-this.state.sortingSpeed)));
        }

        colorSwap(firstIndex, secondIndex, instruction, bars, i) {
                let firstBar = bars[firstIndex].style;
                let secondBar = bars[secondIndex].style;
                let changeColor = instruction === 'change' ? CHECK_COLOR : BAR_COLOR;
                this.timeoutAnimation.push(setTimeout( () => {
                        firstBar.backgroundColor = changeColor;
                        secondBar.backgroundColor = changeColor;
                }, i*(MAX_SPEED-this.state.sortingSpeed)));
        }

        typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i) {
                if (typeChange === 'color') {
                        this.colorSwap(firstIndex, secondIndex, instruction, bars, i);
                } else {
                        this.barSwap(firstIndex, secondIndex, bars, i);
                } 
        }

        changeSortingSpeed(speed) {
                this.setState({sortingSpeed: speed})
        }

        render() {
                console.log(this.state.sliderDisabled)
                return (
                        <div className="sortingButtonsBar">
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
                                <Slider 
                                        className='sortingButtons'
                                        changeSpeedValue={this.changeSortingSpeed}
                                        value={this.state.sortingSpeed}
                                        sliderDisabled={this.state.sliderDisabled}/>
                        </div>
                )
        }
}