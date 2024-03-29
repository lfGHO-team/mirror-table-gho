import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAccount } from "wagmi";
import { ConnectKitButton } from 'connectkit';
import ghothique from "../assets/logos/ghothique.svg"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';


const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'Funds vault', href: '/vaults', current: false },
    { name: 'Notes', href: '/notes', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <Disclosure as="nav" className="bg-[#0b111b] sticky top-0">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 py-1 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center  sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    {/* <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    /> */}
                                    <Link href='/' className='hidden md:flex'>
                                        <Image src={ghothique} width={125} height={125} alt='ghothique logo' />
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                                {/* <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}
                                <ConnectKitButton theme='midnight' />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden absolute top-14 bg-[#0b111b] w-full">
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: .1 }}
                            exit={{ opacity: 0, y: -100 }}
                            className="space-y-1 px-2 pb-3 pt-2">
                            <div className='p-2'>
                                <Link href='/' className='md:hidden'>
                                    <Image src={ghothique} width={100} height={100} alt='ghothique logo' />
                                </Link>
                            </div>
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </motion.div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
