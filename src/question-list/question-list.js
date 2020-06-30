import React, {useState, useRef, useEffect} from 'react'
import Question from '../question/question'
import RefreshLoader from '../animation-icon/refresh-loader'
import './_question-list.scss'

import InfiniteScroll from 'react-infinite-scroll-component';

const QuestionList = (props) => {
    const [loading, setLoading] = useState(false)
    const [qs, setQs] = useState([...Array(12).keys()])
    const fetchData = async () => {
        console.log('fetching data...')
        setQs([...qs, 1])
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
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <h4>End.</h4>
            }
        >
            <RefreshLoader />
            {qs.map((_, i) => <Question key={i}/>)}
        </InfiniteScroll>
        
    </div>
}

export default QuestionList