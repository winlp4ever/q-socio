import React, {useState, useRef, useEffect} from 'react'
import Question from '../question/question'
import RefreshLoader from '../animation-icon/refresh-loader'
import './_question-list.scss'
import {postForData} from '../utils'

import InfiniteScroll from 'react-infinite-scroll-component';

const QuestionList = (props) => {
    const [loading, setLoading] = useState(false)
    const [qs, setQs] = useState([])
    const [startID, setStartID] = useState(0)
    const [reachTheEnd, setReachTheEnd] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const resync = async () => {
        let data = await postForData('/post-questions', {
            startID: 0,
            limit: qs.length + 10
        })
        if (data.status == 0) {
            setQs(data.questions)
            if (data.questions.length > 0)
                setStartID(data.questions[0].id)
            //if (data.questions.length - qs.length == 0) setReachTheEnd(true)
        }
    }

    const fetchData = async () => {
        let data = await postForData('/post-questions', {
            startID: startID,
            limit: 10 + qs.length
        })
        console.log(data)
        if (data.status == 0) {
            setQs(data.questions)
            if (data.questions.length > 0)
                setStartID(data.questions[0].id)
            //if (data.questions.length - qs.length == 0) setReachTheEnd(true)
        }
    }
    
    const loadMore = async () => {
        if (loading) return 
        setLoading(true)
        await fetchData()
        setLoading(false)
    }

    return <div className='question-list'>
        <InfiniteScroll
            dataLength={qs.length}
            next={loadMore}
            hasMore={!reachTheEnd}
            loader={<h4>Loading...</h4>}
            endMessage={
                <h4>End.</h4>
            }
        >
            <RefreshLoader refresh={resync}/>
            {qs.map(q => <Question key={q.id} qid={q.id}/>)}
        </InfiniteScroll>
        
    </div>
}

export default QuestionList