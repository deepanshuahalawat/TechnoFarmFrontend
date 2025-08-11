import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';
import { TextField, Autocomplete } from '@mui/material';

const ShowComponent = () => {
    const [components, setComponents] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, SetUsername] = useState(JSON.parse(localStorage.getItem('user')).userName);
    useEffect(() => {
        setrole(JSON.parse(localStorage.getItem('user')).role);
        SetUsername(JSON.parse(localStorage.getItem('user')).userName);
    }, [])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/component', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setComponents(response.data);
                setFilteredComponents(response.data);

            } catch (error) {
                console.error('Error fetching component data:', error);
                setError('Failed to fetch component data.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/component/categories/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories.');
            }
        };

        fetchComponents();
        fetchCategories();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = components.filter((component) =>
            component.name.toLowerCase().includes(value.toLowerCase()) ||
            component.catagory.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredComponents(filtered);
    };

    const handleCategoryChange = (event, value) => {
        setSelectedCategory(value);
        if (value) {
            const filtered = components.filter(
                (component) => component.catagory.toLowerCase() === value.toLowerCase()
            );
            setFilteredComponents(filtered);
        } else {
            setFilteredComponents(components); // Reset if no category is selected
        }
    };

    const handleRowClick = async (componentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/api/component/${componentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setSelectedComponent(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching component detail:', error);
        }
    };



    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading component data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>

            <div className="p-4">
                <div className='md:flex gap-2 justify-between'>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Components</h2>
                    {role == 'DIRECTOR' && <button className='bg-blue-400 rounded-md font-bold px-2 mt-2 mr-5  h-10 hover:bg-blue-600' onClick={() => { navigate(`/AddCategory`) }} >
                        Add Category +
                    </button>}
                    {role == 'DIRECTOR' && <button className='bg-blue-400 rounded-md font-bold px-2 mt-2  h-10 hover:bg-blue-600' onClick={() => { navigate(`/AddComponent/:id`) }} >
                        Add Component +
                    </button>}

                </div>
                {/* Autocomplete field for category selection */}
                <div className='md:flex gap-2'>
                    <Autocomplete
                        sx={{ width: "100%" }}
                        options={categories.map((category) => category.name)}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Filter by Category"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <TextField
                        label="Search by Name or Category"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearch}
                        margin="normal"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 mt-4">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left text-md text-gray-700">No.</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Name</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Value</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Category</th>

                                <th className="px-6 py-3 text-left text-md text-gray-700">Brand</th>
                                <th className="px-6 py-3 text-left text-md text-gray-700">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComponents.map((component, index) => (
                                <tr
                                    key={component.id}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    onClick={() => handleRowClick(component.id)}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{component.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{component.value}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{component.catagory}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{component.brand}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{component.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredComponents.length === 0 && (
                        <p className="text-center text-gray-600 mt-4">No components found matching the search criteria.</p>
                    )}
                </div>
                {isModalOpen && selectedComponent && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h2 className="text-xl font-bold mb-4">{selectedComponent.name} Details</h2>

                            <div>
                                <table className="min-w-full bg-white border-y border-gray-300">
                                    <tbody>
                                        <tr><td><strong>ID:</strong></td><td>{selectedComponent.id}</td></tr>
                                        <tr><td><strong>Name:</strong></td><td>{selectedComponent.name}</td></tr>
                                        <tr><td><strong>Value:</strong></td><td>{selectedComponent.value}</td></tr>
                                        <tr><td><strong>Pack:</strong></td><td>{selectedComponent.pack}</td></tr>
                                        <tr><td><strong>Category:</strong></td><td>{selectedComponent.catagory}</td></tr>
                                        <tr><td><strong>Brand:</strong></td><td>{selectedComponent.brand}</td></tr>
                                        <tr><td><strong>Price:</strong></td><td>{selectedComponent.price}</td></tr>
                                        <tr><td><strong>Stock:</strong></td><td>{selectedComponent.stock}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Close
                                </button>
                                {role == 'DIRECTOR' && <button onClick={() => navigate(`/AuditComponent/${selectedComponent.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Audit
                                </button>}

                                {role == 'DIRECTOR' && <button onClick={() => navigate(`/AddComponent/${selectedComponent.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded">
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

export default ShowComponent;
