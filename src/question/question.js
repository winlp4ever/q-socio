import React, {useState} from 'react'

import './_question.scss'

import CheckValid from '../animation-icon/checkValid'
import Likee from '../animation-icon/likee'
import MenuButton from '../animation-icon/menu'
import EditMode from '../animation-icon/editMode'

import Button from '@material-ui/core/Button'
import {Flag, Loader} from 'react-feather'
import { CSSTransition } from 'react-transition-group';

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

    const toggleMenu = () => setOpenMenu(!openMenu)

    const toggleValid = () => {
        if (valid == INVALID) setValid(UNKNOWN)
        else setValid(valid+1)
    }

    return <div className={'question' + (valid == INVALID ? ' invalid': '')}>
        <div className='info-and-settings'>
            <div className='likee-bar'>
                <CheckValid className='animated-icon' handleClick={toggleValid}/>
                <Likee className='animated-icon likee'/>
            </div>
            <span className='date'>2020-06-17</span>
            <div className='settings'>
                <MenuButton className='menu-button' handleClick={toggleMenu}/>
                <CSSTransition
                    in={openMenu}
                    timeout={200}
                    classNames="question-menu"
                    unmountOnExit
                >
                    <div className='question-menu'>
                        <EditMode />
                    </div>
                </CSSTransition>
            </div>
        </div>
        <div className='content'>
            <div className='q'>
                <div className='text'>
                    Hello world
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