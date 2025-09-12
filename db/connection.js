const mongooose = require('mongoose')
const  connectDB =  async()=>{
    try {
       await mongooose.connect(process.env.MONGO_URL)
       console.log('Connected to Database successfully')

    } catch (error) {
        console.log(`Error while DB connectoin ${error}`)
    }
}
module.exports = connectDB;