import React, {useState, useRef, useEffect} from 'react'
import {findDOMNode} from 'react-dom'
import $ from 'jquery'
import * as animationData from '../../imgs/rocket-launch.json'
import lottie from 'lottie-web'

import './_refresh-loader.scss'

class LoadingIcon extends React.Component {
    componentDidMount() {
        this.anim = lottie.loadAnimation({
            container: this.animBox, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData, // the path to the animation json
        });
        this.anim.setSpeed(2);
    }

    componentWillUnmount() {
        this.anim.destroy();
    }
    
    render() {
        return <div className='refresh-icon'
            ref={animBox => {this.animBox = animBox}} 
        />
    }
}

const MAX_HEIGHT = 100
const SQRT = 10

function sigmoid(x) {
    let ex = Math.exp(-4*x)
    return (1 - ex) / (1 + ex)
}

function dem(x) {
    return MAX_HEIGHT * x / (x + SQRT)
}

const RefreshLoader = (props) => {
    const [refresh, setRefresh] = useState(false)
    const lder = useRef(null)

    useEffect(() => {   
        var h = 0
        var isClicking = false
        var isRefreshing = false
        var timeout = null
        $(window).on({
            mousedown: (e) => {
                e.preventDefault()
                isClicking = true
                h = e.pageY
            },
            mouseup: () => {
                isClicking = false
            },
            mousemove: (e) => {
                if (!isClicking) return
                if (isRefreshing) return
                
                let sp = dem(Math.max(0, e.pageY-h))
                $(findDOMNode(lder.current)).css('height', sp)
                if (sp > dem(250)) {
                    setRefresh(true)
                    isRefreshing = true
                    clearTimeout(timeout)
                    if (props.refresh) props.refresh()
                    timeout = setTimeout(() => {
                        setRefresh(false)
                        isRefreshing = false
                        $(findDOMNode(lder.current)).css('height', 0)
                    }, 1500)
                }
                else {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        $(findDOMNode(lder.current)).css('height', 0)
                    }, 200)
                }
                
            }
        })
        return () => {
            $(window).off()
            clearTimeout(timeout)
        }
    }, [])

    return <div 
        className={'refresh-loader' + (refresh ? ' is-refreshing': '')} 
        ref={lder}
    >
        {refresh && <LoadingIcon />}
    </div>
}

export default RefreshLoader
