import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewLoanForm from './NewLoanForm'

const NewLoan = () => {
    const users = useSelector(selectAllUsers)
    console.log("From newloan",users)

    const content = users ? <NewLoanForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewLoan