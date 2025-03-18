"use server"

import {createClient} from "../utils/supabase/server"

export async function getRsvps() {
    const supabase = await createClient()

    const {data,error} = await supabase.from('rsvps').select('*')
    if(error) {
        console.log(error,"Error fetching")
        return ({success: false,message: "Failed to fetch RSVPS"})
    }
    console.log(data)
    return ({success: true,data})
}