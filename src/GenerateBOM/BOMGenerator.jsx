import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Container, TextField, Button, Grid, Typography, Paper, Divider, Box,
  CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '/src/API';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const BOMGenerator = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bomData, setBomData] = useState([]);
  const [calculating, setCalculating] = useState(false);
  const [total, setTotal] = useState(0);
  const [actualCostTotal, setActualCostTotal] = useState(0);
  const [ActualCost, setActualCost] = useState(false); // Add this line

  const handleChange = (event) => {
    setActualCost(event.target.checked);
  };

  // Calculate totals whenever bomData or ActualCost changes
  useEffect(() => {
    if (bomData?.componentQuantities) {
      let calculatedTotal = 0;
      let calculatedActualCostTotal = 0;

      bomData.componentQuantities.forEach(component => {
        const availableStock = ActualCost ? Math.max(0, component.component.stock) : component.component.stock ?? 0;
        const requiredQty = component.quantity - availableStock;
        const netPrice = requiredQty * (component.component.price ?? 0);

        calculatedTotal += component.quantity * (component.component.price ?? 0);
        calculatedActualCostTotal += Math.max(0, netPrice);
      });

      setTotal(calculatedTotal);
      setActualCostTotal(calculatedActualCostTotal);
    }
  }, [bomData, ActualCost]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }

        const response = await api.get('/api/products/list', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { product: null, quantity: 1 }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index][field] = value;
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index, value) => {
    const quantity = parseInt(value) || 0;
    handleProductChange(index, 'quantity', quantity);
  };

  const generateBOM = async () => {
    if (selectedProducts.length === 0) {
      alert('Please add at least one product');
      return;
    }

    // Prepare the request payload
    const payload = selectedProducts.map(item => ({
      productId: item.product?.id,
      quantity: item.quantity
    })).filter(item => item.productId);

    if (payload.length === 0) {
      alert('Please select valid products');
      return;
    }

    setCalculating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/bom/generate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setBomData(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error generating BOM:', error);
      alert('Failed to generate BOM. Please try again.');
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }
  const totalCost = products.reduce((sum, product) => {
    const price = Math.max(0, product.netPrice); // Prevent negative prices
    return sum + price;
  }, 0);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3 }}>
        BOM Generator
      </Typography>

      <Paper elevation={2} sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Product Selection
        </Typography>

        <Grid container spacing={2} alignItems="center">
          {selectedProducts.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={5}>
                <Autocomplete
                  options={products}
                  getOptionLabel={(option) => option.name}
                  value={item.product}
                  onChange={(event, newValue) => handleProductChange(index, 'product', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Product" variant="outlined" fullWidth />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  fullWidth
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <IconButton onClick={() => handleRemoveProduct(index)} color="error">
                  <DeleteIcon /> Remove
                </IconButton>
              </Grid>
              {index < selectedProducts.length - 1 && (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={generateBOM}
            disabled={calculating || selectedProducts.length === 0}
            size="large"
          >
            {calculating ? <CircularProgress size={24} /> : 'Generate BOM'}
          </Button>
        </Box>
        {/* <FormControlLabel
          control={
            <Checkbox
              size='sm'
              checked={ActualCost}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Calculate the actual Cost of the products."
        /> */}
      </Paper>

      {bomData.componentQuantities && (
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bill of Materials
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {/* For: {bomData.map(p => `${p?.component?.name} (${p.quantity})`).join(', ')} */}
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Component</TableCell>
                  <TableCell align="right">category</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Package</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Required</TableCell>
                  <TableCell align="right">Net Price</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {bomData?.componentQuantities?.map((component, index) => {
                  const availableStock = ActualCost ? Math.max(0, component.component.stock) : component.component.stock ?? 0;
                  const requiredQtyRaw = component.quantity - availableStock;
                  const requiredQty = Math.max(0, requiredQtyRaw); // Never negative
                  const netPrice = requiredQty * (component.component.price ?? 0);

                  const qtyBg = requiredQty > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
                  const priceBg = netPrice > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';

                  return (
                    <TableRow key={index}>
                      <TableCell>{component.component.name}</TableCell>
                      <TableCell align="right">{component.component.catagory}</TableCell>
                      <TableCell align="right">{component.component.value}</TableCell>
                      <TableCell align="right">{component.component.pack}</TableCell>
                      <TableCell align="right">{component.component.price}</TableCell>
                      <TableCell align="right">{component.quantity}</TableCell>
                      <TableCell align="right">
                        {ActualCost ? Math.max(0, component.component.stock) : component.component.stock}
                      </TableCell>
                      <TableCell align="right" className={qtyBg}>
                        {requiredQty}
                      </TableCell>
                      <TableCell align="right" className={priceBg}>
                        ₹{Math.max(0, netPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow >
                  <TableCell  align="left" colSpan={3} ><strong className='text-xl'>Total Production Cost = </strong></TableCell>
                  <TableCell align="left" ><strong className='text-2xl'> ₹{bomData?.totalPrice.toFixed(1)}</strong></TableCell>

                  <TableCell colSpan={3} ><strong className='text-xl'>Total Actual Cost = </strong></TableCell>
                  <TableCell ><strong className='text-2xl'> ₹{actualCostTotal.toFixed(2)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default BOMGenerator;