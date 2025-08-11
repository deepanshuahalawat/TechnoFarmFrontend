import React, { useState, useEffect } from 'react'
import api from '/src/API';
import { useParams, useNavigate } from 'react-router-dom';

function AftersubmitPurchaseCheck({ purchaseid }) {

    const [loading, setLoading] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        handleRowClick(purchaseid);
    }, [purchaseid])

    const handleRowClick = async (purchaseid) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await api.get(`/api/purchase/${purchaseid}`, {
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
        navigate('/showPurchase');
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
                            Purchase ADDED
                        </h2>
                        <div>
                            <table className="min-w-full bg-white border-y border-gray-300 ">
                                <tbody className='m-4'>

                                    <tr><td><strong>Paid By Employee</strong></td><td>{selectedPurchase?.paidByEmployee?.userName}</td></tr>
                                    <tr><td><strong>Seller:</strong></td><td>{selectedPurchase?.sellerParty?.name}</td></tr>
                                    <tr><td><strong>Amount Paid:</strong></td><td>{selectedPurchase?.amountPaid}</td></tr>
                                    <tr><td><strong>Taxed:</strong></td><td>{selectedPurchase?.taxed}</td></tr> 
                                    <tr><td><strong>Total:</strong></td><td>{selectedPurchase?.totalAmount}</td></tr>
                                    <tr><td><strong>Balance:</strong></td><td>{selectedPurchase?.balance}</td></tr> 
                                    <tr><td><strong>comment:</strong></td><td>{selectedPurchase?.comment}</td></tr>
                                    <tr><td><strong>date:</strong></td><td>{selectedPurchase.date}</td></tr>
                         
                                </tbody>
                            </table>
                            <div className='mt-5'>
                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Components</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Quantity</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Price</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPurchase.compDetails.map((comp, index) => (
                                            <tr key={index} style={{ color: "green" }}>
                                                <td style={{ padding: "0.5rem" }}>{comp.component.name} {comp.component.value} {comp.component.pack} {comp.component.catagory}</td>

                                                <td style={{ padding: "0.5rem" }}>{comp.quantity}</td>
                                                <td style={{ padding: "0.5rem" }}>{comp.price}</td>
                                                <td style={{ padding: "0.5rem" }}>{comp.amount}</td>
                                            </tr>
                                        ))}

                                        
                                    </tbody>
                                </table>
                            </div>


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

export default AftersubmitPurchaseCheck