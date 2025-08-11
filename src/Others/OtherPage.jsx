import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import Unauthorized from '/src/NotAuthorided';

function OtherPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const [role, setrole] = useState(JSON.parse(localStorage.getItem('user')).role);
  useEffect(() => {
    setrole(JSON.parse(localStorage.getItem('user')).role);
  }, [])

  if (role != "DIRECTOR") {
    return <Unauthorized />;
  }
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {/* Open */}
        </Typography>
        <Typography variant="body1" paragraph>
          {/* Select one of the following options to view deleted entries: */}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"

            size="large"
            onClick={() => handleNavigate('/ShowDeletedSales')}
            sx={{ width: '100%' }}
          >
            Show Deleted Sales Entries
          </Button>
          <Button
            variant="contained"

            size="large"
            onClick={() => handleNavigate('/ShowDeletedPurchases')}
            sx={{ width: '100%' }}
          >
            Show Deleted Purchases Entries
          </Button>
          <Button

            variant="contained"

            size="large"
            onClick={() => handleNavigate('/showExpenses')}
            sx={{ width: '100%' }}
          >
            Show/Add Expense Entries
          </Button>

          <Button

            variant="contained"

            size="large"
            onClick={() => handleNavigate('/ShowFundTransfers')}
            sx={{ width: '100%' }}
          >
            Fund Transfer
          </Button>

                 <Button

            variant="contained"

            size="large"
            onClick={() => handleNavigate('/BOMGenerator')}
            sx={{ width: '100%' }}
          >
            Generate BOM
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OtherPage;
