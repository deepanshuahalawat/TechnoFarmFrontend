import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Grid, Typography, Paper, Box, CircularProgress,
  FormControl
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import api from '/src/API'; // Adjust the API path as needed
import AftersubmitTransferCheck from './AfterFundTransferConfirm';

const AddTransferFund = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]); // Updated to store employee data
  const [fundTransferID, setfundTransferID] = useState(null)
  const [formData, setFormData] = useState({
    sourceEmployeeId: '',
    targetEmployeeId: '',
    amount: '',
    transferDate: '',
    comment: ''
  });

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

      const transferData = {
        sourceEmployeeId: parseInt(formData.sourceEmployeeId, 10),
        targetEmployeeId: parseInt(formData.targetEmployeeId, 10),
        amount: parseFloat(formData.amount),
        transferDate: formData.transferDate,
        comment: formData.comment
      };

      // Post the transfer data to your API
     const response= await api.post('/api/transfer', transferData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setfundTransferID(response.data.id);
      alert("Fund transfer added successfully!");
    } catch (error) {
      console.error("Error saving fund transfer:", error);
      alert("Failed to save fund transfer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await api.get('/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setEmployees(response.data || []); // Store the fetched employee data
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
   
      
      {fundTransferID&& <AftersubmitTransferCheck TransferId={fundTransferID}/>}

      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Add Fund Transfer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={employees}
                    getOptionLabel={(option) => option.name} // Assuming employee has a 'name' field
                    onChange={(event, newValue) => {
                      handleInputChange({
                        target: {
                          name: 'sourceEmployeeId',
                          value: newValue ? newValue.id : '', // Assuming employee has an 'id' field
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Source Employee" variant="outlined" required />
                    )}
                    value={
                      employees.find(emp => emp.id === formData.sourceEmployeeId) || null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={employees}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleInputChange({
                        target: {
                          name: 'targetEmployeeId',
                          value: newValue ? newValue.id : '',
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Target Employee" variant="outlined" required />
                    )}
                    value={
                      employees.find(emp => emp.id === formData.targetEmployeeId) || null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Transfer Date"
                  name="transferDate"
                  value={formData.transferDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="date"
                  InputLabelProps={{
                    shrink: true,
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
                Add Fund Transfer
              </Button>
            </Box>
          </Paper>
        </form>
      </Container>
    </div>
  );
};

export default AddTransferFund;
