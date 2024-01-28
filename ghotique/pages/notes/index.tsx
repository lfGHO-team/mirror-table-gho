import React from 'react';

const Notes = () => {
    return (
        <div className='text-white p-4 rounded-lg shadow-md md:max-w-screen-xl md:mx-auto'>
            <h3 className='text-2xl font-semibold mb-4'>
                How Our Demo Works
            </h3>
            <p className='text-md mb-3 text-sm'>
                Our system streamlines investment flows via web3 technology, providing a seamless and efficient experience for both investors and founders.
            </p>
            <ol className='list-decimal pl-5 mb-4 text-sm'>
                <li>Get your test GHO stablecoin from official aave faucet links. (we&apos;re using Sepolia!)</li>
                <li>Come to Ghothique and go to the section <span className='underline'>create cap table</span>.</li>
                <li>Investors need to be whitelisted in the smart contract by one of the multisig signers via the <span className='underline'>issue equity</span> feature</li>
                <li>Investors receive digital assets (erc20) representing their shares.</li>
                <li>Data is pulled from on-chain sources for user-friendly display to both founders and investors.</li>
                <li>Inverstors can exit their positions torally or partially whenever they want.</li>
                <li>For founders to withdraw, they need to meet the multisig criteria set for the vault</li>
            </ol>
            <h4 className='text-xl font-semibold mb-2'>Key Components of Our System:</h4>
            <ul className='list-disc pl-5 text-sm'>
                <li>GHO ERC-4626 Vaults for on-chain cap table management and investment acceptance.</li>
                <li>On-chain equity issuance through fund deposits and transfer of RWA digital assets representing shares.</li>
                <li>Multisig for project fund withdrawals (arbitrary transactions).</li>
                <li>Investor exit options through share burning and fund (and profit) retrieval from the vault treasury.</li>
            </ul>
            <h4 className='text-xl font-semibold mb-2 mt-4'>Why GHO?</h4>
            <p className='text-sm'>
                GHO stablecoins are preferred for investments due to their lower volatility compared to other cryptocurrencies like Ethereum or Bitcoin.
            </p>
            <p className='text-sm'>
                While we&apos;re open to using different stablecoins, GHO and Vaults are used in our Proof of Concept (PoC) as an ideal example for fundraising in the system.
            </p>
        </div>
    )
}

export default Notes;
