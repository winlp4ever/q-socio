import React from 'react'
import lottie from 'lottie-web'

import * as animationData from '../../imgs/editmode.json'
import Button from '@material-ui/core/Button'

export default class EditModeIcon extends React.Component {
    state = {
        on: false
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
        if (this.state.on) this.anim.playSegments([28, 56], true)
        else this.anim.playSegments([0, 28], true)
        this.setState({on: !this.state.on})
        if (this.props.handleClick) this.props.handleClick()
    }
    
    render() {
        return <Button 
            startIcon={<span
                ref={animBox => {this.animBox = animBox}} 
                className={this.props.className}
            />}
            onClick={this.handleClick} 
        >
            {this.state.on? 'disable edit mode': 'enable edit mode'}
        </Button>
    }
}