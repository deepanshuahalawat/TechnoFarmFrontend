import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '/src/API';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    setLoading(false);
                    return;
                }
                if (!id) {
                    console.error("No employee ID provided.");
                    return;
                }
                const response = await api.get(`/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
                setEmployee(response.data);
            } catch (error) {
                setError("Error fetching employee data.");
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployeeData();
    }, [id]);

    if (loading) return <p className="text-center text-gray-600 mt-4">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
    if (!employee) return <p className="text-center text-gray-600 mt-4">Employee data not found.</p>;

    return (
        <div >
        
          
            {/* <div className="mb-6">
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
                <p><strong>Mobile:</strong> {employee.mobile}</p>
                <p><strong>Address:</strong> {employee.address}</p>
                <p><strong>Employee ID:</strong> {employee.empId}</p>
                <p><strong>Role:</strong> {employee.role}</p>
                <p><strong>Date of Joining:</strong> {employee.doj}</p>
                <p><strong>Username:</strong> {employee.userName}</p>
                <p><strong>Active:</strong> {employee.active ? 'Yes' : 'No'}</p>
                <p><strong>Monthly Salary:</strong> {employee.monthlySalary}</p>
            </div> */}

            <h1 className="text-3xl font-semibold mt-6 mb-2 ml-2">Employee Account Transactions of {employee.name}</h1>
            <div className="overflow-x-auto p-6">
                {employee.empAccount && employee.empAccount.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                {/* <th className="px-4 py-2 text-left  text-gray-700">ID</th> */}
                                <th className="px-4 py-2 text-left  text-gray-700">Credit</th>
                                <th className="px-4 py-2 text-left  text-gray-700">Debit</th>
                                <th className="px-4 py-2 text-left  text-gray-700">Source</th>
                                <th className="px-4 py-2 text-left  text-gray-700">Date</th>
                                <th className="px-4 py-2 text-left  text-gray-700">Balance</th>
                                <th className="px-4 py-2 text-left  text-gray-700">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.empAccount.map((transaction, index) => (
                                <tr key={transaction.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    {/* <td className="px-4 py-2  text-gray-700">{transaction.id}</td> */}
                                    <td className="px-4 py-2  text-gray-700">{transaction.credit}</td>
                                    <td className="px-4 py-2  text-gray-700">{transaction.debit}</td>
                                    <td className="px-4 py-2  text-gray-700">{transaction.source}</td>
                                    <td className="px-4 py-2  text-gray-700">{transaction.date}</td>
                                    <td className="px-4 py-2  text-gray-700">{transaction.balance}</td>
                                    <td className="px-4 py-2  text-gray-700">{transaction.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600 mt-4">No transactions available.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetails;
