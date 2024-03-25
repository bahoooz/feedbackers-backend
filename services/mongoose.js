require("dotenv").configDotenv()
const mongoose = require("mongoose")

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connectée");
}

connectDb().catch((err) => console.log(err))

module.exports = connectDb