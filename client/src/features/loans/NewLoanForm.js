import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewLoanMutation } from "./loansApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewLoanForm = ({ users }) => {

    const [addNewLoan, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewLoanMutation()

    const navigate = useNavigate()

    const [loanreq, setLoanReq] = useState('')
    const [loanperiod, setLoanPeriod] = useState('')
    const [loanpaid, setLoanPaid] = useState('')
    const [goldtotal, setGoldTotal] = useState('')
    console.log(users)
    const [userId, setUserId] = useState('')
    console.log(userId)

    useEffect(() => {
        if (isSuccess) {
            setLoanReq('')
            setLoanPeriod('')
            setLoanPaid('')
            setGoldTotal('')
            setUserId('')
            navigate('/dash/loans')
        }
    }, [isSuccess, navigate])

    const onLoanReqChanged = e => setLoanReq(e.target.value)
    const onLoanPeriodChanged = e => setLoanPeriod(e.target.value)
    const onLoanPaidChanged = e => setLoanPaid(e.target.value)
    const onGoldTotalChanged = e => setGoldTotal(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [loanreq, loanperiod, loanpaid, goldtotal, userId].every(Boolean) && !isLoading

    const onSaveLoanClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewLoan({ user: userId, loanreq, loanperiod, loanpaid, goldtotal })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validLoanClass = !loanreq ? "form__input--incomplete" : ''
    const validPeriodClass = !loanperiod ? "form__input--incomplete" : ''
    const validPaidClass = !loanpaid ? "form__input--incomplete" : ''
    const validGoldClass = !goldtotal ? "form__input--incomplete" : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveLoanClicked}>
                <div className="form__title-row">
                    <h2>New Loan</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validLoanClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={loanreq}
                    onChange={onLoanReqChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validPeriodClass}`}
                    id="text"
                    name="text"
                    value={loanperiod}
                    onChange={onLoanPeriodChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validPaidClass}`}
                    id="text"
                    name="text"
                    value={loanpaid}
                    onChange={onLoanPaidChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validGoldClass}`}
                    id="text"
                    name="text"
                    value={goldtotal}
                    onChange={onGoldTotalChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewLoanForm