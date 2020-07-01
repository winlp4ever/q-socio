import React, { useState, useEffect } from 'react'
import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import {postForData} from '../utils'

import {CSSTransition} from 'react-transition-group'

import './_answer.scss'

const Answer = (props) => {
    const [a, setA] = useState()

    const fetchData = async () => {
        let data = await postForData('/post-answer', {
            aid: props.aid
        })
        console.log(data)
        if (data.status == 0) {
            setA(data.answer)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (a == null) return null

    return <div className='answer-container'>
        <div className='info-and-settings'>    
            <span className='date'>{a.date.substr(0, 10)}</span>
        </div>
        <div className='answer'>
            <div className='text'>
                {a.text}
            </div>
        </div>
        <div className='iconbar'>
            <div className='likee-bar'>
                <CheckValid className='animated-icon'/>
                <Likee className='animated-icon likee'/>
            </div>
        </div>
    </div>
}
export default Answer