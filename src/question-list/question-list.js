import React, {useState, useRef, useEffect} from 'react'
import {findDOMNode} from 'react-dom'
import Question from '../question/question'
import $ from 'jquery'
import {CSSTransition} from 'react-transition-group'
import * as animationData from '../../imgs/loading.json'
import lottie from 'lottie-web'

import './_question-list.scss'

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

const RefreshLoader = (props) => {
    const [refresh, setRefresh] = useState(false)
    const lder = useRef(null)
    const timeInterval = useRef(null)
    useEffect(() => {   
        var h = 0
        
        $(window).on('scroll', () => {
            var st = $(window).scrollTop()
            h += 2
            if (st == 0) {
                //h += 100
                $(findDOMNode(lder.current)).css('height', Math.min(MAX_HEIGHT, h))
                if (h > MAX_HEIGHT) {
                    setRefresh(true)
                    setTimeout(() => {
                        setRefresh(false)
                        if (props.refreshContent) props.refreshContent()
                        $(findDOMNode(lder.current)).css('height', 0)
                        h = 0
                    }, 1000)
                } 
                else {
                    clearInterval(timeInterval.current)
                    var lv = 0
                    timeInterval.current = setInterval(() => {
                        h = Math.max(h-Math.pow(1.5, lv++), 0)
                        if (h == 0)
                        $(findDOMNode(lder.current)).css('height', h)
                    }, 100)
                }
                
            }
        })
        var ter = setInterval(() => {
            if (h == 0) clearInterval(timeInterval.current)
        }, 100)
        return () => {
            $(window).off('scroll')
            clearInterval(ter)
            clearInterval(timeInterval.current)
        }
    })

    return <div 
        className={'refresh-loader' + (refresh ? ' is-refreshing': '')} 
        ref={lder}
    >
        {refresh && <LoadingIcon />}
    </div>
}

const QuestionList = (props) => {    
    return <div className='question-list'>
        <RefreshLoader />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
    </div>
}

export default QuestionList