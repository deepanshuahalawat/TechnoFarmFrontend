import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';

import AllSales from './showAllSales';

const ShowSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSales = async () => {
            try {
                // Retrieve the JWT token from localStorage
                const token = localStorage.getItem('token');

                // Make the request with the Authorization header
                const response = await api.get('/api/sales', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSales(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
                setError('Failed to fetch sales data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <div>Loading sales data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    // 

    const handleRowClick = (id) => {
        navigate(`/sale/party/${id}`);
    };
    return (
        
       <div>
  
         <div className="p-4">
       <div className='flex' style={{justifyContent:"space-between"}}>
       <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sales List</h2>
       {/* <button className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600' onClick={()=>{navigate(`/addSale`)}} >
        Add sales +
       </button> */}
       </div>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-300 font-bold">
                    <tr>
                        <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                        <th className="px-6 py-3 text-left text-md text-gray-700">Party</th>
                        <th className="px-6 py-3 text-left text-md text-gray-700">Business Name</th>
                        <th className="px-6 py-3 text-left text-md text-gray-700">Mobile</th>
                        <th className="px-6 py-3 text-left text-md text-gray-700">City</th>
                        <th className="px-6 py-3 text-left text-md text-gray-700">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr
                            key={sale.id}
                            className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                            onClick={() => handleRowClick(sale.id)}
                        >
                            <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{sale.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{sale.businessName}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{sale.mobile}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{sale.city}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{sale.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    {/* <AllSales/> */}
       </div>
    );
};

export default ShowSales;
