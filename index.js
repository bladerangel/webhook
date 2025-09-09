import "dotenv/config"
import express from "express"

const app = express()

app.post("/webhook", async (request, response) => {
    response.json()
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
