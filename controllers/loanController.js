const User = require('../models/User')
const Loan = require('../models/Mortgage')
const asyncHandler = require('express-async-handler')

// @desc Get mortgage info of all users
// @route GET /loans
// @access Private
const getAllLoans = asyncHandler(async (req, res) => {
    const loans = await Loan.find().lean()
    if(!loans?.length){
        return res.status(400).json({ message: 'No loans found'})
    }
    res.json(loans)
})

// @desc Get mortgage info of user id
// @route GET /loan/:id
// @access Private
const getLoan = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    //might need to assign user with id
    const loan = await Loan.findOne({"user":id}).exec()

    if(!loan) {
        return res.status(400).json({ message: `Loan for user ${id} not found`})
    }
    res.json(loan)
})

//@desc Create new loan for user id
// @route POST /mortgages/:id
// @access Private
const createNewLoan = asyncHandler(async (req, res) => {
    
    const {user, loanreq, loanperiod, loanpaid, goldtotal } = req.body
    const id = user
    //Confirm data
    if (!user || !loanreq || !loanperiod || !loanpaid || !goldtotal) {
        return res.status(400).json({ message: 'All fields are into required'})
    }
    //const user = id 
    const loanObject = {"user": id, loanreq, loanperiod, loanpaid, goldtotal}

    // Create and store new loan uder the id
    const loan = await Loan.create(loanObject)

    if (loan) { //created
        res.status(201).json({ message:`New load ${loan} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received '})
    }

})

// @desc Update loan pay
// @route PATCH /mortages/:id
// @access Private
const updateLoanPay = asyncHandler(async (req, res) => {
    const { id, loanpaid } = req.body

    //Confirm data
    if (!id || !loanpaid ) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const loan = await Loan.findById(id).exec()

    if(!loan) {
        return res.status(400).json({ message: 'User not found' })
    }

    loan.loanpaid = loanpaid

    const updatedLoanPaid = await loan.save()

    res.json({ message : `${updatedLoanPaid.loanpaid} updated`})

})

// @desc Delete a mortgage
// @route DELETE /mortgages/:id
// @access Private 
const deleteLoan = asyncHandler(async (req,res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'Loan ID Required'})
    }

    // const loans = await Loan.findOne({ user: id}).lean().exec()
    // if (loans) {
    //     return res.status(400).json({ message: 'User has assigned mortage'})
    // }

    const loan = await Loan.findOne({user: id}).exec()

    if(!loan) {
        return res.status(400).json({ message: 'Loan not found '})
    }

    const result = await loan.deleteOne()

    const reply = `Loan with ID ${result._id} deleted`
    
    res.json(reply) 
})

module.exports = {
    getAllLoans,
    getLoan,
    createNewLoan,
    updateLoanPay,
    deleteLoan
}