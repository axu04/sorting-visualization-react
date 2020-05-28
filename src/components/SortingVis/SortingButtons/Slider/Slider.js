//Slider.js

import React from 'react'
import './Slider.css'

export default class Slider extends React.Component {

        render() { 
                return <div className="slider-outer">
                                <h2>Sorting Speed
                                        {/* range input component that allows the user
                                            to select the speed of the visulization */}
                                        <input 
                                                onChange={event => {
                                                        this.props.changeSpeedValue(event.target.value)
                                                }}
                                                type='range'
                                                className='slider'
                                                min='1'
                                                max='11'
                                                value={this.props.value}
                                                disabled={this.props.sliderDisabled}>
                                        </input>
                                </h2>      
                        </div>
        }
}