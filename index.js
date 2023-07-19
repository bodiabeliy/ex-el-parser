require('dotenv').config()
const updateDbData = require('./update.db.data')

const schedule = require("node-schedule")



schedule.scheduleJob('0 0 */1 * * *', async ()=>{
    await updateDbData()
})
