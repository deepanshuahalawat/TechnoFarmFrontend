import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Container, TextField, MenuItem, Button, Grid, Typography, Select,
  InputLabel, FormControl, CircularProgress, IconButton, Paper, Divider, Box
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '/src/API'; // Make sure you have a suitable API utility
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useParams, useNavigate } from 'react-router-dom';
import AftersubmitSaleCheck from './AftersubmitSaleCheck';

const AddSaleForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState('');
  const [saleId, setsaleId] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    partyId: '',
    amountPaid: '',
    taxAmount: '',
    discount: '',
    balance: '',
    comment: '',
    date: new Date(),
    dateFormat: 'yyyy-MM-dd',
    productDetails: [],
    replacement: [],
  });

  const [totals, setTotals] = useState({
    totalProductAmount: 0,
    totalReplacementAmount: 0,
    taxAmount: 0,
    discount: 0,
    amountPaid: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }

        const response = await api.get('/api/sales/searchData', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setEmployees(response.data.employees || []);
        // setParties(response.data.parties || []);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
    console.log(parties);
    
  }, [parties]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }

        const response = await api.get('/api/party/all', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        
        setParties(response.data || []);
      } catch (error) {
        console.error('Error fetching party data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateTotals();
  };

  const handleProductChange = (index, field, value, type) => {
    const updatedProducts = [...formData[type]];
    updatedProducts[index][field] = value;
    updatedProducts[index].amount = updatedProducts[index].price * updatedProducts[index].quantity;
    setFormData({ ...formData, [type]: updatedProducts });
  };

  const addProduct = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { product: { id: '', name: '' }, price: 0, quantity: 0, amount: 0 }],
    });
  };

  const removeProduct = (index, type) => {
    const updatedProducts = [...formData[type]];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, [type]: updatedProducts });
  };
  const calculateTotals = () => {
    const totalProductAmount = formData.productDetails.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalReplacementAmount = formData.replacement.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxAmount = parseFloat(formData.taxAmount) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const amountPaid = parseFloat(formData.amountPaid) || 0;

    const balance = (totalProductAmount - totalReplacementAmount + taxAmount - discount) - amountPaid;

    // Update both formData balance and totals
    setFormData(prev => ({ ...prev, balance: balance.toFixed(2) }));
    setTotals({
      totalProductAmount: totalProductAmount.toFixed(2),
      totalReplacementAmount: totalReplacementAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      discount: discount.toFixed(2),
      amountPaid: amountPaid.toFixed(2),
      balance: balance.toFixed(2),
    });
  };


  useEffect(() => {
    calculateTotals();
  }, [formData.productDetails, formData.replacement, formData.taxAmount, formData.discount, formData.amountPaid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObject = new Date(formData.date);

    const saleData = {

      salesParty: { id: formData.partyId, name: parties.find(p => p.id === formData.partyId)?.name || '' },
      productDetails: formData.productDetails,
      replacement: formData.replacement,
      amountPaid: parseFloat(formData.amountPaid),
      taxAmount: parseFloat(formData.taxAmount),
      discount: parseFloat(formData.discount),
      balance: parseFloat(formData.balance),
      comment: formData.comment,
      saleByEmployee: { id: formData.employeeId, name: employees.find(emp => emp.id === formData.employeeId)?.name || '' },
      date: dateObject.toISOString().split('T')[0],
      dateFormat: formData.dateFormat,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await api.post('/api/sales', saleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Sale submitted successfully:', response.data);
      setsaleId(response.data.id);
      alert('Sale submitted successfully!');
      // navigate('/Showsales');
    } catch (error) {
      console.error('Error submitting sale:', error);
      alert('Failed to submit sale. Please try again.');
    }
    // console.log(saleData);
  };

  if (loading) {
    return <CircularProgress />;
  }




  return (
    <div>

      <Container maxWidth="md">

        <Typography variant="h4" gutterBottom align="center">
          Add New Sale
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Employee and Party Selection */}
          <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sale Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>

                  <Autocomplete
                    options={employees}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleInputChange({ target: { name: 'employeeId', value: newValue ? newValue.id : '' } });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Employee" variant="outlined"  />
                    )}
                    value={employees.find(emp => emp.id === formData.employeeId) || null}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>

                  <Autocomplete
                    options={parties}
                   
                    
                    getOptionLabel={(option) =>`${option.name} - ${option.city}`}
                    onChange={(event, newValue) => {
                      handleInputChange({ target: { name: 'partyId', value: newValue ? newValue.id : '' } });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Party" variant="outlined"  />
                    )}
                    value={parties.find(party => party.id === formData.partyId) || null}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Product and Replacement Sections */}
          <ProductSection
            title="Products"
            items={formData.productDetails}
            onAdd={() => addProduct('productDetails')}
            onRemove={(index) => removeProduct(index, 'productDetails')}
            onChange={(index, field, value) => handleProductChange(index, field, value, 'productDetails')}
            products={products}
          />

          <ProductSection
            title="Replacement Products"
            items={formData.replacement}
            onAdd={() => addProduct('replacement')}
            onRemove={(index) => removeProduct(index, 'replacement')}
            onChange={(index, field, value) => handleProductChange(index, field, value, 'replacement')}
            products={products}
          />

          {/* Payment Details Section */}
          <Paper elevation={2} sx={{ padding: 2, marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Amount Paid"
                  name="amountPaid"
                  type="number"
                  value={formData.amountPaid}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Tax Amount"
                  name="taxAmount"
                  type="number"
                  value={formData.taxAmount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Balance"
                  name="balance"
                  value={formData.balance}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>

              <div className='m-4 mt-5'>
                <Typography variant="h6" gutterBottom>
                  Review Totals
                  <hr />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography className='flex gap-3'>Total Product Amount: <p className='text-green-500 '>+{totals.totalProductAmount}</p></Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>

                    <Typography className='flex gap-3'>Total Replacement Amount <p className='text-red-500 '>-{totals.totalReplacementAmount}</p></Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Tax Amount: + {totals.taxAmount}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Discount: -{totals.discount}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Amount Paid: {totals.amountPaid}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Balance: {totals.balance}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Paper>



          {/* Submit Button */}
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
      {saleId && <AftersubmitSaleCheck saleId={saleId}/>}
    </div>
  );
};

// Reusable Product Section Component
const ProductSection = ({ title, items, onAdd, onRemove, onChange, products }) => (
  <Paper elevation={2} sx={{ padding: 2, marginTop: 3 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {items.map((item, index) => (
      <Grid container spacing={2} key={index} alignItems="center">
        <Grid item xs={6} sm={4}>
          <FormControl fullWidth>

            <Autocomplete
              options={products}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                onChange(index, 'product', { id: newValue ? newValue.id : '' });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Product" variant="outlined"  />
              )}
              value={products.find(product => product.id === item.product.id) || null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Price"
            type="number"
            value={item.price}
            onChange={(e) => onChange(index, 'price', parseFloat(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Quantity"
            type="number"
            value={item.quantity}
            onChange={(e) => onChange(index, 'quantity', parseInt(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField label="Amount" value={item.amount} fullWidth disabled />
        </Grid>
        <Grid item xs={6} sm={2}>
          <IconButton onClick={() => onRemove(index)} >
            <p className='text-lg text-red-500 '><DeleteIcon fontSize='sm' /> delete</p>
          </IconButton>
        </Grid>
      </Grid>
    ))}
    <Button variant="outlined" color="primary" onClick={onAdd} startIcon={<Add />} sx={{ mt: 2 }}>
      Add {title}
    </Button>
  </Paper>
);

export default AddSaleForm;
