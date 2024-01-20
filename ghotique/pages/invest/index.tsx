import React from 'react'
import { useAccount } from 'wagmi'
import gho from "../../assets/tokens/gho.png"
import Image from 'next/image'
import { Web3Button, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'

const Invest = () => {

    const { isConnected, address } = useAccount()
    const { contract } = useContract("0x561a39ec91c6baac2f7b704ce2655eaca9793a0c");
    const { data: isAccreditedInvestor, isLoading } = useContractRead(contract, "accreditedInvestor", [address])
    const { mutateAsync: deposit, isLoading: depositLoading } = useContractWrite(contract, "deposit")
    console.log("is accredited investor: ", isAccreditedInvestor)

    const call = async () => {
        try {
            toast.loading("Sending funds...")
            const data = await deposit({ args: [50, address] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Contract call failed");
        } finally {
            toast.success("Funds deposited!");
        }

    }

    if (isAccreditedInvestor) {
        return (
            <main
                className={`flex min-h-[70dvh] flex-col justify-center w-full bg-[#0b111b] p-6`}
            >
                <h2>
                    You are not an accredited investor. Please contact the company to request access.
                </h2>
            </main>
        )
    }

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
                                <span>100 GHO</span>
                                <Image src={gho} width={20} height={20} alt="gho" className='rounded-full' />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Shares to be received</span>
                            <span>12,000</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Receiver&apos;s wallet address</span>
                            <span>{address}</span>
                        </div>
                    </div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={call}
                    >
                        Send funds →
                    </button>

                </div>
            </main>
        </>
    )
}

export default Invest