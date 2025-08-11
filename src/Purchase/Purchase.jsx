import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Unauthorized from '/src/NotAuthorided';
import AftersubmitPurachaseCheck from './AfterPurchase';


const ShowPurchase = () => {
    const [purchase, setPurchase] = useState([]);
    const [selectedPurchase, setSelectedPurchase] = useState(null); // State for selected purchase
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
  
useEffect(() => {
    setrole( JSON.parse(localStorage.getItem('user')).role);
}, [])

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/purchase', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPurchase(response.data.content);
            } catch (error) {
                setError('Failed to fetch purchase data.');
            } finally {
                setLoading(false);
            }
        };
        fetchPurchase();
    }, []);

    const handleDeleteById = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://technofarm.in/api/purchase/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
            });
            if (response.ok) {
                setPurchase(prev => prev.filter(item => item.id !== id));
                alert("Item deleted successfully.");
            } else {
                alert("Failed to delete item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const openModal = (purchase) => {
        setSelectedPurchase(purchase);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPurchase(null);
    };

    if (loading) return <div>Loading purchase data...</div>;
    if (error) return <div>{error}</div>;

    if (role!="DIRECTOR") {
        return <Unauthorized/>;
    }
    return (
        <div>
          
      
            <div className="p-4">
                <div className='flex' style={{ justifyContent: "space-between" }}>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Purchase Entries</h2>
                    <button className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600' onClick={() => navigate(`/AddPurchase`)}>
                        Add Purchase +
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Purchase Date</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Party Name</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Amount Paid</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Balance</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Paid By</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Comment</th>
                                <th className="px-4 py-2 text-left border">Actions</th>
                            </tr>
                        </thead>
                        <tbody className={'cursor-pointer'}>
                            {purchase.map((item, index) => (
                                <tr onClick={() => openModal(item)} key={item.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="px-6 py-4 text-sm text-gray-700"><strong>{index + 1}</strong></td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.sellerParty.name} {item.sellerParty.city}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.amountPaid}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.balance}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.paidByEmployee.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.comment}</td>
                                    <td className="flex pl-1 border">
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteById(item.id); }}>
                                            <DeleteIcon className='text-red-500' /> Delete
                                        </button>
                                        {/* <button onClick={() => openModal(item)}>View</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedPurchase && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(31, 41, 55, 0.5)", display: "flex",
                    justifyContent: "center", alignItems: "center", zIndex: 50,
                    width: "100%", overflowY: "auto", padding: "20px", borderRadius: "8px"
                }}>
                    <div style={{
                        backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem",
                        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", maxWidth: "38rem", width: "100%"
                    }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                            {selectedPurchase.sellerParty.name} Purchase Details
                        </h2>
                        <div>
                            <table className="min-w-full bg-white border-y border-gray-300 ">
                                <tbody className='m-4'>
                                    <tr>
                                        <td><strong>Padi By:</strong></td><td>{selectedPurchase.paidByEmployee.name}</td></tr>
                                    <tr>
                                        <td><strong>Party:</strong></td>
                                        <td>
                                            {selectedPurchase.sellerParty.name + " " +
                                                selectedPurchase.sellerParty.city + " " +
                                                (selectedPurchase.sellerParty.address == "NO" ? "" : selectedPurchase.sellerParty.address) + " " +
                                                (selectedPurchase.sellerParty.mobile == "NO" ? "" : selectedPurchase.sellerParty.mobile)}
                                        </td>
                                    </tr>

                                    <tr><td><strong>Amount Paid:</strong></td><td>{selectedPurchase.amountPaid}</td></tr>

                                    <tr><td><strong>Balance:</strong></td><td>{selectedPurchase.balance}</td></tr>

                                    <tr><td><strong>Comment:</strong></td><td>{selectedPurchase.comment}</td></tr>
                                    <tr><td><strong>Total Amount:</strong></td><td>{selectedPurchase.totalAmount}</td></tr>
                                    <tr><td><strong>Date:</strong></td><td>{selectedPurchase.date}</td></tr>
                                    {/* Add other purchase details as needed */}
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
                        <button onClick={closeModal} style={{
                            marginTop: "1rem", backgroundColor: "#3b82f6", color: "white",
                            padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer", border: "none"
                        }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowPurchase;
