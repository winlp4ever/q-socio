import React from 'react'
import lottie from 'lottie-web'

import Button from '@material-ui/core/Button'

export default class AnimatedButton extends React.Component {
    componentDidMount() {
        this.anim = lottie.loadAnimation({
            container: this.animBox, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: this.props.anim, // the path to the animation json
        });
        this.anim.setSpeed(2);
    }

    componentWillUnmount() {
        this.anim.destroy();
    }

    handleClick = () => {
        this.anim.goToAndPlay(0)
        if (this.props.handleClick) this.props.handleClick()
    }
    
    render() {
        return <Button 
            className={'animated-button ' + (this.props.className? this.props.className: '')}
            startIcon={<span
                ref={animBox => {this.animBox = animBox}} 
            />}
            onClick={this.handleClick} 
        >
            {this.props.text}
        </Button>
    }
}