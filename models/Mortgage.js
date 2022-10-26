const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const mortgageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        loanreq: {
            type: String,
            required: true
        },
        loanperiod: {
            type: String,
            required: true
        },
        loanpaid: {
            type: String,
            required: true
        },
        goldtotal: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

mortgageSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Mortgage', mortgageSchema)