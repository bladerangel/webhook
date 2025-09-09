import { createClient } from "@supabase/supabase-js"
import { format } from "date-fns-tz"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

function getNowBrazilISO() {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", {
        timeZone: "America/Sao_Paulo"
    })
}
export async function insertWebhook(origin, payload) {
    const created = getNowBrazilISO()
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
