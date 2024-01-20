import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type CapTableProps = {
    onClose: () => void;
};

const CapTable = ({ onClose }: CapTableProps) => {

    const onBackgroundClick = (event: { currentTarget: any; target: any; }) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    useEffect(() => {
        const onKeyPress = (event: { key: string; }) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onKeyPress);

        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    }, [onClose]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onBackgroundClick}
            tabIndex={-1}
            className='fixed inset-0 bg-[#6E6E6E4D] bg-opacity-50 flex items-center justify-center z-50 px-6 md:px-0'>
            <div

                onClick={(e) => e.stopPropagation()} // Prevent click through to the background
                className={`p-6 z-50 bg-[#0B111B] rounded-3xl md:py-8 md:px-24`}>
                <div className="space-y-8 w-full flex flex-col items-center">
                    <h3 className="text-lg leading-6 font-medium text-white md:text-3xl text-center">Confirm 1/2 transactions</h3>
                    <div className="max-w-lg">
                        <p className="font-light text-gray-300">
                            To create a cap table you have to cofirm 2 transactions that initiate creation of the vault smart contract.
                        </p>
                        <p className="font-light text-gray-300 mt-4">
                            We do not charge a fee on creating a vault. You will have to pay a gas fee for the transactions.
                        </p>
                    </div>
                    <Link href={"/"} className="px-4 py-2 text-center text-white font-light hover:font-medium transition-all duration-300 text-xl rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ">
                        Confirm →
                    </Link>
                </div>
                <div className="absolute top-0 right-0 p-4">
                    <button
                        className="text-white bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={onClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default CapTable