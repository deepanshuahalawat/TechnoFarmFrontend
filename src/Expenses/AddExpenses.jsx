import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Grid, Typography, Paper, Box,
    CircularProgress
} from '@mui/material';
import api from '/src/API'; // Adjust the API path as needed
import { useNavigate } from 'react-router-dom';
import AftersubmitexpensesCheck from './AfterAddConfirm';

const AddExpenses = () => {
    const [loading, setLoading] = useState(false);
    const [UserId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id)
    const [id, setid] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        debit: '',
        source: '',
        date: '',
        comment: '',
        employeeId: ''
    });

    useEffect(() => {
        // Any initialization or fetching logic can go here
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                setLoading(false);
                return;
            }

            const accountData = {
                debit: parseFloat(formData.debit),
                source: "Expenses",
                date: formData.date,
                comment: formData.comment,
                employee: { id: UserId }
            };

            // Post the data to create a new empAccount
            const response =  await api.post('/api/expenses', accountData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setid(response.data.id);
            alert("Expense account added successfully!");
        } catch (error) {
            console.error("Error saving expense account:", error);
            alert("Failed to save expense account. Please try again.");
        } finally {
            setLoading(false);
            navigate("/showExpenses");
           
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
         
            {/* {id && <AftersubmitexpensesCheck ExpensesId={id} />} */}
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Add New Expense Account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Amount"
                                    name="debit"
                                    value={formData.debit}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="number"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
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
                           
                        </Grid>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Add Expense Account
                            </Button>
                        </Box>
                    </Paper>
                </form>
            </Container>
        </div>
    );
};

export default AddExpenses;
