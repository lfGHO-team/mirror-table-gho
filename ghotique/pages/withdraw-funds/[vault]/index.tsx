import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner';
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Head from 'next/head';

const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const childVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
};

const CreateCapTable = () => {

    const router = useRouter();
    const { vault } = router.query;
    const { address } = useAccount();
    const [amount, setAmount] = useState('');

    const { contract } = useContract(vault as string);

    const { mutateAsync: withdraw, isLoading } = useContractWrite(contract, "withdraw")

    const call = async () => {
        try {
            const data = await withdraw({ args: [1, address, address] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }


    return (
        <>
            <Head>
                <title>Withdraw</title>
                <meta name="description" content="Investments made simple" />
                <meta name="keywords" content="investments, cap table, capitalization table" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="" />
            </Head>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 text-white rounded-lg max-w-lg mx-auto space-y-4 md:p-0 md:pt-16"
            >
                <h3 className='md:text-lg'>
                    Withdraw funds
                </h3>
                <p className='text-[#A1A1AA] text-sm'>
                    You can request funds withdrawal to your co-founders. Once all your co-founders confirm the transaction, it gets executed.
                </p>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 text-white rounded-lg max-w-lg mx-auto md:p-0 mt-4"
            >
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="withdrawalPurpose" className="text-sm">Withdrawal purpose</label>
                    <motion.input variants={childVariants} id="withdrawalPurpose" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="amount" className="text-sm">Amount</label>
                    <motion.input variants={childVariants} id="amount" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </motion.div>

                <button
                    className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] font-light mx-auto mt-2 text-sm"
                    disabled={isLoading}
                    onClick={call}
                >
                    {isLoading ? (
                        <div className='flex items-center space-x-2'>
                            <span>
                                Requesting
                            </span>
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        "Request transaction"
                    )}
                </button>
            </motion.div>
        </>
    );
}

export default CreateCapTable