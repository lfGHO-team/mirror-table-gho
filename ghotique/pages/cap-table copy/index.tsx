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
                <title>My Cap Tables</title>
                <meta name="description" content="Investments made simple" />
                <meta name="keywords" content="investments, cap table, capitalization table" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="" />
            </Head>
            <main
                className={`flex min-h-[92dvh] flex-col space-y-6 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 ${inter.className}`}
            >
                {data && data.map((item: any, index: number) => (
                    <Link href={`/my-cap-tables/${item}`} key={index} className='lex items-center text-white  hover:bg-[#101827] hover:cursor-pointer'
                    >
                        <div className='border border-[#27272A] rounded-xl flex items-center text-white space-x-4 p-4 md:w-2/5 hover:bg-[#101827] hover:cursor-pointer'
                            onClick={() => setEquityModal(true)}
                        >
                            <div>
                                <TbTable size={75} />
                            </div>
                            <div className='space-y-1'>
                                <h3 className='font-medium text-lg'>Issue equity link</h3>
                                <span className='text-xs'>
                                    {item}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}

            </main>

        </>
    )
}

export default CapTable
