import { store } from '../../app/store'
import { loansApiSlice } from '../loans/loansApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(loansApiSlice.endpoints.getLoans.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        console.log("Prefetch",users)

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch