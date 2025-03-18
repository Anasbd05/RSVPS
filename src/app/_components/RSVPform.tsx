"use client"
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {RadioGroup,RadioGroupItem} from '@/components/ui/radio-group'
import {MapPin} from 'lucide-react'
import React,{useState} from 'react'
import {strings} from '../utils/strings'
import {SubmitRsvp} from '../actions/submitRSVP'
import {toast} from 'sonner'


const RSVPform = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [accompany,setAccompany] = useState<string | null>(null);
    const [attendance,setAttendance] = useState("yes");
    const [errors,setErrors] = useState<Record<string,string>>({});
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!name) {
            setErrors({name: 'Name is required'})
            return
        }
        if(!email) {
            setErrors({email: 'Email is required'})
            return
        }
        const formData = new FormData()
        formData.append("name",name)
        formData.append("email",email)
        formData.append("accompany",accompany || "0")
        formData.append("attendance",attendance)
        console.log(formData,'form data')

        setIsLoading(true)
        const response = await SubmitRsvp(formData)
        if(response.success) {
            toast.success(strings.thankYouMessage)
            setName('')
            setEmail('')
            setAccompany("0")
            setAttendance('yes')
            setErrors({})
        } else {
            toast.error(response.message)
        }
        if(response.error?.code === "23505") {
            toast.error("Email already exists!")
            setErrors({email: "Email already exists!"})
        }
        setIsLoading(false)
    }
    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps/search/?api=1&querry=${strings.eventLocation}`)
    }
    return (
        <div className='max-w-md mx-auto my-10'>
            <h1 className='text-2xl font-bold mb-4'>Wedding RSVP</h1>
            <p className='mb-6'>We&#39;re excited to celebrate our special day with you! Please let us know if you can make it.</p>

            <div className="mb-6">
                <Label>Event Date</Label>
                <Calendar mode='single' selected={new Date(strings.eventDate)}
                    className='rounded-md border flex flex-col items-center'
                    fromDate={new Date(strings.eventDate)} toDate={new Date(strings.eventDate)}
                    defaultMonth={new Date(strings.eventDate)} ISOWeek
                />
                <div className="mt-4">
                    <Button type='button' variant={"outline"} onClick={openGoogleMaps} className='w-full cursor-pointer'>
                        <MapPin />
                        View Location on Google Maps
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6' >
                <div>
                    <Label className='mb-1' htmlFor='name'>Full Name</Label>
                    <Input id='name' value={name} required
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name &&
                        <p className='text-red-500 text-sm mt-1'>{errors.name} </p>
                    }
                </div>
                <div>
                    <Label className='mb-1' htmlFor='email'>Email Address</Label>
                    <Input id='email' value={email} required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email &&
                        <p className='text-red-500 text-sm mt-1'>{errors.email} </p>
                    }
                </div>
                <div>
                    <Label className='mb-1' htmlFor='accompany'>Number of Guests</Label>
                    <Input id='accompany' value={accompany} min="0" type='number'
                        onChange={(e) => setAccompany(e.target.value)}
                    />
                </div>
                <div>
                    <Label className='mb-1'>Will you attend?</Label>
                    <RadioGroup value={attendance} onValueChange={setAttendance}>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='yes' id='yes' />
                            <Label htmlFor='yes'>Yes, I&lsquo;ll be there!</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='no' id='no' />
                            <Label htmlFor='no'>Sorry, I can&#39;t make it</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send RSVP"}
                </Button>
            </form>
        </div>
    )
}

export default RSVPform
