import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ConnectKitButton } from 'connectkit'
import Navbar from '@/components/header'
import Head from 'next/head'
import pie from "../../assets/icons/pie.svg"
import wallet from "../../assets/icons/wallet.svg"
import link from "../../assets/icons/link.svg"

import { AnimatePresence, motion } from 'framer-motion'
import EquityLink from '@/components/modals/equity-link'
import NotesTable from '@/components/dashboard/notes-table'
import { useState } from 'react'

import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

const Dashboard = () => {

    const [equityModal, setEquityModal] = useState(false)
    const onClose = () => setEquityModal(false)

    return (
        <>
            <Head>
                <title>Ghothique Dashboard</title>
                <meta name="description" content="Investments made simple" />
                <meta name="keywords" content="investments, cap table, capitalization table" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="" />
            </Head>
            <main
                className={`flex min-h-[92dvh] flex-col space-y-6 md:space-y-12 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 ${inter.className}`}
            >
                <div className='border border-[#27272A] rounded-xl flex items-center text-white space-x-4 p-4 md:w-2/5 hover:bg-[#101827] hover:cursor-pointer'
                    onClick={() => setEquityModal(true)}
                >
                    <div>
                        <Image src={link} width={75} height={75} alt='equity link' />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='font-medium text-lg'>Issue equity link</h3>
                        <p className='font-light leading-tight text-xs md:text-sm'>Create a link for the investors to deposit funds and receive equity on-chain assets.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className='border border-[#27272A] rounded-2xl w-full p-6 space-y-8 md:pr-24'>
                        <div className='space-y-2'>
                            <p className='text-white font-medium text-lg md:text-4xl'>$1.25M</p>
                            <p className='text-lg text-[#A1A1AA]'>Total funding received</p>
                        </div>
                        <div className="flex">
                            <Image src={pie} width={250} height={250} alt='pie chart' />

                        </div>
                    </div>
                    <div className='space-y-4'>
                        <NotesTable />
                        <div className='border border-[#27272A] rounded-3xl w-full p-6 space-y-4 md:pr-24'>
                            <div className='space-y-2'>
                                <h3 className='text-white font-medium text-lg md:text-xl'>Rounds breakdown</h3>
                                <Image src={wallet} width={30} height={30} alt='pie chart' />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {
                    equityModal &&
                    <EquityLink onClose={onClose} />
                }
            </AnimatePresence>

        </>
    )
}

Dashboard.PageLayout = Layout

export default Dashboard
