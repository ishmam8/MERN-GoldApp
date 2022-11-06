const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loanController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(loanController.getAllLoans)
    .get(loanController.getLoan)
    .post(loanController.createNewLoan)
    .patch(loanController.updateLoanPay)
    .delete(loanController.deleteLoan)

module.exports = router