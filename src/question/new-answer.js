import React, {useState, useEffect, useRef} from 'react'

import {postForData} from '../utils'

import './_new-answer.scss'

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

const NewAnswer = (props) => {
    const [newA, setNewA] = useState('')
    const textfield = useRef()

    const handleChange = (e) => {
        setNewA(e.target.value)
        console.log(e.target.value)
    }

    const sendAnswer = async () => {
        let data = await postForData('/send-answer', {
            qid: props.qid,
            newAnswer: newA,
            userid: '-1'
        })
        console.log(data)
        if (data.status == 0) {
            setNewA('')
            textfield.current.value = ''
            if (props.refresh) setTimeout(() => props.refresh(), 2000)
        }
    }

    const handleKeyDown = async (e) => {
        let keyCode = e.keyCode || e.which
        if (keyCode === 13) {
            console.log('enter')
            e.preventDefault()
            await sendAnswer()
        }
    }

    return <div className='new-answer'>
        <TextareaAutosize
            ref={textfield}
            placeholder={'Write your answer here'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    </div>
}

export default NewAnswer