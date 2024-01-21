import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import { TbTable } from "react-icons/tb";


import { useContract, useContractRead, useWallet } from "@thirdweb-dev/react";
import { useAccount } from 'wagmi'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const CapTable = () => {

    const [equityModal, setEquityModal] = useState(false)
    const onClose = () => setEquityModal(false)
    const { address } = useAccount();
    const { contract } = useContract("0x01759CC46Fbc6753D27689E411A67278f01805f7");
    const { data, isLoading } = useContractRead(contract, "getInvestorVaults", [address])
    console.log("lfg: ", data)

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
                className={`flex min-h-[92dvh] flex-col space-y-6 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 ${inter.className}`}
            >
                {
                    isLoading && <div>HOLAAA</div>
                }
                <div className="flex gap-4 flex-col md:flex-row overflow-scroll">
                    {data && data.map((item: any, index: number) => (
                        <>
                            <Link href={`/vault/${item}`} key={index} className='hover:bg-[#101827] hover:cursor-pointer flex'
                            >
                                <div className='border border-[#27272A] rounded-xl flex items-center text-white space-x-2 p-4 hover:bg-[#101827] hover:cursor-pointer'
                                >
                                    <div>
                                        <TbTable size={20} />
                                    </div>

                                    <span className='text-xs'>
                                        {item}
                                    </span>

                                </div>
                            </Link>
                        </>
                    ))}
                    <Link href={`/new-cap`} className='hover:bg-[#101827] hover:cursor-pointer flex w-full'
                    >
                        <div className='border border-[#27272A] rounded-xl flex items-center text-white space-x-2 p-4 hover:bg-[#101827] hover:cursor-pointer w-full'
                        >
                            <div>
                                <TbTable size={20} />
                            </div>
                            <span className='text-xs'>
                                Create new cap table
                            </span>

                        </div>
                    </Link>
                </div>

            </main>

        </>
    )
}

export default CapTable
