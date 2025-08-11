import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Pagination } from '@mui/material';
import api from '/src/API';
import Unauthorized from '/src/NotAuthorided';

const ShowParty = () => {
    const [party, setParty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 40;

    const navigate = useNavigate();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('user')).role);

    useEffect(() => {
        setRole(JSON.parse(localStorage.getItem('user')).role);
    }, []);

    if (role !== "DIRECTOR") {
        return <Unauthorized />;
    }

    const fetchParty = async (page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get(`/api/party`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: page - 1, size: itemsPerPage }
            });
            setParty(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching party data:', error);
            setError('Failed to fetch party data.');
        } finally {
            setLoading(false);
        }
    };

    const searchParty = async (keyword) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.post('/api/party/search', {
                keyword: keyword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setParty(response.data);
            setTotalPages(1); // Assuming no pagination on search
        } catch (error) {
            console.error('Error searching party data:', error);
            setError('Failed to search party data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.length >= 3) {
            searchParty(searchTerm);
        } else if (searchTerm === '') {
            fetchParty(currentPage);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm.length < 3) {
            fetchParty(currentPage);
        }
    }, [currentPage]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to page 1 when typing
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;


    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Parties List</h2>
                <button className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600' onClick={() => navigate(`/AddParty`)}>
                    Add Party +
                </button>
            </div>

            <TextField
                label="Search by Name, City, or Business Name"
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
                            <th className="px-6 py-3 text-left text-md text-gray-700">Party Name</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Business Name</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">City</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Balance</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Party Sales</th>
                            <th className="px-6 py-3 text-left text-md text-gray-700">Edit Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-600">
                                    Loading party data...
                                </td>
                            </tr>
                        ) : party.length > 0 ? (
                            party.map((sale, index) => (
                                <tr key={sale.id} className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="px-6 py-4 text-sm text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sale.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sale.businessName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sale.city}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sale.balance}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <button
                                            className='bg-blue-400 rounded-md font-bold px-2 py-2 hover:text-white'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/sale/party/${sale.id}`);
                                            }}>
                                            Show
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <button
                                            className='bg-blue-400 rounded-md font-bold px-2 py-2 hover:text-white'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/updateParty/${sale.id}`);
                                            }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-600">
                                    No parties found matching the search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
                        
            </div>

            {searchTerm.length < 3 && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}
        </div>
    );
};

export default ShowParty;
