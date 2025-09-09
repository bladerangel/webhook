import { createClient } from "@supabase/supabase-js"
import moment from "moment-timezone"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export async function insertWebhook(origin, payload) {
    const created = moment().utcOffset(-3).format("YYYY-MM-DD HH:mm:ss")
    console.log(created)
    const { data, error } = await supabase
        .from("webhook")
        .insert([{ origin, payload, created }])
        .select()
        .single()

    if (error) {
        console.error("Error inserting webhook:", error)
    }

    return data
}
