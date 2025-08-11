import React, { useEffect, useState } from 'react';
import api from '/src/API';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected purchase
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
    const [userName, SetUsername] = useState(JSON.parse(localStorage.getItem('user')).userName);
    useEffect(() => {
        setrole(JSON.parse(localStorage.getItem('user')).role);
        SetUsername(JSON.parse(localStorage.getItem('user')).userName);
    }, [])

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/products/list', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle product deletion
    // Handle product deletion
    const clone = async (id) => {
        const confirmed = window.confirm("Are you sure you want to CLONE this item?");
        if (!confirmed) return;
    
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };
    
        try {
            const response = await api.get(`https://technofarm.in/api/products/${id}`, { headers });
    
            if (!response?.data) {
                alert("Product data not found.");
                return;
            }
    
            const originalData = response.data;
    
            // Prepare compId and compQuant from original components array
            const compId = [];
            const compQuant = [];
    
            if (Array.isArray(originalData.components)) {
                for (const comp of originalData.components) {
                    if (comp?.component?.id && comp?.quantity != null) {
                        compId.push(comp.component.id);
                        compQuant.push(comp.quantity);
                    }
                }
            }
    
            // Build the new cloned product data
            const productData = {
                name: `${originalData.name}_CLONE`,
                catagory: originalData.catagory,
                isActive: originalData.isActive,
                version: originalData.version,
                comment: originalData.comment+" it is a clone Product of original ",
                labourCost: originalData.labourCost,
                compId,
                compQuant
            };
    
            const response2 = await api.post('https://technofarm.in/api/products', productData, { headers });
    
            if (response2.status === 201 || response2.status === 200) {
                alert("Item cloned successfully.");
                window.location.reload(); // Refresh the page
            }
             else {
                alert("Failed to clone item.");
            }
    
        } catch (error) {
            console.error("Error cloning item:", error);
            alert("An error occurred while cloning the item.");
        }
    };
    
    // Loading and error states
    if (loading) return <div>Loading product data...</div>;
    if (error) return <div>{error}</div>;
    const openModal = async (id) => {

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };

        try {
            const response = await api.get(`https://technofarm.in/api/products/${id}`, { headers });
    
            if (!response?.data) {
                alert("Product data not found.");
                return;
            }
    
        if(response.status===200){
        setSelectedProduct(response.data);
        setIsModalOpen(true);
        }else{
            console.error("failed to fetch");
            
        }
    }catch (error) {
            console.error("Error get by item Id :", error);
            alert("An error occurred while loading the item by Id .");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div>

            <div className="p-4">
                <div className='flex justify-between mb-4'>
                    <h2 className="text-3xl font-semibold text-gray-800">Product Entries</h2>
                    {role == 'DIRECTOR' && <button
                        className='bg-blue-400 rounded-md font-bold px-2 h-10 hover:bg-blue-600'
                        onClick={() => navigate(`/Addproduct`)}
                    >
                        Add Product +
                    </button>
                    }
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-300 font-bold">
                            <tr>
                                {['No.', 'Product Name', 'catagory', 'Version', 'Labour Cost', 'Comment', 'Stock'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-md text-gray-700">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr

                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    // onClick={() => navigate(`/EditProduct/${item.id}`)}
                                    onClick={() => openModal(item.id)} key={item.id}
                                >

                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.name ?? 'Unknown'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.catagory ?? 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.version ?? 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.labourCost ?? 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.comment ?? 'No comments'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.stock ?? 'N/A'}</td>
                                    <td className="flex pl-1 border">
                                        {/* <button onClick={(event) => {
                                            event.stopPropagation();
                                            handleDeleteById(item.id);
                                        }}>
                                            <DeleteIcon className='text-red-500' /> Delete
                                        </button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedProduct && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(31, 41, 55, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start", // allow it to start from the top
                        zIndex: 50,
                        width: "100%",
                        overflowY: "auto",
                        padding: "40px 20px", // more vertical padding to allow scrolling space
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "1.5rem",
                            borderRadius: "0.5rem",
                            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                            maxWidth: "38rem",
                            width: "100%",
                            maxHeight: "calc(100vh - 80px)", // limit height to viewport
                            overflowY: "auto", // scroll inner content
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                                marginBottom: "1rem",
                            }}
                        >
                            {selectedProduct.name}
                        </h2>
                        <div>
                            <table className="min-w-full bg-white border-y border-gray-300 ">
                                <tbody className='m-4'>

                                    <tr><td><strong>labourCost:</strong></td><td>{selectedProduct.labourCost}</td></tr>
                                    <tr><td><strong>Catagory:</strong></td><td>{selectedProduct.catagory}</td></tr>
                                    <tr><td><strong>Comment:</strong></td><td>{selectedProduct.comment}</td></tr>
                                    <tr><td><strong>stock Amount:</strong></td><td>{selectedProduct.stock}</td></tr>
                                    <tr><td><strong>No. of Components:</strong></td><td>{selectedProduct.compQuantity?.length}</td></tr>
                                    <tr><td><strong>version:</strong></td><td>{selectedProduct.version}</td></tr>

                                </tbody>

                            </table>
                            <div className='mt-5'>
                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Components</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Quantity</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Price</th>
                                            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>value</th>
                                             <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProduct.compQuantity.map((comp, index) => (
                                            <tr key={index} >
                                                <td style={{ padding: "0.5rem", fontWeight: "revert" }}>{comp.component.name} {comp.component.value} {comp.component.pack} {comp.component.catagory}</td>

                                                <td style={{ padding: "0.5rem" }}>{comp.quantity}</td>
                                                <td style={{ padding: "0.5rem" }}>{comp.component.price}</td>
                                                <td style={{ padding: "0.5rem" }}>{comp.component.value}</td>
                                                 <td style={{ padding: "0.5rem" }}>{comp.component.catagory}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button onClick={closeModal} style={{
                                marginTop: "1rem", backgroundColor: "#3b82f6", color: "white",
                                padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer", border: "none"
                            }}>Close</button>


                           {role == 'DIRECTOR' &&  <button onClick={() => clone(selectedProduct.id)} style={{
                                marginTop: "1rem", backgroundColor: "#3b82f6", color: "white",
                                padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer", border: "none"
                            }}>clone</button>}
                            {role == 'DIRECTOR' && <button onClick={() => navigate(`/AuditProduct/${selectedProduct.id}`)} style={{
                                marginTop: "1rem", backgroundColor: "#3b82f6", color: "white",
                                padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer", border: "none"
                            }}>Audit</button>}
                            {role == 'DIRECTOR' && <button onClick={() => navigate(`/EditProduct/${selectedProduct.id}`)} style={{
                                marginTop: "1rem", backgroundColor: "#3b82f6", color: "white",
                                padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer", border: "none"
                            }}>Update</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowProduct;
