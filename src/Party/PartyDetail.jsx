import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '/src/API';

const PartyDetail = () => {
    const { id } = useParams(); // Extract the id from the URL
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartyDetail = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage

                const response = await api.get(`/api/party/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setParty(response.data); // Set the fetched party details
            } catch (error) {
                console.error('Error fetching party details:', error);
                setError('Failed to fetch party details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPartyDetail();
    }, [id]);

    if (loading) {
        return <div>Loading party details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
     
            <div className="p-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Party Details</h2>
                {party ? (
                    <div className="bg-white p-6 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-2">Party Name: {party.name}</h3>
                        <p><strong>Business Name:</strong> {party.businessName}</p>
                        <p><strong>City:</strong> {party.city}</p>
                        <p><strong>Type:</strong> {party.type}</p>
                        <p><strong>Balance:</strong> {party.balance}</p>
                        <p><strong>Contact:</strong> {party.contact}</p>
                        <p><strong>Address:</strong> {party.address}</p>
                        {/* Add more fields as required */}
                    </div>
                ) : (
                    <p>No details available for this party.</p>
                )}
            </div>
        </div>
    );
};

export default PartyDetail;
