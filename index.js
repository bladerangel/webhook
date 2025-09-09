import "dotenv/config"
import express from "express"
import requestIp from "request-ip"
import * as supabaseService from "./supabaseService.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestIp.mw())

app.post("/webhook", async (request, response) => {
    const result = await supabaseService.insertWebhook(
        request.clientIp,
        request.body
    )
    response.json(result)
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
