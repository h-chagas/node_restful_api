const mongoose = require('mongoose');

// This is the schema
const commentsSchema = mongoose.Schema(
    {
        customer: {
            type: String,
            required: [true, "Please enter your name"]
        },
        comment: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


// This is the module
const Comment = mongoose.model('Comment', commentsSchema);



module.exports = Comment;

