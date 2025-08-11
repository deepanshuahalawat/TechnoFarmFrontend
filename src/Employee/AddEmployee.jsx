import React, { useState, useEffect } from 'react';
import {
    Container, TextField, MenuItem, Button, Grid, Typography, Paper, Box,
    CircularProgress
} from '@mui/material';
import api from '/src/API'; // Adjust the API path as needed
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        address: '',
        role: '',
        monthlySalary: '',
        username: '',
        password: ''
    });

    const employeeTypes = ["WORKER", "TRAINEE", "WORKER HEAD", "DIRECTOR"];

    useEffect(() => {
        const fetchEmployeeData = async (id) => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    setLoading(false);
                    return;
                }

                if (!id) {
                    console.error("No employee ID provided.");
                    return;
                }

                setLoading(true);

                const response = await api.get(`/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData(id);
    }, [id]);

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
    
            // Create a filtered object that excludes salary and empAccount
            const { salary, empAccount, ...filteredData } = formData;
    
            if (id) {
                // Update existing employee
                await api.put(`/api/employee/${id}`, filteredData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert("Employee updated successfully!");
            } else {
                // Add new employee
                await api.post('/api/employee', filteredData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert("Employee added successfully!");
            }
        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Failed to save employee. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
           
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    {id ? "Update Employee" : "Add New Employee"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Mobile No"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="tel"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                >
                                    {employeeTypes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Monthly Salary"
                                    name="monthlySalary"
                                    value={formData.monthlySalary}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="number"
                                />
                            </Grid>
                            {/* {!id&&
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                required
                 type="text"
              />
            </Grid>} */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                {id ? "Update Employee" : "Add Employee"}
                            </Button>
                        </Box>
                    </Paper>
                </form>
            </Container>
        </div>
    );
};

export default EmployeeForm;
