import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

import { TextField, Autocomplete, Button } from '@mui/material';
import Unauthorized from '/src/NotAuthorided';

const ShowEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, SetUsername] = useState(JSON.parse(localStorage.getItem('user')).userName);
    useEffect(() => {
        setrole(JSON.parse(localStorage.getItem('user')).role);
        SetUsername(JSON.parse(localStorage.getItem('user')).userName);
    }, [])


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/employee', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data);
                setFilteredEmployees(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError('Failed to fetch employee data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = employees.filter((employee) =>
            employee.firstName.toLowerCase().includes(value.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    const handleRowClick = async (employeeId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/api/employee/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setSelectedEmployee(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching employee detail:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading employee data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
      
            <div className="p-4">
                <div className='flex justify-between'>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Employees</h2>
                    {role=='DIRECTOR' &&  <button className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600' onClick={() => { navigate(`/AddEmployee`) }} >
                        Add Employee +
                    </button>
                    }
                </div>

                <TextField
                    label="Search by First or Last Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    margin="normal"
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 mt-4">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Name</th>

                                <th className="px-6 py-3 text-left text-md text-gray-700">Role</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">salary</th>

                                <th className="px-6 py-3 text-left text-md text-gray-700">Mobile</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Info.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, index) => (
                                <tr
                                    key={employee.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    onClick={() => handleRowClick(employee.id)}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{`${employee.firstName} ${employee.lastName}`}</td>

                                    <td className="px-6 py-4 text-sm text-gray-700">{employee.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{employee.monthlySalary} </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">{employee.mobile}</td>
                                    {role != "DIRECTOR" && userName == employee.userName &&
                                        <td className="  ">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    navigate(`/EmployeeDetails/${employee.id}`);
                                                }}
                                                sx={{
                                                    textTransform: 'none',
                                                    padding: '6px 16px',
                                                    fontWeight: 'bold',
                                                    borderRadius: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#1565c0',
                                                    },
                                                }}
                                            >
                                                Account
                                            </Button>
                                        </td>}

                                    {role == "DIRECTOR" &&
                                        <td className="  ">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    navigate(`/EmployeeDetails/${employee.id}`);
                                                }}
                                                sx={{
                                                    textTransform: 'none',
                                                    padding: '6px 16px',
                                                    fontWeight: 'bold',
                                                    borderRadius: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#1565c0',
                                                    },
                                                }}
                                            >
                                                Account
                                            </Button>
                                        </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredEmployees.length === 0 && (
                        <p className="text-center text-gray-600 mt-4">No employees found matching the search criteria.</p>
                    )}
                </div>

                {isModalOpen && selectedEmployee && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h2 className="text-xl font-bold mb-4">{selectedEmployee.name} Details</h2>

                            <div>
                                <table className="min-w-full bg-white border-y border-gray-300">
                                    <tbody>
                                        <tr><td><strong>ID:</strong></td><td>{selectedEmployee.id}</td></tr>
                                        <tr><td><strong>Name:</strong></td><td>{selectedEmployee.name}</td></tr>
                                        <tr><td><strong>Mobile:</strong></td><td>{selectedEmployee.mobile}</td></tr>
                                        <tr><td><strong>Address:</strong></td><td>{selectedEmployee.address}</td></tr>
                                        <tr><td><strong>Role:</strong></td><td>{selectedEmployee.role}</td></tr>
                                        <tr><td><strong>Joining date:</strong></td><td>{selectedEmployee.doj}</td></tr>
                                        <tr><td><strong>Username:</strong></td><td>{selectedEmployee.userName}</td></tr>
                                        <tr><td><strong>Active:</strong></td><td>{selectedEmployee.active ? 'Yes' : 'No'}</td></tr>
                                        {/* <tr><td><strong>Balance:</strong></td><td>{selectedEmployee.balance }</td></tr> */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Close
                                </button>
                               {role=='DIRECTOR' &&
                               <button onClick={() => navigate(`/AddEmployee/${selectedEmployee.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Update
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowEmployee;
