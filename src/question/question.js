import React, {useState, useRef} from 'react'

import './_question.scss'

import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import MenuButton from '../animation-icon/menu'
import EditMode from '../animation-icon/editMode'
import QuestionEdit from './questionEdit'

import Button from '@material-ui/core/Button'
import {Flag, Loader} from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import MdRender from '../markdown-render/markdown-render'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import OutsideClickHandler from 'react-outside-click-handler';

const UNKNOWN = -1
const VALID = 0
const INVALID = 1

const CondCheck = (props) => {
    const [checked, setChecked] = useState(false)

    const handleClick = () => {
        setChecked(!checked)
    }


    return <Button 
        className={'cond-check' + (checked ? ' checked': '')}
        onClick={handleClick}
        startIcon={(props.icon ? <props.icon />: null)}    
    >
        {props.text}
    </Button>
}

const Question = (props) => {
    const [valid, setValid] = useState(UNKNOWN)
    const [openMenu, setOpenMenu] = useState(false)
    const [editMode, setEditMode] = useState(false)

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

    return <div className={'question' + (valid == INVALID ? ' invalid': '')}>
        <div className='info-and-settings'>
            <div className='likee-bar'>
                <CheckValid className='animated-icon' handleClick={toggleValid}/>
                <Likee className='animated-icon likee'/>
            </div>
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
            <CondCheck text='Off Topic' icon={Flag}/>
            <CondCheck text='Is Fuzzy' icon={Loader}/>
        </div>
    </div>
}

export default Question