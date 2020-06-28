import React, {useState, useRef, useEffect} from 'react'
import {findDOMNode} from 'react-dom'
import $ from 'jquery'
import * as animationData from '../../imgs/loading.json'
import lottie from 'lottie-web'


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

function sigmoid(x) {
    let ex = Math.exp(-x)
    return (1 - ex) / (1 + ex)
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
                
                let sp = sigmoid(Math.max(0, e.pageY-h)) * MAX_HEIGHT
                $(findDOMNode(lder.current)).css('height', sp)
                if (sp > MAX_HEIGHT - 1e-6) {
                    setRefresh(true)
                    isRefreshing = true
                    clearTimeout(timeout)
                    if (props.refresh) this.props.refresh()
                    timeout = setTimeout(() => {
                        setRefresh(false)
                        isRefreshing = false
                        $(findDOMNode(lder.current)).css('height', 0)
                    }, 1000)
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
            $(window).off('*')
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
