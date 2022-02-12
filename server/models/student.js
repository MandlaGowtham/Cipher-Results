import mongoose from 'mongoose';

// const resultSchema = mongoose.Schema({
//     semester: {
//         type: Number,
//         required : true
//     },
//     grades: {
//         type: JSON,
//         result : true
//     }
// })

const studentSchema = mongoose.Schema({
    rollnumber:{
        type: String,
        required : true,
        trim: true,
        unique: true  
    },
    email:{
        type : String,
        required : true,
        trim: true,
        unique: true
    },
    password:{
        type : String,
        required : true
    },
    batch:{
        type : String,
        required: true
    },
    isVerified :{
        type : Boolean,
        required : true,
        default : false,
    },
    publicKey:{
        type : String,
        // required : true,
        default : '',
    },
    results:[String]

})

var Students = mongoose.model('Students', studentSchema);

export default Students;