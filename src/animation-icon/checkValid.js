import React from 'react'
import lottie from 'lottie-web'

import * as animationData from '../../imgs/check.json'

const UNKNOWN = 0
const VALID = 1

export default class CheckValid extends React.Component {
    componentDidMount() {
        this.anim = lottie.loadAnimation({
            container: this.animBox, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData, // the path to the animation json
        });
        this.anim.setSpeed(2);
        
        if (this.props.valid == 1) this.anim.play()
    }

    componentWillUnmount() {
        this.anim.destroy();
    }

    handleClick = () => {
        this.anim.setDirection(this.props.valid? -1: 1)
        this.anim.play()
        if (this.props.handleClick) this.props.handleClick()
    }
    
    render() {
        return <div
            ref={animBox => {this.animBox = animBox}} 
            onClick={this.handleClick} 
            className={this.props.className}
        />
    }
}