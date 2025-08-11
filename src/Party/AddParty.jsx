import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Grid, Paper } from '@mui/material';
import api from '/src/API';
import { useParams } from 'react-router-dom';
import AftersubmitPartyCheck from './afterPartyAdded';

const PartyForm = () => {
    const { id } = useParams(); // Extract the id from the URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const partyTypes = ['SELLER', 'PURCHASE', 'HYBRID'];
    const [partyID, setpartyId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        mobile: '',
        businessName: '',
        city: '',
        shopNo: '',
        address: '',
        date: '',
        gstNo: '',
        paymentRating: '',
        salesRating: '',
        comment: ''
    });

    useEffect(() => {
        const fetchPartyDetail = async () => {
            if (id) { // Fetch only if id is present
                try {
                    const token = localStorage.getItem('token'); // Retrieve token from local storage
                    const response = await api.get(`/api/party/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFormData(response.data); // Set the fetched party details in formData
                } catch (error) {
                    console.error('Error fetching party details:', error);
                    setError('Failed to fetch party details.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchPartyDetail();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

        try {
            if (id) {
                // If an id exists, update the existing record
                const response = await api.put(`/api/party/update`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
                console.log('Party updated successfully:', response.data);
                alert('Party updated successfully!');
            } else {
                // If no id, create a new record
                const response = await api.post('/api/party', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });

                console.log('Party created successfully:', response.data);
                setpartyId(response.data.id);
                alert('Party created successfully!');
            }
        } catch (error) {
            console.error('There was an error saving the party!', error);
            alert('There was an error saving the party!');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            {partyID && <AftersubmitPartyCheck partyId={partyID} />}
         
            <Container sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {id ? 'Update Party' : 'Add Party'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    fullWidth
                                    select
                                    required
                                >
                                    {partyTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Shop No"
                                    name="shopNo"
                                    value={formData.shopNo}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Business Name"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="GST No"
                                    name="gstNo"
                                    value={formData.gstNo}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Payment Rating"
                                    name="paymentRating"
                                    value={formData.paymentRating}
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Sales Rating"
                                    name="salesRating"
                                    value={formData.salesRating}
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {id ? 'Update' : 'Submit'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            
        </div>
    );
};

export default PartyForm;
