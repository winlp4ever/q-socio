import React, { useState } from 'react'
import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'

import {CSSTransition} from 'react-transition-group'

import './_answer.scss'

const Answer = (props) => {
    return <div className='answer-container'>
        <div className='info-and-settings'>    
            <span className='date'>2020-06-17</span>
        </div>
        <div className='answer'>
            <div className='text'>
            Yay, this is the response
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