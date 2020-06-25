import React, {useState} from 'react'
import Question from '../question/question'

const QuestionList = (props) => {
    return <div className='question-list'>
        <Question />
        <Question />
    </div>
}

export default QuestionList