import Image from 'next/image'
import { Inter } from 'next/font/google'

import Head from 'next/head'
import pie from "../../../assets/icons/pie.svg"
import wallet from "../../../assets/icons/wallet.svg"
import link from "../../../assets/icons/link.svg"
import gho from "../../../assets/tokens/gho.png"
import { AnimatePresence, motion } from 'framer-motion'
import EquityLink from '@/components/modals/equity-link'
import NotesTable from '@/components/dashboard/notes-table'
import { useEffect, useState } from 'react'
import { useContract, useContractRead, useWallet } from "@thirdweb-dev/react";
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Vault = () => {

    const router = useRouter();
    const { address: vault } = router.query;
    const [equityModal, setEquityModal] = useState(false)
    const onClose = () => setEquityModal(false)
    const { address } = useAccount();
    const { contract } = useContract("0x561a39ec91c6baac2f7b704ce2655eaca9793a0c");
    const [formattedTotalAssets, setFormattedTotalAssets] = useState('');

    console.log("vault: ", vault)

    const { data: totalAssetsData, isLoading } = useContractRead(contract, "totalAssets", [])
    console.log("total assets: ", totalAssetsData)

    useEffect(() => {
        if (totalAssetsData) {
            try {
                const bigNumberValue = ethers.BigNumber.from(totalAssetsData);
                const totalAssets = ethers.utils.formatEther(bigNumberValue);
                setFormattedTotalAssets(totalAssets); // Update state with the formatted value
            } catch (err) {
                console.error("Error processing total assets data: ", err);
            }
        }
    }, [totalAssetsData]);

    const { data: name, } = useContractRead(contract, "name", [])

    const { data: isOwner, } = useContractRead(contract, "isOwner", [address])

    const { data: authorizedInvestors } = useContractRead(contract, "getAuthorizedInvestors", [])
    console.log("authorized investors: ", authorizedInvestors)

    const { data: accreditedInvestor } = useContractRead(contract, "accreditedInvestor", [])


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
                className={`flex min-h-[92dvh] flex-col space-y-6 md:space-y-12 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 ${inter.className}`}
            >
                <h2 className='text-3xl text-white'>
                    Investor Portal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className='relative border border-[#27272A] rounded-2xl w-full p-6 space-y-8 md:pr-24'>
                        <div className='space-y-2'>
                            <p className='text-lg text-[#A1A1AA]'>{name}</p>
                            <div className="flex items-center space-x-2">
                                <p className='text-white font-medium text-2xl md:text-3xl'>{formattedTotalAssets ? `$${formattedTotalAssets} GHO` : 'Loading...'}</p>

                                <Image src={gho} width={25} height={25} alt="gho" className='rounded-full' />
                            </div>
                            <p className='text-lg text-[#A1A1AA]'>Total funding received</p>
                            {
                                isOwner &&
                                <motion.div className="flex items-center space-x-2 absolute top-2 right-8">
                                    <Link
                                        href={`/exit-investment/${vault}`}
                                        className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-base font-light mx-auto mt-2"
                                    >
                                        Exit investment
                                    </Link>
                                </motion.div>
                            }

                        </div>
                        <div className="flex">
                            <Image src={pie} width={250} height={250} alt='pie chart' />
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className=''>
                        </div>
                        <NotesTable investors={authorizedInvestors} />
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {
                    equityModal &&
                    <EquityLink onClose={onClose} vault={vault as string} />
                }
            </AnimatePresence>

        </>
    )
}

export default Vault
