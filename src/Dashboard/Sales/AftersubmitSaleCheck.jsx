import React, { useState, useEffect } from 'react'
import api from '/src/API';
import { useParams, useNavigate } from 'react-router-dom';

function AftersubmitSaleCheck({ saleId }) {

    const [loading, setLoading] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        handleRowClick(saleId);
    }, [saleId])

    const handleRowClick = async (saleId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await api.get(`/api/sales/${saleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setSelectedSale(response.data);
            console.log(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching sale detail:', error);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSale(null);
        navigate('/Showsales');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            {isModalOpen && selectedSale && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#E4F6E4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50,
                    width: "100%",
                    overflowY: "auto",
                    padding: "20px", // Optional: add some padding
                    borderRadius: "8px", // Optional: round the corners

                }}>
                    <div style={{
                        backgroundColor: "white",
                        marginTop: 100,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                        maxWidth: "38rem",
                        width: "100%"
                    }}>
                        <h3 style={{ fontWeight: "bold", color: "green" }}>Sale Added:</h3>
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Sale By:</strong></td>
                                        <td className="py-2 px-4">{selectedSale.saleByEmployee.firstName} {selectedSale.saleByEmployee.lastName}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Amount Paid:</strong></td>
                                        <td className="py-2 px-4">{selectedSale.amountPaid}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Balance:</strong></td>
                                        <td className="py-2 px-4">{selectedSale.balance}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Sale Amount:</strong></td>
                                        <td className="py-2 px-4">
                                            <span className='text-green-700 font-bold'>{selectedSale.saleAmount}</span>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Replacement Amount:</strong></td>
                                        <td className="py-2 px-4">
                                            <span className='text-red-500 font-bold'>{selectedSale.replacementAmount}</span>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4"><strong>Total Amount:</strong></td>
                                        <td className="py-2 px-4">{selectedSale.totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4"><strong>Date:</strong></td>
                                        <td className="py-2 px-4">{selectedSale.date}</td>
                                    </tr>
                                </tbody>
                            </table>


                          
                            <div className='mt-5'>
                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Product sell</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Quantity</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Price</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSale.productDetails.map((product, index) => (
                                            <tr key={index} style={{ color: "green" }}>
                                                <td style={{ padding: "0.5rem" }}>{product.product.name}</td>
                                                <td style={{ padding: "0.5rem" }}>{product.quantity}</td>
                                                <td style={{ padding: "0.5rem" }}>{product.price}</td>
                                                <td style={{ padding: "0.5rem" }}>{product.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* <h3 style={{ marginTop: "1rem", fontWeight: "bold", color: "red" }}>Replacement Details:</h3> */}
                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Replacement</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Quantity</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Price</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSale.replacement.map((replacement, index) => (
                                            <tr key={index} style={{ color: "red" }}>
                                                <td style={{ padding: "0.5rem" }}>{replacement.product.name}</td>
                                                <td style={{ padding: "0.5rem" }}>{replacement.quantity}</td>
                                                <td style={{ padding: "0.5rem" }}>{replacement.price}</td>
                                                <td style={{ padding: "0.5rem" }}>{replacement.amount}</td>

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

export default AftersubmitSaleCheck