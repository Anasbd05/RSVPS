import React from 'react'
import {getRsvps} from '@/app/actions/getRsvps'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {House} from 'lucide-react'
import RsvpTable from '@/app/_components/RsvpTable'

const page = async () => {

    const {data} = await getRsvps()
    return (
        <div className='container mx-auto mt-8 p-4'>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-2xl font-bold'>ALL RSVPS</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/"}>
                        <Button className='cursor-pointer' variant={"outline"}>
                            <House />
                            Home
                        </Button>
                    </Link>
                    {/* Lougout */}
                    <Button className='cursor-pointer hover:opacity-75' variant={"destructive"}>
                        Sign Out
                    </Button>
                </div>
            </div>

            {/* table */}
            <RsvpTable data={data || []} />

        </div>
    )
}

export default page
