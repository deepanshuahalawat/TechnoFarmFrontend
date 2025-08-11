import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import api from '/src/API';

const AddCategory = ({ onCategoryAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
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
            const response = await api.post('/api/component/category', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            console.log('Category added successfully:', response.data);
            alert('Category added successfully!');
            setFormData({ name: '', date: '' });

            // ✨ Call the parent's fetchCategories function
            if (onCategoryAdded) {
                onCategoryAdded();
            }
        } catch (error) {
            console.error('Error adding category!', error);
            alert('There was an error adding the category!');
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Category
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Category Name"
                                name="name"
                                value={formData.name}
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
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddCategory;
