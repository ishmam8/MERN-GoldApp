// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectLoanById } from './loansApiSlice'
// import { selectAllUsers } from '../users/usersApiSlice'
// import EditLoanForm from './EditLoanForm'

// const EditLoan = () => {
//     const { id } = useParams()

//     const loan = useSelector(state => selectLoanById(state, id))
//     const users = useSelector(selectAllUsers)

//     const content = loan && users ? <EditLoanForm loan={loan} users={users} /> : <p>Loading...</p>

//     return content
// }
// export default EditLoan