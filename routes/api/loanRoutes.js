const express = require('express')
const router = express.Router()
const loanController = require('../../controllers/loanController')

router.route('/')
    .get(loanController.getAllLoans)
    
router.route('/:id')
    .get(loanController.getLoan)
    .post(loanController.createNewLoan)
    .patch(loanController.updateLoanPay)
    .delete(loanController.deleteLoan)

module.exports = router