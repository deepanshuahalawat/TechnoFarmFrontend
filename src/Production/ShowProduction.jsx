import React, { useEffect, useState } from 'react';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AftersubmitProductionCheck from './AfterProductAdd';

const ShowProduction = () => {
    const [production, setproduction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, SetUsername] = useState(JSON.parse(localStorage.getItem('user')).userName);
    useEffect(() => {
        setrole(JSON.parse(localStorage.getItem('user')).role);
        SetUsername(JSON.parse(localStorage.getItem('user')).userName);
    }, [])

    // Fetch production from the API when the component mounts
    useEffect(() => {
        const fetchproduction = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/production', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setproduction(response.data.content);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchproduction();
    }, []);

    // Handle product deletion
    const handleDeleteById = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://technofarm.in/api/production/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                // Remove the deleted product from the state
                setproduction((prevproduction) => prevproduction.filter(product => product.id !== id));
                alert("Item deleted successfully.");
            } else {
                alert("Failed to delete item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Loading and error states
    if (loading) return <div>Loading product data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
          
            <div className="p-4">
                <div className='flex justify-between mb-4'>
                    <h2 className="text-3xl font-semibold text-gray-800">Production Product</h2>
                    <button
                        className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600'
                        onClick={() => navigate(`/AddProduction`)}
                    >
                        Add Production +
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                {['No.', 'Product Name', 'By Employee', 'Date', 'Quantity', 'Comment', 'Actions'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-md text-gray-700">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {production.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                // onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.product.name ?? 'Unknown'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.employeeDTO?.name ? item.employeeDTO.name : 'Unknown'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.date ?? 'N/A'}</td>

                                    <td className="px-6 py-4 text-sm text-gray-700">{item.quantity ?? 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.comment ?? 'No comments'}</td>

                                    {/* {role != "DIRECTOR" && userName == employee.userName &&
                                        <td className="flex pl-1 border">
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            handleDeleteById(item.id);
                                        }}>
                                            <DeleteIcon className='text-red-500' /> Delete
                                        </button>
                                    </td>} */}
                                    {role == "DIRECTOR" &&
                                        <td className="flex pl-1 border">
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            handleDeleteById(item.id);
                                        }}>
                                            <DeleteIcon className='text-red-500' /> Delete
                                        </button>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowProduction;
