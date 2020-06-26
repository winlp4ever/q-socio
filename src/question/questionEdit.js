import React, { Component, useState } from 'react'
import { Button, TextareaAutosize } from '@material-ui/core'
import AnimatedButton from '../animation-icon/animated-button'
import * as SaveIcon from '../../imgs/save.json'
import * as CancelIcon from '../../imgs/cancel.json'

const QuestionEdit = (props) => {
    const [newQ, setNewQ] = useState(props.q) 

    const handleChange = (e) => {
        setNewQ(e.target.value)
        if (props.handleChange) props.handleChange()
    }

    const handleSave = () => {
        if (props.handleSave) props.handleSave(newQ)
    }

    const handleCancel = () => {
        if (props.handleCancel) props.handleCancel(newQ)
    }

    return <div className='edit-text'>
        <div className='edit-toolbar'>
            <AnimatedButton text="Save" handleClick={handleSave} anim={SaveIcon}/>
            <AnimatedButton text="Save" handleClick={handleCancel} anim={CancelIcon}/>
        </div>
        <TextareaAutosize 
            defaultValue={props.q}
            onChange={handleChange}
        />  
    </div>
}

export default QuestionEdit