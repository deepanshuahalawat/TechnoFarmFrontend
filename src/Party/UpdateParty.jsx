import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '/src/API';
import AftersubmitPartyCheck from './afterPartyAdded';

const UpdateParty = () => {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const partyTypes = ['SELLER', 'PURCHASE', 'HYBRID'];

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`/api/party/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(res.data);
            } catch (err) {
                console.error('Failed to fetch party details:', err);
                setError('Could not load party info.');
            } finally {
                setLoading(false);
            }
        };

        fetchParty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await api.put(`/api/party/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            alert('Party updated successfully!');
            setIsUpdated(true);
        } catch (err) {
            console.error('Error updating party:', err);
            alert('Error updating party!');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            {isUpdated && <AftersubmitPartyCheck partyId={id} />}
            <Container sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Update Party
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
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default UpdateParty;
