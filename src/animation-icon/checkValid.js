import React from 'react'
import lottie from 'lottie-web'

import * as animationData from '../../imgs/checkValid.json'

const UNKNOWN = -1
const VALID = 0
const INVALID = 1

export default class CheckValid extends React.Component {
    state = {
        lv: UNKNOWN
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
        if(this.state.lv == UNKNOWN) this.anim.playSegments([0, 50], true)
        else if(this.state.lv == VALID) this.anim.playSegments([50, 75], true)
        else this.anim.playSegments([75, 110], true)
        this.setState({lv: (this.state.lv == 1? -1: this.state.lv + 1)})
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