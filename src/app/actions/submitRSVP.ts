"use server"
import {Resend} from "resend";
import {createClient} from "../utils/supabase/server"


const resend = new Resend(process.env.RESEND_API_KEY);


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

    if(process.env.EMAIL_TO) {
        console.log("no email ")
    }
    try {
        await resend.emails.send({
            from: 'RSVP <onboarding@resend.dev>',
            to: process.env.EMAIL_TO!,
            subject: 'New RSVP Submitted',
            html: `<h1>New RSVP Submission</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Number of Guests:</strong> ${accompany}</p>
                    <p><strong>Attendance:</strong> ${attendance}</p>`
        })
    } catch(error) {
        console.log(error)
    }

    return {success: true,message: "RSVP submitted successfully"}
}