import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';


const ShowDeletedPurchases = () => {
    const [deletedPurchases, setDeletedPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeletedPurchases = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/deleted-purchases', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDeletedPurchases(response.data);
            } catch (error) {
                console.error('Error fetching deleted purchases data:', error);
                setError('Failed to fetch deleted purchases data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDeletedPurchases();
    }, []);

    if (loading) {
        return <div>Loading deleted purchases data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
        
            <div className="p-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Deleted Purchases Entries</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                             
                                <th className="px-6 py-3 text-left text-md text-gray-700">Deleted Date</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Party</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Deleted By</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Amount Paid</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Balance</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Entry Date</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Comment</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Components</th>
                         
                            </tr>
                        </thead>
                        <tbody>
                            {deletedPurchases.map((purchase, index) => (
                                <tr
                                    key={purchase.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    onClick={() => navigate(`/deleted-purchase/${purchase.id}`)}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                   
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.deletionDate}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.sellerParty || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.deletedByEmployee}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.amountPaid}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.balance}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{purchase.comment}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {purchase.componentNameList.join(', ')}
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowDeletedPurchases;
