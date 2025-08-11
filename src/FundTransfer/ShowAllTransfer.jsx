import React, { useEffect, useState } from 'react';
import api from '/src/API'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const ShowFundTransfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [role, setRole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('user')).userName);

    useEffect(() => {
        setRole(JSON.parse(localStorage.getItem('user')).role);
        setUserName(JSON.parse(localStorage.getItem('user')).userName);
    }, []);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/transfer', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransfers(response.data);
            } catch (error) {
                console.error('Error fetching transfer data:', error);
                setError('Failed to fetch transfer data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTransfers();
    }, []);

    if (loading) return <div>Loading transfer data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
       
            <div className="p-4">
                
                <div className='flex justify-between mb-4'>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Fund Transfers</h2>
                    <button
                        className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600'
                        onClick={() => navigate(`/AddFundTransfers`)}
                    >
                        Transfer money
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                {['No.', 'Date', 'Amount', 'Source Employee', 'Target Employee', 'Comment'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-md text-gray-700">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map((transfer, index) => (
                                <tr
                                    key={transfer.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(transfer.transferDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{transfer.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{transfer.sourceEmployee.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{transfer.targetEmployee.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{transfer.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowFundTransfers;
