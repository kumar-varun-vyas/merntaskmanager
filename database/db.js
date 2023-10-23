
const mongoose = require("mongoose")

const mongoUri = `${process.env.DB_URL}`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(mongoUri, options)
    .then(() => {
        console.log("mongodb connected")
    })
    .catch((err) => {
        console.error("Error in connecting mongodb ", err)
    })