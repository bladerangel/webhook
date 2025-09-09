import { createClient } from "@supabase/supabase-js"
import moment from "moment-timezone"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export async function insertWebhook(origin, payload) {
    const created = moment.tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss")
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
