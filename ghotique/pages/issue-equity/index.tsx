import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { FaLongArrowAltRight } from 'react-icons/fa';

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
                    <motion.input variants={childVariants} id="companyName" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Agreement type</label>
                    <motion.input variants={childVariants} id="agreementType" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Investment amount</label>
                    <motion.input variants={childVariants} id="investmentAmount" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Inverstor&apos;s address</label>
                    <motion.input variants={childVariants} id="investorsAddress" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Receiver&apos;s addess (project&apos;s wallet address)</label>
                    <motion.input variants={childVariants} id="receiversAddress" type="text" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.div variants={childVariants} className="mb-4 space-y-2">
                    <label htmlFor="companyName" className="text-sm">Amount of shares</label>
                    <motion.input variants={childVariants} id="amountOfShares" type="number" className="w-full p-2 bg-[#0b111b] border border-[#D1D5DB] rounded-lg" />
                </motion.div>
                <motion.button
                    variants={childVariants}
                    className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-base font-light mx-auto mt-2"
                    onClick={() => toast.info("Coming soon!")}
                >
                    Generate link
                </motion.button>
            </motion.div>
        </>
    );
};

export default IssueEquity;
