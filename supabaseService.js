import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export async function insertWebhook(origin, payload) {
    console.log(origin, payload)
    const { data, error } = await supabase
        .from("webhook")
        .insert([{ origin, payload }])
        .select()
        .single()

    if (error) {
        console.error("Error inserting webhook:", error)
    }

    return data
}
