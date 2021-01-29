const mongoose = require('mongoose');
const {Schema} = mongoose;

const Task = new Schema({
    description: String,
    duration: Number,
    recordedTime: Number,
    status: Boolean
})

export default mongoose.model("tasks", Task)

