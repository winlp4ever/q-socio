import React from 'react'
import lottie from 'lottie-web'

import * as animationData from '../../imgs/menu.json'

export default class MenuButton extends React.Component {
    state = {
        open: false
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
        
        if (this.state.open) this.anim.playSegments([70, 140], true)
        else this.anim.playSegments([0, 70], true)
        this.setState({open: !this.state.open})
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