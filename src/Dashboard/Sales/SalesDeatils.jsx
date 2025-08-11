import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import DeleteIcon from '@mui/icons-material/Delete';

import AllSales from './showAllSales';
export default function SaleDetails() {
    const { id } = useParams();
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSale, setSelectedSale] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                const response = await api.get(`/api/sales/party/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });

                setSale(response.data);
                console.log('Fetched sale details:', response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [id]);

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
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!sale) {
        return <div>No sale details available.</div>;
    }

    const handleDeleteById = async (id) => {
        // Show a confirmation dialog to the user
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return; // If the user cancels, exit the function
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://technofarm.in/api/sales/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                // Update the state to remove the deleted item from the UI
                setItems(prevItems => prevItems.filter(item => item.id !== id));
                alert("Item deleted successfully.");
                window.location.reload();
            } else {
                alert("Failed to delete item.");

            }
        } catch (error) {
            console.error("Error deleting item:", error);
            window.location.reload();
        }
    };
    return (
        <div>
            
   
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <span className="text-lg">Party: {sale.party.name}</span>
            </h2>
            <table className="min-w-full bg-white border border-gray-300 mb-6">
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>Date:</strong></td>
                        <td className="py-2 px-4">{sale.party.date}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>Business Name:</strong></td>
                        <td className="py-2 px-4">{sale.party.businessName}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>Mobile:</strong></td>
                        <td className="py-2 px-4">{sale.party.mobile}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>City:</strong></td>
                        <td className="py-2 px-4">{sale.party.city}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>Balance:</strong></td>
                        <td className="py-2 px-4">{sale.party.balance}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>Type:</strong></td>
                        <td className="py-2 px-4">{sale.party.type}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4"><strong>GST No:</strong></td>
                        <td className="py-2 px-4">{sale.party.gstNo}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4"><strong>Comment:</strong></td>
                        <td className="py-2 px-4">{sale.party.comment}</td>
                    </tr>
                </tbody>
            </table>


            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sales:</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="px-4 py-2 text-left border">Date</th>
                            <th className="px-4 py-2 text-left border">Paid</th>
                            <th className="px-4 py-2 text-left border">Tax Amount</th>
                            <th className="px-4 py-2 text-left border">Discount</th>
                            <th className="px-4 py-2 text-left border">Entry Balance</th>
                            <th className="px-4 py-2 text-left border">Old Balance</th>
                            <th className="px-4 py-2 text-left border">Net Amount</th>
                            <th className="px-4 py-2 text-left border">Comment</th>
                            <th className="px-4 py-2 text-left border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sale.sales.map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleRowClick(item.id)}
                            >
                                <td className="px-4 py-2 border">{item.dateFormat}</td>
                                <td className="px-4 py-2 border">{item.amountPaid}</td>
                                <td className="px-4 py-2 border">{item.taxAmount}</td>
                                <td className="px-4 py-2 border">{item.discount}</td>
                                <td className="px-4 py-2 border">{item.balance}</td>
                                <td className="px-4 py-2 border">
                                    {sale.lastBalance[index] !== undefined ? sale.lastBalance[index] : '-'}
                                </td>
                                <td className="px-4 py-2 border">{item.totalAmount}</td>
                                <td className="px-4 py-2 border">{item.comment}</td>
                                <td className="flex pl-1 border">
                                    <button onClick={(event) => {
                                        event.stopPropagation(); // Prevents the row click from firing
                                        handleDeleteById(item.id);
                                    }}>
                                        <DeleteIcon className='text-red-500' /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedSale && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(31, 41, 55, 0.5)",
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
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                            {selectedSale.salesParty.name} Sales Details
                        </h2>
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


                            {/* <h3 style={{ marginTop: "1rem", fontWeight: "bold", color: "green" }}>Product Details:</h3> */}
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
                        </div>
                    </div>
                )}

        </div>
      
        </div>
    );
}
