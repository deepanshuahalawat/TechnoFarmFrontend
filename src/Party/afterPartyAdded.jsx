import React, { useState, useEffect } from 'react'
import api from '/src/API';
import { useParams, useNavigate } from 'react-router-dom';

function AftersubmitPartyCheck({ partyId }) {

    const [loading, setLoading] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        handleRowClick(partyId);
    }, [partyId])

    const handleRowClick = async (partyId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await api.get(`/api/party/${partyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setSelectedPurchase(response.data);
            console.log(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching sale detail:', error);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPurchase(null);
        navigate('/ShowPArty');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            {isModalOpen && selectedPurchase && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "#E4F6E4", display: "flex",
                    justifyContent: "center", alignItems: "center", zIndex: 50,
                    width: "100%", overflowY: "auto", padding: "20px", borderRadius: "8px"
                }}>
                    <div style={{
                        backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem",
                        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", maxWidth: "38rem", width: "100%"
                    }}>
                         <h2 className='text-green-700' style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                            Party ADDED
                        </h2>
                        <div>
                            <table className="min-w-full bg-white border-y border-gray-300 ">
                                <tbody className='m-4'>

                                    <tr><td><strong>name</strong></td><td>{selectedPurchase.amountPaid}</td></tr>
                                    <tr><td><strong>city:</strong></td><td>{selectedPurchase.city}</td></tr>
                                    <tr><td><strong>businessName:</strong></td><td>{selectedPurchase.businessName}</td></tr>
                                    <tr><td><strong>type:</strong></td><td>{selectedPurchase.type}</td></tr>

                                    <tr><td><strong>shopNo:</strong></td><td>{selectedPurchase.shopNo}</td></tr>
                                    <tr><td><strong>address</strong></td><td>{selectedPurchase.address}</td></tr>
                                    <tr><td><strong>date:</strong></td><td>{selectedPurchase.date}</td></tr>
                                    <tr><td><strong>gstNo:</strong></td><td>{selectedPurchase.gstNo}</td></tr>
                                    <tr><td><strong>paymentRating:</strong></td><td>{selectedPurchase.paymentRating}</td></tr>
                                    <tr><td><strong>salesRating:</strong></td><td>{selectedPurchase.salesRating}</td></tr>
                                    <tr><td><strong>comment:</strong></td><td>{selectedPurchase.comment}</td></tr>
                                    <tr><td><strong>Balance:</strong></td><td>{selectedPurchase.balance}</td></tr>
                                    {/* Add other purchase details as needed */}
                                </tbody>
                            </table>

                        </div>
                        <div className='flex justify-between'>
                            <button
                                style={{
                                    marginTop: "1rem",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.25rem",
                                    cursor: "pointer",
                                    border: "none"
                                }}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <h1 className=' text-2xl pt-3 font-bold text-green-600'>
                               
                                SUCCESS
                            </h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AftersubmitPartyCheck