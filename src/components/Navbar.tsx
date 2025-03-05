import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex mx-8 py-1 otherBg shadow-md rounded-full items-center justify-around'>
            <Image src={"/logo.png"} alt='' height={55} width={55} />
            <ul className='flex gap-6'>
                <Link className='py-1 px-4 duration-500  hover:bg-gray-800 rounded-md' href={"#pricing"}>Pricing</Link>
                <Link className='py-1 px-4 duration-500  hover:bg-gray-800 rounded-md' href={"#pricing"}>Features</Link>
                <Link className='py-1 px-4 duration-500  hover:bg-gray-800 rounded-md' href={"#pricing"}>FaQs</Link>
            </ul>
            <button className='py-1 px-5 bg-[#257180] rounded-full'>Sign up</button>
        </div>
    )
}

export default Navbar
