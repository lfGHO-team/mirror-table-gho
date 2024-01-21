import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useAccount } from 'wagmi'

const ExitPosition = () => {

    const router = useRouter();
    const { vault } = router.query;
    const { address, isConnected } = useAccount()
    const { contract } = useContract(`${vault}`);
    const { data: name, isLoading } = useContractRead(contract, "name", [])
    const { data: symbol, } = useContractRead(contract, "symbol", [])
    const { data: balanceOf } = useContractRead(contract, "balanceOf", [address])

    const balance = parseInt(balanceOf?._hex) / 1000000000000000000
    const { data: convertToAssets } = useContractRead(contract, "convertToAssets", [balance])
    const assets = parseInt(convertToAssets?._hex)

    const [sliderValue, setSliderValue] = useState(0); // Slider's percentage value
    const [receiveAmount, setReceiveAmount] = useState(0); // Calculated amount to receive back

    // This function will be called whenever the slider value changes
    const handleSliderChange = (e: { target: { value: string; }; }) => {
        const newValue = parseInt(e.target.value);
        setSliderValue(newValue);

        // Assuming `assets` is the total current value of the user's investment
        const calculatedReceiveAmount = (assets * newValue) / 100;
        setReceiveAmount(calculatedReceiveAmount);
    };

    const percentageMarks = [0, 25, 50, 75, 100];

    const isActiveCircle = (value: number) => {
        return sliderValue >= value ? 'active-circle' : 'inactive-circle';
    };

    const { mutateAsync: redeem, isLoading: redeemIsLoading } = useContractWrite(contract, "redeem")

    const call = async () => {
        try {
            toast.loading('Redeeming funds...', { duration: 3000 })
            const data = await redeem({ args: [`${Number(receiveAmount).toFixed(0)}000000000000000000`, address, address] });
            console.info("contract call successs", data);
            toast.success('Funds redeemed!', { duration: 2000 })
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    if (redeemIsLoading) {
        toast.loading('Redeeming funds...', { duration: 3000 })
    }

    return (
        <>
            <Head>
                <title>Exit investment</title>
                <meta name="description" content="Investments made simple" />
                <meta name="keywords" content="investments, cap table, capitalization table" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="" />
            </Head>
            <main
                className={`flex min-h-[92dvh] flex-col space-y-6 md:space-y-12 w-full bg-[#0b111b] md:py-12 p-6 md:px-24 overflow-x-hidden`}
            >
                <h2 className='text-3xl text-white'>
                    Investor Portal
                </h2>
                <div className="border border-[#27272A] p-6 text-white max-w-2xl rounded-lg shadow-md overflow-scroll">
                    <h1 className="text-2xl mb-4">Exit investment</h1>
                    <p className="mb-4 text-[#A1A1AA]">
                        {`You can exit your invesment by burning the shares and receiving the funds back to your wallet. The final sum of funds is calcuated according to the current value of the project.`}
                    </p>
                    <div className="space-y-3 mb-6">
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Investment</span>
                            <div className='flex space-x-1 items-baseline'>
                                <span>{name}</span>
                                <span className='text-xs'>(${symbol})</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Round</span>
                            <div className="flex items-center space-x-2">
                                <span>Seed</span>
                                {/* <Image src={gho} width={20} height={20} alt="gho" className='rounded-full' /> */}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Invested</span>
                            <span>{balance}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Current value</span>
                            <span>{assets}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Receiver&apos;s wallet address</span>
                            {
                                isConnected ? <span className='text-xs'>{address}</span> : <span>Connect wallet</span>
                            }
                        </div>
                        <div className="flex flex-col space-y-2 pt-2 justify-between">
                            <span>Select the amount of shares to burn</span>
                            <div className='w-full relative'>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                                <div className="top-1.5 w-full flex justify-between">
                                    {percentageMarks.map((mark) => (
                                        <div key={mark} className=''>
                                            <span
                                                className={`h-4 w-4 rounded-full ${isActiveCircle(mark)}`}
                                            >
                                            </span>
                                            <span className='text-xs'>
                                                {mark}%
                                            </span>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between">
                            <span>Exit and receive:</span>
                            <span>{receiveAmount.toFixed(0)} GHO</span> {/* Format the amount to two decimal places */}
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={call}
                        >
                            Redeem funds →
                        </button>
                    </div>
                </div>
            </main>

        </>
    )
}

export default ExitPosition