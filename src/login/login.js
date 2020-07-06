import React, {useState} from 'react'
import {postForData} from '../utils'
import { TextField, Button } from '@material-ui/core'

import './_login.scss'

const Login = (props) => {
    const [pw, setPw] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    const handleChange = (e) => {
        setPw(e.target.value)
    }

    const submit = async () => {
        let data = await postForData('/authenticate', {
            pw: pw
        })
        console.log(data)
        if (data.status == 0) {
            setAuthenticated(true)
            if (props.authenticate) props.authenticate()
        }
    }

    return <div className='login-container'>
        <TextField
            className='login-pw-field'
            placeholder='Enter admin password'
            onChange={handleChange}
        />
        <Button 
            className='login'
            onClick={submit}
        >
            Login
        </Button>
    </div>
}

export default Login