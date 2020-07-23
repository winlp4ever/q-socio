import React, {useState} from 'react';

import QuestionList from '../question-list/question-list'
import Login from '../login/login';

const App = (props) => {

    const [authenticated, setAuthenticated] = useState(false)

    const authenticate = () => setAuthenticated(true)

    return <div className='app'>
        {false? <QuestionList />: <Login authenticate={authenticate}/>}
    </div>
}

export default App;