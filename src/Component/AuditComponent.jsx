import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const AuditComponent = () => {
    const { id } = useParams();
    const [component, setComponent] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComponent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/api/component/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setComponent(response.data);
            } catch (error) {
                console.error('Error fetching component data:', error);
                setError('Failed to fetch component data.');
            } finally {
                setLoading(false);
            }
        };

        fetchComponent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            const quantityValue = parseInt(quantity);
            
            const requestBody = {
                componentId: id,
                action: quantityValue >= 0 ? "ADDED" : "SUBTRACTED",
                quantity: Math.abs(quantityValue).toString()
            };

            await api.post('/api/component/audit', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess(true);
            setTimeout(() => {
                navigate(-1); // Go back to previous page after successful audit
            }, 1500);
        } catch (error) {
            console.error('Error auditing component:', error);
            setError('Failed to audit component. Please try again.');
        }
    };

    if (loading) {
        return <div className="p-4">Loading component data...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Audit Component</h2>
            
            {component && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">{component.name} Details</h3>
                    <table className="min-w-full bg-white border-y border-gray-300">
                        <tbody>
                            <tr><td className="py-2"><strong>ID:</strong></td><td className="py-2">{component.id}</td></tr>
                            <tr><td className="py-2"><strong>Name:</strong></td><td className="py-2">{component.name}</td></tr>
                            <tr><td className="py-2"><strong>Category:</strong></td><td className="py-2">{component.catagory}</td></tr>
                            <tr><td className="py-2"><strong>Current Stock:</strong></td><td className="py-2">{component.stock}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        Component audited successfully!
                    </div>
                )}

                <div className="mb-4">
                    <TextField
                        label="Quantity Change"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        helperText="Enter positive number to add, negative to subtract"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit Audit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuditComponent;