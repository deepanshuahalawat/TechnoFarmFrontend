import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Container, TextField, MenuItem, Button, Grid, Typography, FormControl, CircularProgress, Paper, Box
} from '@mui/material';
import { Add, Delete as DeleteIcon } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import api from '/src/API';
import AftersubmitPurachaseCheck from './AfterPurchase';

const AddPurchaseForm = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [parties, setParties] = useState([]);
    const [components, setComponents] = useState([]);
    const [totalam, settotalam] = useState([]);
    const [isDone, setisDone] = useState(false);
    const [ApiReturnData, setApiReturnData] = useState(null);
    const [formData, setFormData] = useState({
        paidByEmployeeId: '',
        sellerPartyId: '',
        compDetails: [{ componentId: '', quantity: 0, amount: 0 }],
        amountPaid: '',
        taxAmount: '',
        balance: '',
        comment: '',
        date: new Date(),
        totalAmount: 0,
    });

    // Calculate total amount whenever compDetails changes
    useEffect(() => {
        const total = formData.compDetails.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
        );
        setFormData((prev) => ({
            ...prev,
            totalAmount: total,
            balance: total + parseFloat(formData.taxAmount || 0) - parseFloat(formData.amountPaid || 0),
        }));
        settotalam(total);
    }, [formData.compDetails, formData.taxAmount, formData.amountPaid]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    setLoading(false);
                    return;
                }
                const response = await api.get('https://technofarm.in/api/purchase/add-form-data', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
                setEmployees(response.data.directors || []);
                // setParties(response.data.party || []);
                setComponents(response.data.component || []);
            } catch (error) {
                console.error('Error fetching form data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    
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
    };

    const handleCompDetailsChange = (index, field, value) => {
        const updatedCompDetails = [...formData.compDetails];
        updatedCompDetails[index][field] = parseFloat(value) || 0;
        setFormData({ ...formData, compDetails: updatedCompDetails });
    };

    const addComponent = () => {
        setFormData({
            ...formData,
            compDetails: [...formData.compDetails, { componentId: '', quantity: 0, price: 0 }],
        });
    };

    const removeComponent = (index) => {
        const updatedCompDetails = formData.compDetails.filter((_, i) => i !== index);
        setFormData({ ...formData, compDetails: updatedCompDetails });
    };

    const handleSubmit = async (e) => {
 
        e.preventDefault();

        const dateObject = new Date(formData.date);

        const purchaseData = {
            paidByEmployee: { id: formData.paidByEmployeeId },
            sellerParty: { id: formData.sellerPartyId },
            compDetails: formData.compDetails.map((item) => ({
                component: { id: item.componentId },
                quantity: parseFloat(item.quantity),
                amount: parseFloat(item.amount),
            })),
            amountPaid: parseFloat(formData.amountPaid),
            taxAmount: parseFloat(formData.taxAmount),
            balance: parseFloat(formData.balance),
            date: dateObject.toISOString().split('T')[0],
            comment: formData.comment,
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                setLoading(false);
                return;
            }
            const response = await api.post('https://technofarm.in/api/purchase/add', purchaseData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            console.log('Purchase submitted successfully:', response.data);
            setisDone(true);
            setApiReturnData(response.data);
            alert('Purchase submitted successfully!');
        } catch (error) {
            console.error('Error submitting purchase:', error);
            alert('Failed to submit purchase. Please try again.');
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <div>
     
            { isDone && ApiReturnData &&  <AftersubmitPurachaseCheck purchaseid={ApiReturnData.id} />}
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom align="center">Add Purchase Detail</Typography>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
                        <Grid container spacing={2}>
                            {/* Form Fields for Employee and Party */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        options={employees}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, newValue) => {
                                            setFormData({ ...formData, paidByEmployeeId: newValue ? newValue.id : '' });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Purchase By" variant="outlined" required />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        options={parties}
                                        getOptionLabel={(option) =>`${option.name} - ${option.city}` }
                                        onChange={(event, newValue) => {
                                            setFormData({ ...formData, sellerPartyId: newValue ? newValue.id : '' });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Party" variant="outlined" required />}
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

                        <div>
                            {formData.compDetails.map((compDetail, index) => (
                                <Grid className='mt-2' container spacing={2} key={index} alignItems="center">
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            options={components}
                                            getOptionLabel={(option) => `${option.name} - ${option.value} ${option.pack === 'OTHER' ? '' : '-' + option.pack} ${option.brand === 'N/A' ? '' : '-' + option.brand} - ${option.catagory}`}
                                            onChange={(event, newValue) => {
                                                handleCompDetailsChange(index, 'componentId', newValue ? newValue.id : '');
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Component" required />}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="Quantity"
                                            type="number"
                                            value={compDetail.quantity}
                                            onChange={(e) => handleCompDetailsChange(index, 'quantity', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="Amount"
                                            type="number"
                                            value={compDetail.amount}
                                            onChange={(e) => handleCompDetailsChange(index, 'amount', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button style={{ color: "red", backgroundColor: "#F8E7E9" }} onClick={() => removeComponent(index)} startIcon={<DeleteIcon />}>Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                        <div className='flex justify-between'>
                            <Button className='mt-3' variant="outlined" color="primary" onClick={addComponent} startIcon={<Add />}>Add Component</Button>
                            <p className='flex mt-3 mr-44 gap-1'><p className='text-gray-500'>Sub Total: </p> {totalam}</p>
                        </div>
                    </Paper>

                    <Paper elevation={2} sx={{ padding: 2, marginTop: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Amount Paid"
                                    name="amountPaid"
                                    type="number"
                                    value={formData.amountPaid}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Total Tax"
                                    name="taxAmount"
                                    type="number"
                                    value={formData.taxAmount}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Balance"
                                    name="netAmount"
                                    type="number"
                                    value={formData.balance}
                                    onChange={handleInputChange}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid className='mt-3' item xs={8}>
                            <TextField
                                label="Comment"
                                name="comment"  // Updated name to match formData field
                                type="text"
                                value={formData.comment}
                                onChange={handleInputChange}  // Uses handleInputChange to update formData
                                fullWidth
                            />
                        </Grid>

                    </Paper>

                    <Box mt={2} textAlign="center">
                        <Button fullWidth variant="contained" color="primary" type="submit">Save Purchase</Button>
                    </Box>
                </form>
            </Container>
        </div>
    );
};

export default AddPurchaseForm;
