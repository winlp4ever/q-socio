import React, {useState, useRef, useEffect} from 'react'

import './_question.scss'

import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import MenuButton from '../animation-icon/menu'
import EditMode from '../animation-icon/editMode'
import QuestionEdit from './question-edit'
import Answer from './answer'
import NewAnswer from './new-answer'
import {postForData} from '../utils'
import AnimatedButton from '../animation-icon/animated-button'
import RefreshWaitIcon from '../../imgs/refresh-wait.json'

import Button from '@material-ui/core/Button'
import {Flag, Loader, MessageSquare} from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import MdRender from '../markdown-render/markdown-render'
import OutsideClickHandler from 'react-outside-click-handler';

const UNKNOWN = 0
const VALID = 1

const status = {
    opened: '#fdd835',
    answered: '#00c853'
}

const ViewResponses = (props) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
        if (props.handleClick) props.handleClick()
    }
    return <Button 
        className={'view-responses' + (clicked ? ' clicked': '')}
        onClick={handleClick}
    >
        <MessageSquare />
    </Button>
}

const CondCheck = (props) => {
    const [checked, setChecked] = useState(false)

    const handleClick = () => {
        setChecked(!checked)
    }


    return <Button 
        className={'cond-check' + (checked ? ' checked': '')}
        onClick={handleClick}
    >
        <props.icon />
    </Button>
}

const AnswersContainer = (props) => {
    const [as, setAs] = useState([])

    const fetchData = async () => {
        let data = await postForData('/post-answers', {
            qid: props.qid
        })
        if (data.status == 0) {
            setAs(data.answers)
            if (props.refresh) props.refresh()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <div className='answers-container'>
        <AnimatedButton anim={RefreshWaitIcon} text={'refresh'} className='refresh-answers' handleClick={props.refresh}/>
        <NewAnswer qid={props.qid} refresh={fetchData} />
        {as.map(a => <Answer aid={a.id} key={a.id}/>)}
    </div>
}

const Question = (props) => {
    const [loaded, setLoaded] = useState(false)
    const [q, setQ] = useState()

    const [valid, setValid] = useState(UNKNOWN)
    const [openMenu, setOpenMenu] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [viewResponses, setViewResponses] = useState(false)

    const [notif, setNotif] = useState('')
    const [viewNotif, setViewNotif] = useState(false)

    const menuButton = useRef(null)

    const fetchData = async () => {
        let data = await postForData('/post-question', {
            qid: props.qid
        })        
        if (data.status == 0) {
            setQ(data.question)
            setValid(data.question.valid)
            setLoaded(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleMenu = () => setOpenMenu(!openMenu)

    const toggleValid = async () => {
        let data = await postForData('/valid-invalid-question', {
            qid: props.qid,
            value: 1-valid
        })
        if (data.status == 0) {
            setValid(1-valid)
            if (valid) setViewResponses(false)
        }
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const deactMenu = () => {
        if (openMenu) {
            menuButton.current.handleClick()
        }
    }

    const toggleViewResponses = () => {
        if (!valid) {
            setNotif('cannot show answers of invalid question')
            setViewNotif(true)
            setTimeout(() => setViewNotif(false), 1000)
        } else
            setViewResponses(!viewResponses)
    }
    if (!loaded) return null
    return <div className='question-container'>
        <CSSTransition
            in={viewNotif}
            timeout={200}
            classNames="question-notif"
            unmountOnExit
        >
            <div className='question-notif'>
                {notif}
            </div>
        </CSSTransition>
        
        <div className={'question' + (viewResponses ? ' view-responses': '')}>
            <div className='info-and-settings'>
                <span className='status' style={{
                    background: status[q.status]
                }}>
                    {q.status}
                </span>
                <span className='date'>{q.date.substr(0, 10)}</span>
                <OutsideClickHandler
                    onOutsideClick={deactMenu}
                >
                    <div className='settings'>
                        <MenuButton 
                            className='menu-button' 
                            handleClick={toggleMenu}
                            ref={menuButton}
                        />
                        <CSSTransition
                            in={openMenu}
                            timeout={200}
                            classNames="question-menu"
                            unmountOnExit
                        >
                            <div className='question-menu'>
                                <EditMode handleClick={toggleEditMode}/>
                            </div>
                        </CSSTransition>
                    </div>
                </OutsideClickHandler>
            </div>
            <div className='content'>
                <div className='q'>
                    <div className='text'>
                        {
                            editMode ? <QuestionEdit q={q.text}
                            />
                            : <MdRender source={q.text} />
                        }
                    </div>
                </div>
            </div>

            <div className='iconbar'>
                <div className='likee-bar'>
                    <CheckValid className='animated-icon' handleClick={toggleValid} valid={valid}/>
                    <Likee className='animated-icon likee'/>
                </div>
                <div className='tag-icons'>
                    <CondCheck text='Off Topic' icon={Flag}/>
                    <CondCheck text='Is Fuzzy' icon={Loader}/>
                    <ViewResponses handleClick={toggleViewResponses}/>
                </div>
            </div>
            
        </div>
        <CSSTransition
            in={viewResponses}
            timeout={250}
            classNames="answers-container"
            unmountOnExit
        >
            <AnswersContainer qid={props.qid} refresh={fetchData}/>
        </ CSSTransition>
    </div>
}

export default Question