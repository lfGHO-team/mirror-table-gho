import React from 'react'
import { useAccount } from 'wagmi'
import gho from "../../assets/tokens/gho.png"
import Image from 'next/image'

const Invest = () => {

    const { isConnected, address } = useAccount()

    return (
        <>
            <main
                className={`flex min-h-[70dvh] flex-col justify-center w-full bg-[#0b111b] p-6`}
            >
                <div className="border border-[#27272A] p-6 text-white max-w-2xl mx-auto rounded-lg shadow-md overflow-scroll">
                    <h1 className="text-2xl mb-4">Investment form</h1>
                    <p className="mb-4 text-[#A1A1AA]">
                        {`Confirm the details of the investment and click "Send funds" to confirm the transaction. Once the transaction is recorded, you will receive your equity on-chain assets to the connected wallet.`}
                    </p>
                    <div className="space-y-3 mb-6">
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Sending
                                funds to</span>
                            <span>companyaoain.eth</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Amount</span>
                            <div className="flex items-center space-x-2">
                                <span>100,000 GHO</span>
                                <Image src={gho} width={20} height={20} alt="gho" className='rounded-full' />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Shares to be received</span>
                            <span>12,000</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Receiver&apos;s wallet address</span>
                            <span>0xBB60ADaFB45ebbf4CE60799950a39f3dfb3AD2DC</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Connected wallet address</span>
                            {
                                isConnected ?
                                    <span>{address}</span> :
                                    <span>No wallet connected</span>
                            }
                        </div>
                    </div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

                    >
                        Send funds →
                    </button>
                </div>

            </main>
        </>
    )
}

export default Invest