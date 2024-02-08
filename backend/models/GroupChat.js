const mongoose = require('mongoose')

const GroupChatSchema = new mongoose.Schema({
    from_user: {
        type: String,
        unique: true,
        required: true,
    },
    room: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: String,
        default: new Date()
    }
})


module.exports = mongoose.model("groupChat", GroupChatSchema)