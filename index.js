import "dotenv/config"
import express from "express"

import * as supabaseService from "./supabaseService.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/webhook", async (request, response) => {
    console.log("host:", request.get("host"))
    console.log("origin:", request.get("origin"))
    console.log("referer:", request.get("referer"))
    const result = await supabaseService.insertWebhook(
        request.get("host"),
        request.body
    )
    response.json(result)
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
