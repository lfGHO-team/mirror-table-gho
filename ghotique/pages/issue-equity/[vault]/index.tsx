import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCopy } from "react-icons/fa";
import { Web3Button, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';

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

const IssueEquity = () => {

    const router = useRouter();
    const { vault } = router.query;

    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [agreementType, setAgreementType] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investorsAddress, setInvestorsAddress] = useState('');
    const [receiversAddress, setReceiversAddress] = useState('');
    const [amountOfShares, setAmountOfShares] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [open, setOpen] = useState(false);

    const { contract } = useContract(vault as string);
    const { mutateAsync: addInvestor, isLoading } = useContractWrite(contract, "addInvestor")
    const { data: name } = useContractRead(contract, "name", [])

    const call = async () => {
        try {
            const data = await addInvestor({ args: [investorsAddress] });
            console.info("contract call successs", data);
            toast.success('Investor added!')
        } catch (err) {
            console.error("contract call failure", err);
            toast.error('Something went wrong!')
        }
    }

    const { data: accreditedInvestor, isLoading: checkInvestorLoading } = useContractRead(contract, "accreditedInvestor", [investorsAddress])


    const generateLink = () => {
        const queryParams = new URLSearchParams({
            companyName: encodeURIComponent(name),
            companyAddress: encodeURIComponent(vault as string),
            agreementType: encodeURIComponent(agreementType),
            investmentAmount: encodeURIComponent(investmentAmount),
            investorsAddress: encodeURIComponent(investorsAddress),
        }).toString();

        const link = `https://ghothique.xyz/invest/${vault}?${queryParams}`;
        setGeneratedLink(link);
    };


    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 pb-0 text-white rounded-lg flex flex-col md:flex-row md:space-x-8 mx-auto max-w-2xl md:py-0 md:pt-6 md:items-center"
            >
                <motion.div variants={childVariants} className="flex flex-col md:items-start space-y-2 md:space-y-1 mb-4">
                    <motion.div variants={childVariants} className="rounded-full bg-[#2F3DBC] w-8 h-8 flex items-center justify-center text-white mr-2">1</motion.div>
                    <span className='text-xs md:text-sm'>Add your investor&apos;s details</span>
                </motion.div>
                <motion.div variants={childVariants} className="hidden md:block">
                    <FaLongArrowAltRight size={30} />
                </motion.div>
                <motion.div variants={childVariants} className="flex flex-col md:items-start space-y-2 md:space-y-1 mb-4">
                    <motion.div variants={childVariants} className="rounded-full bg-[#2F3DBC] w-8 h-8 flex items-center justify-center text-white mr-2">2</motion.div>
                    <span className='text-xs md:text-sm'>Send a link to the investor</span>
                </motion.div>
                <motion.div variants={childVariants} className="hidden md:block">
                    <FaLongArrowAltRight size={30} />
                </motion.div>
                <motion.div variants={childVariants} className="flex flex-col md:items-start space-y-2 md:space-y-1 mb-4">
                    <motion.div variants={childVariants} className="rounded-full bg-[#2F3DBC] w-8 h-8 flex items-center justify-center text-white mr-2">3</motion.div>
                    <span className='text-xs md:text-sm'>Receive a payment and data into your cap table</span>
                </motion.div>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="p-6 text-white rounded-lg max-w-md mx-auto md:py-2"
            >
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Company name</label>
                    <motion.input variants={childVariants} id="companyName" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={name}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyAddress" className="text-sm">Company address</label>
                    <motion.input variants={childVariants} id="companyAddress" type="text" className="w-full bg-[#0b111b] border border-[#D1D5DB] rounded-lg text-xs p-3"
                        value={vault}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="agreementType" className="text-sm">Agreement type</label>
                    <motion.input variants={childVariants} id="agreementType" type="select" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={agreementType}
                        onChange={(e) => setAgreementType(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="investmentAmount" className="text-sm">Investment amount (in GHO)</label>
                    <motion.input variants={childVariants} id="investmentAmount" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="investorsAddress" className="text-sm">Inverstor&apos;s address</label>
                    <motion.input variants={childVariants} id="investorsAddress" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={investorsAddress}
                        onChange={(e) => setInvestorsAddress(e.target.value)}
                    />
                </motion.div>
                {/* <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="receiversAddress" className="text-sm">Receiver&apos;s addess (project&apos;s wallet address)</label>
                    <motion.input variants={childVariants} id="receiversAddress" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={investorsAddress}
                        disabled
                    />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="amountOfShares" className="text-sm">Amount of shares</label>
                    <motion.input variants={childVariants} id="amountOfShares" type="number" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg"
                        value={amountOfShares}
                        onChange={(e) => setAmountOfShares(e.target.value)}
                    />
                </motion.div> */}
                {
                    accreditedInvestor ?
                        <motion.button
                            variants={childVariants}
                            className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-base font-light mx-auto mt-2"
                            onClick={() => {
                                generateLink()
                                setOpen(true)
                            }
                            }
                        >
                            Generate link
                        </motion.button> :
                        // <motion.button
                        //     variants={childVariants}
                        //     className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-base font-light mx-auto mt-2"
                        //     onClick={call
                        //     }
                        // >
                        //     {isLoading ? (
                        //         <div className='flex items-center space-x-2'>
                        //             <span>
                        //                 Adding investor
                        //             </span>
                        //             <div className="spinner"></div>
                        //         </div>
                        //     ) : (
                        //         "Add investor"
                        //     )}
                        // </motion.button>
                        <Web3Button
                            contractAddress={vault as string}
                            action={(contract) => {
                                contract.call("addInvestor", [investorsAddress])
                            }}
                        >
                            Add Investor
                        </Web3Button>

                }
            </motion.div>
            <AnimatePresence>

                {
                    open &&
                    // modal with generated link with copy icon
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        tabIndex={-1}
                        className='fixed inset-0 bg-[#6E6E6E4D] bg-opacity-50 flex items-center justify-center z-50 px-6 md:px-0 '>
                        <div
                            className={`p-6 z-50 bg-[#0B111B] rounded-3xl md:py-8 relative max-w-lg`}>
                            <h3 className="text-lg leading-6 font-medium text-white md:text-3xl text-center mb-8">Link generated</h3>
                            <p className='text-sm text-[#A1A1AA] text-center'>Share the link with the investor to receive the payment</p>
                            <div className="flex items-center justify-between mt-4 space-x-2 border rounded-2xl p-2 w-full">
                                <p className='text-sm text-white overflow-x-scroll'>{generatedLink}</p>
                                <FaRegCopy color='white' size={20}
                                    onClick={() => { navigator.clipboard.writeText(generatedLink); toast.success('Copied to clipboard!') }}
                                    className='cursor-pointer w-full'
                                />
                            </div>
                            <div className='w-full flex justify-center mt-4 items-center space-x-2'>
                                <button className='text-white text-center font-light' onClick={() => setOpen(false)}>Done</button>
                                <FaArrowRight color='white' size={14} />
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};

export default IssueEquity;
