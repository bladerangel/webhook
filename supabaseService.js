import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

function formatISOSecondsLocal(date) {
    return new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString()
}

export async function insertWebhook(origin, payload) {
    const created = formatISOSecondsLocal(new Date())
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
