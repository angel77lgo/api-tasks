import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/tasks",
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    console.log("Mongo Connected")
}).catch(err => {
    console.log(err)
})
