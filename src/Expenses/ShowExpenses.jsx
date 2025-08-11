import React, { useEffect, useState } from 'react';
import api from '/src/API'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [role, setRole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('user')).userName);

    useEffect(() => {
        setRole(JSON.parse(localStorage.getItem('user')).role);
        setUserName(JSON.parse(localStorage.getItem('user')).userName);
    }, []);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/expenses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError('Failed to fetch expenses data.');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const handleDeleteById = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://test.technofarm:9090/api/expenses/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (response.ok) {
                setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
                alert("Expense deleted successfully.");
            } else {
                alert("Failed to delete expense.");
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    if (loading) return <div>Loading expenses data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
   
            <div className="p-4">
                <div className='flex justify-between mb-4'>
                    <h2 className="text-3xl font-semibold text-gray-800">Expenses</h2>
                    <button
                        className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600'
                        onClick={() => navigate(`/AddExpenses`)}
                    >
                        Add Expense +
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                {['No.',  'Date',  'Amount',  'Comment', 'By Employee','Action'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-md text-gray-700">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <tr
                                    key={expense.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{expense.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{expense.debit}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{expense.comment}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{expense.employee?.name ?? 'Unknown'}</td>

                                    {role === "DIRECTOR" &&
                                        <td className="flex pl-1 border">
                                            <button onClick={(event) => {
                                                event.stopPropagation();
                                                handleDeleteById(expense.id);
                                            }}>
                                                <DeleteIcon className='text-red-500' /> Delete
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowExpenses;
