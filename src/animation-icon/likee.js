import React from 'react'
import lottie from 'lottie-web'

import * as animationData from '../../imgs/like.json'


export default class Likee extends React.Component {
    state = {
        like: false
    }
    componentDidMount() {
        this.anim = lottie.loadAnimation({
            container: this.animBox, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData, // the path to the animation json
        });
        this.anim.setSpeed(2);
    }

    componentWillUnmount() {
        this.anim.destroy();
    }

    handleClick = () => {
        this.anim.setDirection(this.state.like? -1: 1);
        this.anim.play()
        this.setState({like: !this.state.like})
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