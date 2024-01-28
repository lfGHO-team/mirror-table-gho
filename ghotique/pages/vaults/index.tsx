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

    const dato = [
        "0xDD4E382FBF2CE432c1313ba0ca27Da7b51236A9a",
        "0x561a39Ec91C6BaAc2F7B704ce2655eAca9793A0c",
        "0xf9d7bAE56F6b938c1eCA0DF4681a3637E521871B",
        "0x8C88F3e1d903C8E38093Fa0c0D6cAC51A4Cb70cC"
    ]

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
                className={`flex min-h-[92dvh] flex-col space-y-6 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 overflow-scroll`}
            >
                <div className='space-y-1 md:space-y-0'>
                    <h2 className='text-2xl text-white font-semibold mb-4'>
                        Vaults
                    </h2>
                    <p className='text-white text-sm'>
                        These are cap tables you and others have created.
                    </p>
                    <p className='text-white text-sm'>
                        We have a few example cap tables while we wait for the community to{' '}
                        <span>
                            <Link href='/new-cap' className='hover:cursor-pointer text-white text-sm underline'>
                                create more
                            </Link>
                        </span>.
                    </p>
                </div>
                {
                    isLoading && <div className='text-white'>LOADING...</div>
                }
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data && data.map((item: any, index: number) => (
                        <>
                            <Link href={`/vault/${item}`} key={index} className=' hover:cursor-pointer flex overflow-hidden'
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
                        </>
                    ))}
                    {dato.map((item: any, index: number) => (
                        <>
                            <Link href={`/vault/${item}`} key={index} className='hover:cursor-pointer flex overflow-hidden'
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
                        </>
                    ))}


                </div>

            </main>

        </>
    )
}

export default CapTable
