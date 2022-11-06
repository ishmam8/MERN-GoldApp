import { useGetLoansQuery } from "./loansApiSlice"
import Loan from './Loan'
import useAuth from "../../hooks/useAuth"

const LoansList = () => {
    //console.log("UsegetLoanQueyr()")

    const { username, isAdmin } = useAuth()
    const {
        data: loans,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetLoansQuery(
        'loansList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
    })
    console.log(useGetLoansQuery())
    //when different users refresh, update and refetch all the time

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = loans
        
        // console.log(ids)
        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(loanId => <Loan key={loanId} loanId={loanId} />)
        
        // console.log('table content',tableContent)
        //change the table style
        content = (
            <table className="table">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th loan__loanname">userId</th>
                        <th scope="col" className="table__th loan__roles">LoanREQ</th>
                        {/* <th scope="col" className="table__th loan__edit">Period</th>
                        <th scope="col" className="table__th loan__edit">Paid</th>
                        <th scope="col" className="table__th loan__edit">GoldValue</th> */}
                        <th scope="col" className="table__th loan__edit">CreatedAt</th>
                        {/* <th scope="col" className="table__th loan__edit">UpdatedAt</th> */}
                        {/* <th scope="col" className="table__th loan__edit">ticket no.</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default LoansList