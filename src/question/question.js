import React, {useState, useRef} from 'react'

import './_question.scss'

import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import MenuButton from '../animation-icon/menu'
import EditMode from '../animation-icon/editMode'
import QuestionEdit from './question-edit'
import Answer from './answer'

import Button from '@material-ui/core/Button'
import {Flag, Loader, MessageSquare} from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import MdRender from '../markdown-render/markdown-render'
//import TextareaAutosize from '@material-ui/core/TextareaAutosize'
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
    const [valid, setValid] = useState(UNKNOWN)
    const [openMenu, setOpenMenu] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [viewResponses, setViewResponses] = useState(false)

    const menuButton = useRef(null)

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

    return <div className='question-container'>
        <div className={'question' + (valid == INVALID ? ' invalid': '') + (viewResponses ? ' view-responses': '')}>
            <div className='info-and-settings'>
                
                <span className='date'>2020-06-17</span>
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
                            editMode ? <QuestionEdit q={'Hello world\n__whatelse__'}
                            />
                            : <MdRender source={'Hello world\n__whatelse__'} />
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
        {viewResponses && <div className='answers-container'>
            <Answer />
        </div>}
    </div>
}

export default Question