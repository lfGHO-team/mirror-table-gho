import React from 'react';

const TableData = [
    { investor: 'alice.eth', round: ['Seed', 'A', 'B'], shares: '420,000', ownership: '12%' },
    { investor: 'bobby.eth', round: ['Seed', 'A', 'B'], shares: '420,000', ownership: '12%' },
    { investor: 'anna.eth', round: ['Seed', 'A', 'B'], shares: '420,000', ownership: '12%' },
    { investor: 'antcapital.eth', round: ['Seed', 'A', 'B'], shares: '420,000', ownership: '12%' },
];

type NotesTableProps = {
    investors: string[];
}

const NotesTable = ({ investors }: NotesTableProps) => {
    return (
        <div className="border border-[#27272A] text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Latest issued notes links</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className='text-[#A1A1AA]'>
                            <th className="text-left font-medium p-2">Investor</th>
                            <th className="text-left font-medium p-2">Round</th>
                            <th className="text-left font-medium p-2">Shares</th>
                            <th className="text-left font-medium p-2">Ownership</th>
                            <th className="p-2"></th> {/* This is for the arrow column */}
                        </tr>
                    </thead>
                    <tbody>
                        {TableData.map((data, index) => (
                            <>
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="p-2">{data.investor}</td>
                                    <td className="p-2">
                                        {data.round.map((round, index) => (
                                            <span key={index} className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 ${round === 'Seed' ? 'bg-[#00A962]' : round === 'A' ? 'bg-[#DA2591]' : 'bg-[#2F3DBC]'}`}>
                                                {round}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="p-2">{data.shares}</td>
                                    <td className="p-2">{data.ownership}</td>
                                    <td className="p-2 text-right">
                                        <button>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path></svg>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NotesTable;