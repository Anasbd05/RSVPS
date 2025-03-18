"use client"
import React,{useMemo,useState} from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Input} from '@/components/ui/input'

interface RSVPS {
    id: string,
    name: string,
    email: string,
    accompany: number,
    attendance: string,
}

interface RSVPSTABLE {
    data: RSVPS[]
}


const RsvpTable = ({data}: RSVPSTABLE) => {

    const [filter,setFilter] = useState('')

    const filteredData = data.filter((rsvp) => rsvp.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by name..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Number of Guests</TableHead>
                            <TableHead>Attending</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((rsvp) => (
                                <TableRow key={rsvp.id}>
                                    <TableCell>{rsvp.name}</TableCell>
                                    <TableCell>{rsvp.email}</TableCell>
                                    <TableCell>{rsvp.accompany || "/"}</TableCell>
                                    <TableCell>{rsvp.attendance}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default RsvpTable
