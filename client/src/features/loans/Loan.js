import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectLoanById } from './loansApiSlice'

const Loan = ({ loanId }) => {
    const loan = useSelector(state => selectLoanById(state, loanId))
    console.log("Individual loan",loan)

    const navigate = useNavigate()

    if (loan) {
        const handleEdit = () => navigate(`/dash/loans/${loanId}`)


        return (
            <tr className="table__row loan">
                <td className={`table__cell`}>{loan.user}</td>
                <td className={`table__cell`}>{loan.loanreq}</td>
                <td className={`table__cell`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Loan