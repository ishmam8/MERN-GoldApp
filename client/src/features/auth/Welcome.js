import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'


const Welcome = () => {

    const { username, isAdmin } = useAuth()
  
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full',
    timeStyle: 'long'}).format(date)

    const content = (
        <section className='welcome'>

            <p>{today}</p>

            <h1>Welcome</h1>

            {(isAdmin) && <p><Link to="/dash/loans">View Loans</Link></p>}

            {(isAdmin) && <p><Link to="/dash/users">View Users Settings</Link></p>}
            {(isAdmin) && <p><Link to="/dash/users/new">Create New User</Link></p>}

        </section>

    )
  
    return content
}

export default Welcome