import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { useContract, useContractWrite, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

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

    const { address } = useAccount();
    const [companyName, setCompanyName] = useState('');
    const [ticker, setTicker] = useState('');
    const [signers, setSigners] = useState(['']);
    const [numConfirmationsRequired, setNumConfirmationsRequired] = useState('');
    const [minInitialInvestment, setMinInitialInvestment] = useState('');

    const { contract } = useContract("0x01759CC46Fbc6753D27689E411A67278f01805f7");
    const { mutateAsync: createNewMirrorTable, isLoading } = useContractWrite(contract, "createNewMirrorTable")


    const { contract: ghoContract } = useContract("0xc4bf5cbdabe595361438f8c6a187bdc330539c60");
    const { mutateAsync: approve, isLoading: approveIsLoading } = useContractWrite(ghoContract, "approve")
    const { data: allowance, isLoading: allowanceIsLoading } = useContractRead(ghoContract, "allowance", [address, "0x01759CC46Fbc6753D27689E411A67278f01805f7"])
    console.log("allowance: ", allowance)

    const ghoAllowance = allowance ? ethers.utils.formatUnits(allowance, 18) : 0;
    console.log("allowance: ", ghoAllowance)

    const callApprove = async () => {
        try {
            toast.loading("Approving funds...")
            const data = await approve({ args: ["0x01759CC46Fbc6753D27689E411A67278f01805f7", `${minInitialInvestment}000000000000000000`] });
            console.info("contract call successs", data);
            toast.success("Funds approved!");

        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Contract call failed");
        }
    }

    const call = async () => {
        try {
            const data = await createNewMirrorTable({ args: [companyName, ticker, signers, numConfirmationsRequired, `${minInitialInvestment}000000000000000000`] });
            console.info("contract call successs", data);
            toast.success("Cap table created!");
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Contract call failed");
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

    const isFormValid = () => {
        return (
            companyName.trim() !== '' &&
            ticker.trim() !== '' &&
            signers.every(signer => signer.trim() !== '') &&
            numConfirmationsRequired.trim() !== '' &&
            minInitialInvestment.trim() !== ''
        );
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
                    <motion.input variants={childVariants} id="companyName" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)} />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="ticket" className="text-sm">Ticker (3-4 letters)</label>
                    <motion.input variants={childVariants} id="ticker" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" value={ticker}
                        onChange={(e) => setTicker(e.target.value)} />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="multisigSigners" className="text-sm">Initial multisig signers</label>
                    {signers.map((signer, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <motion.input
                                variants={childVariants}
                                type="text"
                                value={signer}
                                onChange={(e) => handleSignerChange(index, e)}
                                className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                            />
                            {index === signers.length - 1 && (
                                <button onClick={addSigner} className="p-2 text-white bg-blue-500 rounded">
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="multisigConfirmations" className="text-sm">Minimum number of multisig confirmations</label>
                    <motion.input variants={childVariants} id="multisigConfirmations" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" value={numConfirmationsRequired}
                        onChange={(e) => setNumConfirmationsRequired(e.target.value)} />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="minInitialInvestment" className="text-sm">Initial investment (in USD)</label>
                    <motion.input variants={childVariants} id="minInitialInvestment" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={minInitialInvestment}
                        onChange={(e) => setMinInitialInvestment(e.target.value)} />
                </motion.div>

                {
                    ghoAllowance < minInitialInvestment ?
                        <Web3Button
                            contractAddress="0xc4bF5CbDaBE595361438F8c6a187bDc330539c60"
                            action={(contract) => {
                                contract.call("approve", ["0x01759CC46Fbc6753D27689E411A67278f01805f7", `${minInitialInvestment}000000000000000000`])
                            }}
                        >
                            {approveIsLoading ? (
                                <div className='flex items-center space-x-2'>
                                    <span>
                                        Appoving
                                    </span>
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                "Approve GHO"
                            )}
                        </Web3Button>

                        :
                        <Web3Button
                            contractAddress="0x01759CC46Fbc6753D27689E411A67278f01805f7"
                            action={(contract) => {
                                contract.call("createNewMirrorTable", [companyName, ticker, signers, numConfirmationsRequired, minInitialInvestment])
                            }}
                        >
                            {isLoading ? (
                                <div className='flex items-center space-x-2'>
                                    <span>
                                        Creating
                                    </span>
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                "Create cap table"
                            )}
                        </Web3Button>
                }
            </motion.div>
        </>
    );
}

export default CreateCapTable