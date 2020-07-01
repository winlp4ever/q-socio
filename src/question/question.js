import React, {useState, useRef, useEffect} from 'react'

import './_question.scss'

import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import MenuButton from '../animation-icon/menu'
import EditMode from '../animation-icon/editMode'
import QuestionEdit from './question-edit'
import Answer from './answer'
import {postForData} from '../utils'

import Button from '@material-ui/core/Button'
import {Flag, Loader, MessageSquare} from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import MdRender from '../markdown-render/markdown-render'
import OutsideClickHandler from 'react-outside-click-handler';

const UNKNOWN = -1
const VALID = 0
const INVALID = 1

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

const Question = (props) => {
    const [q, setQ] = useState()

    const [valid, setValid] = useState(UNKNOWN)
    const [openMenu, setOpenMenu] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [viewResponses, setViewResponses] = useState(false)

    const menuButton = useRef(null)

    const fetchData = async () => {
        let data = await postForData('/post-question', {
            qid: props.qid
        })
        if (data.status == 0) {
            setQ(data.question)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleMenu = () => setOpenMenu(!openMenu)

    const toggleValid = () => {
        if (valid == INVALID) setValid(UNKNOWN)
        else setValid(valid+1)
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
        setViewResponses(!viewResponses)
    }
    if (q == null) return null
    return <div className='question-container'>
        <div className={'question' + (valid == INVALID ? ' invalid': '') + (viewResponses ? ' view-responses': '')}>
            <div className='info-and-settings'>
                
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
                    <CheckValid className='animated-icon' handleClick={toggleValid}/>
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
            <div className='answers-container'>
                <Answer />
            </div>
        </ CSSTransition>
    </div>
}

export default Question