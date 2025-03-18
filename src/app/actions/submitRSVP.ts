"use server"

import {createClient} from "../utils/supabase/server"

export async function SubmitRsvp(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name')
    const email = formData.get('email')
    const accompany = formData.get('accompany')
    const attendance = formData.get('attendance')

    console.log(formData,"Form data")

    const {data,error} = await supabase.from('rsvps').insert([{
        name,
        email,
        accompany,
        attendance
    }])
    console.log(data,"submit rsvp successfully")

    if(error) {
        console.log("error inserting RSVP",error)
        return {success: false,message: "failed to submit rsvp",error}
    }

    return {success: true,message: "RSVP submitted successfully"}
}