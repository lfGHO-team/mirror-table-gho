import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

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
    const [companyName, setCompanyName] = useState('');
    const [ticker, setTicker] = useState('');
    const [signers, setSigners] = useState(['']);
    const [numConfirmationsRequired, setNumConfirmationsRequired] = useState('');
    const [minInitialInvestment, setMinInitialInvestment] = useState('');

    const { contract } = useContract("0x01759CC46Fbc6753D27689E411A67278f01805f7");
    const { mutateAsync: createNewMirrorTable, isLoading } = useContractWrite(contract, "createNewMirrorTable")

    const call = async () => {
        try {
            const formattedNumConfirmationsRequired = parseInt(numConfirmationsRequired);
            const formattedInitialInvestment = parseFloat(minInitialInvestment); // Or use a BigNumber library if needed


            const data = await createNewMirrorTable({ args: [companyName, ticker, signers, numConfirmationsRequired, minInitialInvestment] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    // Function to handle adding a new signer input
    const addSigner = () => {
        setSigners([...signers, '']);
    };

    // Function to handle signer input change
    const handleSignerChange = (index: number, event: { target: { value: string; }; }) => {
        const newSigners = [...signers];
        newSigners[index] = event.target.value;
        setSigners(newSigners);
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 text-white rounded-lg max-w-lg mx-auto space-y-4 md:p-0 md:pt-16"
            >
                <h3 className='md:text-lg'>
                    Create cap table
                </h3>
                <div className="space-y-1">
                    <p className='text-[#A1A1AA] text-sm'>
                        By clicking “Create cap table” you will initiate the vault smart contract creation which will require signing 2 transactions.
                    </p>
                    <p className='text-[#A1A1AA] text-sm'>
                        We do not charge a fee on creating a vault. You will have to pay a gas fee for the transactions.
                    </p>
                </div>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 text-white rounded-lg max-w-lg mx-auto md:p-0 mt-4"
            >
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Company name</label>
                    <motion.input variants={childVariants} id="companyName" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Ticker (3-4 letters)</label>
                    <motion.input variants={childVariants} id="ticker" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Initial multisig signers</label>
                    <motion.input variants={childVariants} id="multisigSigners" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Initial number of multisig confirmations</label>
                    <motion.input variants={childVariants} id="multisigConfirmations" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Initial investment</label>
                    <motion.input variants={childVariants} id="initialInvestment" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>

                <motion.button
                    variants={childVariants}
                    className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-base font-light mx-auto mt-2"
                    onClick={() => toast.info("Coming soon!")}
                >
                    Create cap table
                </motion.button>
            </motion.div>
        </>
    );
}

export default CreateCapTable