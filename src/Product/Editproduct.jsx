import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material'; // optional, for cleaner layout
import {
  Autocomplete,
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useParams } from 'react-router-dom'; // For URL params and navigation
import { useNavigate } from 'react-router-dom';

import api from '/src/API'; // Adjust path to your API instance

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [compCategories, setCompCategories] = useState([]);
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    catagory: '',
    isActive: true,
    version: 1,
    comment: '',
    compDetails: [{ compId: null, compQuant: '' }],
    labourCost: 0,
  });

  const fetchProductData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      setLoading(false);
      return;
    }
    try {
      // Fetch product details by ID
      const response = await api.get(`https://technofarm.in/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const productData = response.data;
      setFormData({
        name: productData.name,
        catagory: productData.catagory,
        isActive: productData.isActive,
        version: productData.version,
        comment: productData.comment,
        compDetails: productData.compQuantity.map(comp => ({
          compId: comp.component.id,
          compQuant: comp.quantity.toString(),
        })),
        labourCost: productData.labourCost,
      });

      // Fetch form data (e.g., categories and components)
      const formResponse = await api.get('https://technofarm.in/api/products/add-form-data', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const { productCatagories, components } = formResponse.data;
      
      setCompCategories(productCatagories.name || []);

      setComponents(components || []);
    } catch (error) {
      console.error('Error fetching product or form data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchProductDetails();
      await fetchFormLists();
    };
    fetchData();
  }, []);


  const fetchProductDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`https://technofarm.in/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const productData = response.data;
      setFormData({
        name: productData.name,
        catagory: productData.productCatagories,
        isActive: productData.isActive,
        version: productData.version,
        comment: productData.comment,
        compDetails: productData.compQuantity.map(comp => ({
          compId: comp.component.id,
          compQuant: comp.quantity.toString(),
        })),
        labourCost: productData.labourCost,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFormLists = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    try {
      const formResponse = await api.get('https://technofarm.in/api/products/add-form-data', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const { productCatagories, components } = formResponse.data;
      setCompCategories(productCatagories || []);
      setComponents(components || []);
    } catch (error) {
      console.error('Error fetching form lists:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompDetailChange = (index, field, value) => {
    const updatedCompDetails = [...formData.compDetails];
    updatedCompDetails[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      compDetails: updatedCompDetails,
    }));
  };

  const addComponentRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      compDetails: [...prevData.compDetails, { compId: null, compQuant: '' }],
    }));
  };

  const removeComponentRow = (index) => {
    const updatedCompDetails = formData.compDetails.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      compDetails: updatedCompDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const confirmed = window.confirm("Are you sure you want to update this product?");
    if (!confirmed) return;
  
    const formattedData = {
      ...formData,
      compId: formData.compDetails.map((item) => item.compId),
      compQuant: formData.compDetails.map((item) => Number(item.compQuant)),
    };
    delete formattedData.compDetails;
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await api.put(`https://technofarm.in/api/products/${id}`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      console.log('Product updated successfully:', response.data);
      alert('Product updated successfully!');
      navigate('/ShowProduct');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };
  

  if (loading) return <CircularProgress />;

  return (
    <div>

      <Container>
        <Typography variant="h4" gutterBottom align="center">Edit Product</Typography>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
  <Autocomplete
    options={compCategories || []}
    getOptionLabel={(option) => option.name || ''}
    value={
      compCategories?.find((item) => item.name === formData.catagory) || null
    }
    onChange={(event, newValue) =>
      handleInputChange({
        target: {
          name: 'catagory',
          value: newValue ? newValue.name : '',
        },
      })
    }
    renderInput={(params) => <TextField {...params} label="Category" required />}
  />
</Grid>

              <Grid item xs={6}>
                <TextField
                  label="Version"
                  name="version"
                  type="number"
                  value={formData.version}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Labour Cost"
                  name="labourCost"
                  type="number"
                  value={formData.labourCost}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              {formData.compDetails.map((compDetail, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={components}
                      getOptionLabel={(option) => {
                        if (!option) return ''; // fallback if option is null
                        return `${option.id || ''} - ${option.name || ''} - ${option.value || ''} - ${option.pack || ''}`;
                      }}
                      value={components.find((c) => c.id === compDetail.compId) || null}
                      onChange={(event, newValue) =>
                        handleCompDetailChange(index, 'compId', newValue ? newValue.id : null)
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Box display="flex" gap={1}>
                            <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{option.id}</span> -
                            <span style={{ color: '#4caf50' }}>{option.name}</span> -
                            <span style={{ color: '#ff9800' }}>{option.value}</span> -
                            <span style={{ color: '#9c27b0' }}>{option.pack}</span>
                          </Box>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Component" required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={compDetail.compQuant}
                      onChange={(e) => handleCompDetailChange(index, 'compQuant', e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={0}>
                    <IconButton sx={{ height: 50 }} onClick={() => removeComponentRow(index)} color="error">
                      <RemoveCircle />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid container justifyContent="flex" xs={3}>
                <Button
                className='mx-1 mt-3'
                  variant="outlined"
                  startIcon={<AddCircle />}
                  onClick={addComponentRow}
                  color="primary"
                  sx={{ height: 55 }}
                >

                  Add Component
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className='mx-1 mt-4'
                  onClick={fetchFormLists}
                  disabled={loading}
                  sx={{ height: 55 }}
                >
                  {loading ? 'Refreshing...' : 'Refresh Lists'}
                </Button>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Update Product
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  );
};

export default EditProduct;
