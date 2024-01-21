import React from 'react'
import { useAccount } from 'wagmi'
import gho from "../../../assets/tokens/gho.png"
import Image from 'next/image'
import { Web3Button, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { ethers } from 'ethers'

const Invest = () => {

    const router = useRouter();
    const vault = router.query.vault;
    const { companyName, companyAddress, agreementType, investmentAmount, investorsAddress } = router.query;

    const { isConnected, address } = useAccount()
    const { contract } = useContract("0x561a39ec91c6baac2f7b704ce2655eaca9793a0c");
    const { data: isAccreditedInvestor, isLoading } = useContractRead(contract, "accreditedInvestor", [address])
    const { mutateAsync: deposit, isLoading: depositLoading } = useContractWrite(contract, "deposit")
    console.log("is accredited investor: ", isAccreditedInvestor)

    const { contract: ghoContract } = useContract("0xc4bf5cbdabe595361438f8c6a187bdc330539c60");
    const { mutateAsync: approve, isLoading: approveIsLoading } = useContractWrite(ghoContract, "approve")

    const { data: allowance, isLoading: allowanceIsLoading } = useContractRead(ghoContract, "allowance", [address, vault])
    console.log("allowance: ", allowance)

    const ghoAllowance = allowance ? ethers.utils.formatUnits(allowance, 18) : 0;
    console.log("allowance: ", ghoAllowance)



    const callApprove = async () => {
        try {
            toast.loading("Approving funds...")
            const data = await approve({ args: [vault, `${investmentAmount}000000000000000000`] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Contract call failed");
        } finally {

            toast.success("Funds approved!");

        }
    }

    const call = async () => {
        try {
            toast.loading("Sending funds...")
            const data = await deposit({ args: [`${investmentAmount}000000000000000000`, address] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Contract call failed");
        } finally {
            toast.success("Funds deposited!");
        }
    }

    // if (isAccreditedInvestor) {
    //     return (
    //         <main
    //             className={`flex min-h-[70dvh] flex-col justify-center w-full bg-[#0b111b] p-6`}
    //         >
    //             <h2>
    //                 You are not an accredited investor. Please contact the company to request access.
    //             </h2>
    //         </main>
    //     )
    // }

    return (
        <>
            <main
                className={`flex min-h-[70dvh] flex-col justify-center w-full bg-[#0b111b] p-6 space-y-8 md:px-12`}
            >
                <h2 className='text-3xl text-white'>
                    Investor Portal
                </h2>
                <div className="border border-[#27272A] p-6 text-white max-w-2xl rounded-lg shadow-md overflow-scroll">
                    <h1 className="text-2xl mb-4">Investment form</h1>
                    <p className="mb-4 text-[#A1A1AA]">
                        {`Confirm the details of the investment and click "Send funds" to confirm the transaction. Once the transaction is recorded, you will receive your equity on-chain assets to the connected wallet.`}
                    </p>
                    <div className="space-y-3 mb-6">
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Sending
                                funds to</span>
                            <span>{companyName}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Company address</span>
                            <span>{companyAddress}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Amount</span>
                            <div className="flex items-center space-x-2">
                                <span>{investmentAmount} GHO</span>
                                <Image src={gho} width={20} height={20} alt="gho" className='rounded-full' />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Shares to be received</span>
                            <span>{investmentAmount}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Receiver&apos;s wallet address</span>
                            <span>{investorsAddress}</span>
                        </div>
                    </div>
                    <div>
                        <p>
                            allowance:
                            {ghoAllowance}
                        </p>
                    </div>

                    {
                        investmentAmount &&
                            ghoAllowance < investmentAmount ?
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={callApprove}
                            >
                                Approve
                            </button>
                            :
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={call}
                            >
                                Send funds →
                            </button>
                    }
                </div>

            </main>
        </>
    )
}

export default Invest