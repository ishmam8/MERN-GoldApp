import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewLoanForm from './NewLoanForm'

const NewLoan = () => {
    const users = useSelector(selectAllUsers)
    console.log(users)
    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewLoanForm users={users} />

    return content
}
export default NewLoan