//ColorPick.js

import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import './ColorPick.css'

export default class ColorPick extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        displayColorPicker: false,
                        color: {
                                r: `${this.props.barColor.r}`,
                                g: `${this.props.barColor.g}`,
                                b: `${this.props.barColor.b}`,
                                a: `${this.props.barColor.a}`
                        }
                };
                //bind methods that update the state of the ColorPick component
                this.handleClick = this.handleClick.bind(this)
                this.handleChange = this.handleChange.bind(this)
        }
        
        //handleClick function
        //Parameters: Nothing
        //Returns: Nothing
        //Does: Updates the displayColorPicker value of the component
        handleClick() {
                this.setState({ displayColorPicker: !this.state.displayColorPicker }) 
        };

        //handleClose function
        //Parameters: Nothing
        //Returns: Nothing
        //Does: Updates the displayColorPicker of the component
        handleClose() {
                this.setState({ displayColorPicker: false })
        };

        //handleChange function
        //Parameters: color - the color being selected
        //Returns: Nothing
        //Does: Updates the color stored in the state of the component
        handleChange(color) {
                this.setState({ color: color.rgb })
                
        };

        render() {
                // The styles used when rendering the components
                const styles = reactCSS({
                'default': {
                        color: {
                                width: '36px',
                                height: '14px',
                                borderRadius: '2px',
                                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`
                        },
                        swatch: {
                                padding: '1px',
                                background: '#fff',
                                borderRadius: '1px',
                                display: 'inline-block',
                                cursor: 'pointer',
                        },
                        popover: {
                                position: 'absolute',
                                zIndex: '2',
                        },
                        cover: {
                                position: 'fixed',
                        },
                },
                });

                return (
                        <div>
                                <div style={ styles.swatch } onClick={ this.handleClick }>
                                        <h2 style={{fontSize: '0.6vw'}}>{this.props.buttonText}</h2>
                                <div style={ styles.color } />
                        </div>
                        { this.state.displayColorPicker && !this.props.colorPickDisabled ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.handleClose }/>
                                {/* Render SketchPicker component from react-color */}
                                <ChromePicker color={ this.state.color } onChange={(color) => {
                                                                                        this.handleChange(color) 
                                                                                        this.props.changeColor(`${this.state.color.r}`,
                                                                                                                `${this.state.color.g}`,
                                                                                                                `${this.state.color.b}`,
                                                                                                                `${this.state.color.a}`)
                                                                                }} />
                        </div> : null }
                </div>
                )
        }
        }