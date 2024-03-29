import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ConnectKitButton } from 'connectkit'
import Navbar from '@/components/header'
import Head from 'next/head'
import pie from "../assets/icons/pie.svg"
import wallet from "../assets/icons/wallet.svg"
import alice from "../assets/icons/alice.png"
import { toast } from 'sonner'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head>
        <title>Ghothique</title>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ghothique.xyz" />
        <meta property="og:title" content="Ghothique" />
        <meta property="og:description" content="Web3 investments made simple." />
        <meta property="og:image" content="https://nftstorage.link/ipfs/bafkreic6vapgnpvmemyjnhpmrzh6ap3nlwerw47xkhhyqjlbqcwnklyrbi" />


        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@erikfazj" />
        <meta name="twitter:title" content="Ghothique" />
        <meta name="twitter:description" content="Web3 investments made simple." />
        <meta name="twitter:image" content="https://nftstorage.link/ipfs/bafkreic6vapgnpvmemyjnhpmrzh6ap3nlwerw47xkhhyqjlbqcwnklyrbi" />
      </Head>
      <main
        className={`flex min-h-[92dvh] flex-col space-y-6 md:space-y-12 items-center w-full bg-[#0b111b] justify-center p-6 md:p-24`}
      >
        <div className='space-y-1 md:space-y-4 text-center'>
          <h1 className='text-white text-2xl md:text-[50px] font-bold'>Investments made simple</h1>
          <h2 className='text-white text-lg md:text-[28px] font-light'>Own your cap table on-chain</h2>
        </div>
        <Link
          href='/dashboard'
          className="text-white border border-white rounded-2xl px-6 py-2 hover:bg-[#101827] text-sm md:text-lg font-light"
        >
          Start for free
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className='bg-[#232932] rounded-3xl w-full p-6 space-y-4 md:pr-24'>
            <Image src={pie} width={75} height={75} alt='pie chart' />
            <h3 className='text-white font-medium text-lg md:text-xl'>Create on-chain cap table</h3>
            <div className='space-y-2'>
              <p className="text-white font-light text-sm">
                Maintaining an up-to-date cap table may require too much resources.
              </p>
              <p className="text-white font-light text-sm">
                Web3 helps to make the process streamlined.
              </p>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='bg-[#232932] rounded-3xl w-full p-6 space-y-4 md:pr-24'>
              <Image src={alice} width={200} height={200} alt='pie chart' />
              <div className='space-y-2'>
                <h3 className='text-white font-medium text-lg md:text-xl'>Accept on-chain investments</h3>
                <div>
                  <p className="text-white font-light text-sm">
                    Maintaining an up-to-date cap table may require too much resources.
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-[#232932] rounded-3xl w-full p-6 space-y-4 md:pr-24'>
              <Image src={wallet} width={30} height={30} alt='pie chart' />
              <div className='space-y-2'>
                <h3 className='text-white font-medium text-lg md:text-xl'>Get on-chain RWA equity proof</h3>
                <div>
                  <p className="text-white font-light text-sm">
                    Maintaining an up-to-date cap table may require too much resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
