import React, { useState, useEffect } from 'react'
import api from '/src/API';
import { useParams, useNavigate } from 'react-router-dom';

function AftersubmitexpensesCheck({ ExpensesId }) {

    const [loading, setLoading] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        handleRowClick(ExpensesId);
    }, [ExpensesId])

    const handleRowClick = async (ExpensesId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await api.get(`/api/expenses/${ExpensesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setSelectedExpenses(response.data);
            // console.log(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching sale detail:', error);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpenses(null);
        navigate('/showExpenses');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            {isModalOpen && selectedExpenses && (
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
                         Expenses ADDED
                        </h2>
                        <div>
                            <table className="min-w-full bg-white border-y border-gray-300 ">
                                <tbody className='m-4'>

                                    <tr><td><strong>By Employee</strong></td><td>{selectedExpenses.employee.name}</td></tr>
                                    <tr><td><strong>Amount:</strong></td><td>₹{selectedExpenses.debit}</td></tr>
                                    <tr><td><strong>Date:</strong></td><td>{selectedExpenses.date}</td></tr>
                                    <tr><td><strong>Comment:</strong></td><td>{selectedExpenses.comment}</td></tr>
                                    
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

export default AftersubmitexpensesCheck