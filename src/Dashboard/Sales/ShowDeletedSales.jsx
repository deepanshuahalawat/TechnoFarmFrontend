import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';
// import NavbarT
const ShowDeletedSales = () => {
    const [deletedSales, setDeletedSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeletedSales = async () => {
            try {
                // Retrieve the JWT token from localStorage
                const token = localStorage.getItem('token');

                // Make the request with the Authorization header
                const response = await api.get('/api/deleted-sales', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDeletedSales(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching deleted sales data:', error);
                setError('Failed to fetch deleted sales data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDeletedSales();
    }, []);

    if (loading) {
        return <div>Loading deleted sales data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (

      <div>
     
        <div className="p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Deleted Sales Entries</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-300 font-bold">
                        <tr>
                            <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">ID</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Deleted Date</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Party</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Deleted By</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Amount Paid</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Balance</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Entry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedSales.map((sale, index) => (
                            <tr
                                key={sale.id}
                                className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                onClick={() => navigate(`/deleted-sale/${sale.id}`)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.party}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.deletedBy}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.amountPaid}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.balance}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{sale.entrydate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
};

export default ShowDeletedSales;
