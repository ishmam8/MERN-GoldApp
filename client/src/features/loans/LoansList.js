import { useGetLoansQuery } from "./loansApiSlice"
import Loan from './Loan'

const LoansList = () => {
    console.log("UsegetQueyr(")
    const {
        data: loans,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetLoansQuery()
    console.log(useGetLoansQuery())
    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = loans
        // console.log(ids)
        const tableContent = ids?.length
            ? ids.map(loanId => <Loan key={loanId} loanId={loanId} />)
            : null
        console.log('table content',tableContent)
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