import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import { TbTable } from "react-icons/tb";


import { useContract, useContractRead, useWallet } from "@thirdweb-dev/react";
import { useAccount } from 'wagmi'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Dashboard = () => {

    const { address } = useAccount();
    const { contract } = useContract("0x01759CC46Fbc6753D27689E411A67278f01805f7");
    const { data, isLoading } = useContractRead(contract, "getInvestorVaults", [address])

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Investments made simple" />
                <meta name="keywords" content="investments, cap table, capitalization table" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="" />
            </Head>
            <main
                className={`flex min-h-[92dvh] flex-col space-y-6 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 overflow-scroll`}
            >
                <div className='space-y-1 md:space-y-0'>
                    <h2 className='text-2xl text-white font-semibold mb-4'>
                        Your Cap Tables
                    </h2>
                    <p className='text-white text-sm'>
                        These are the cap tables you&apos;ve created or have access to.
                    </p>
                    <p className='text-white text-sm'>
                        If you haven&apos;t created one yet, click the button below:
                    </p>
                    <Link href={`/new-cap`} className='hover:cursor-pointer text-white text-sm underline'>
                        Create new cap table
                    </Link>
                </div>
                {
                    isLoading ?
                        <div className="flex gap-4 flex-col md:flex-row">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="animate-pulse flex space-x-4 w-full p-4 border rounded-xl">
                                    <div className="rounded-full bg-gray-300 h-4 w-4"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-scroll">
                            {data && data.map((item: any, index: number) => (
                                <div key={index} className='overflow-scroll'>
                                    <Link href={`/vault/${item}`} className='hover:bg-[#101827] hover:cursor-pointer flex overflow-hidden'
                                    >
                                        <div className='border border-[#27272A] rounded-xl flex items-center text-white space-x-2 p-4 hover:bg-[#101827] hover:cursor-pointer w-full overflow-scroll'
                                        >
                                            <div>
                                                <TbTable size={20} />
                                            </div>

                                            <span className='text-xs'>
                                                {item}
                                            </span>

                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                }

            </main>

        </>
    )
}

export default Dashboard
