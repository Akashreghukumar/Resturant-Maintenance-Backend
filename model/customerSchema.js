const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter the name of the customer"]
    },
    address:{
        type:String,
    },
    mobileNumber:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
)

const Customer = mongoose.model('Customer',customerSchema)

module.exports = Customer 