import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './ErrorsMessages/PageNotFound';
import NavBarCom from './NavBr/NavBrCom';
import ShopPage from './Shop/ShopPage';
import ProductDetail from './Shop/productDetails';
import AboutUs from './Home/Aboutus/AboutUs';
import Service from './Services/Service';
import ShowSales from './Dashboard/Sales/ShowSales';
import Login from './Dashboard/Login/Login';
import SaleDetails from './Dashboard/Sales/SalesDeatils';
import AddSaleForm from './Dashboard/Sales/AddSale';
import ShowDeletedSales from './Dashboard/Sales/ShowDeletedSales';
import ShowPurchase from './Purchase/Purchase';
import AddPurchaseForm from './Purchase/AddPurchase';
import ShowDeletedPurchases from './Purchase/ShowDeletedPurchase';
import ShowProduct from './Product/ShowProduct';
import ShowProduction from './Production/ShowProduction';
import AddProduction from './Production/AddProduction';
import AddProduct from './Product/AddPRoduct';
import ShowParty from './Party/ShowParty';
import PartyForm from './Party/AddParty';
import PartyDetail from './Party/PartyDetail';
import ShowComponent from './Component/ShowComponent';
import ComponentForm from './Component/AddComponent';
import AddCategory from './Component/AddCategory';
import ShowEmployee from './Employee/ShowEmployee';
import EmployeeForm from './Employee/AddEmployee';
import EmployeeDetails from './Employee/EmpoyeeAccountDetails';
import OtherPage from './Others/OtherPage';

import NavAfterLogin from './NavBr/NavAfterLogin';
import EditProduct from './Product/Editproduct';
import AllSales from './Dashboard/Sales/showAllSales';
import ShowExpenses from './Expenses/ShowExpenses';
import AddExpenses from './Expenses/AddExpenses';
import ShowFundTransfers from './FundTransfer/ShowAllTransfer';
import AddTransferFund from './FundTransfer/AddFundTransfer';
import UpdateParty from './Party/UpdateParty';
import BOMGenerator from './GenerateBOM/BOMGenerator';
import AuditComponent from './Component/AuditComponent';
import AuditProduct from './Product/AuditProduct';
import AttendanceSystem from './Attendance/Attendance';


function App() {
  const [tocken, setTocken] = useState(localStorage.getItem('token'))
  useEffect(() => {
   setTocken(localStorage.getItem('token'));
  }, [])
  
  return (
    <Router>
     {tocken?<NavBarCom/>:<NavBarCom/>}
     {/* <NavBarCom/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Add this route */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Services" element={<Service />} />
        
        <Route path="/ShowSales" element={<AllSales/>} />
        <Route path="/ShowPartySales" element={<ShowSales/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/sale/party/:id" element={<SaleDetails />} />
        <Route path="/addSale" element={<AddSaleForm />} />
        <Route path="/ShowDeletedSales" element={<ShowDeletedSales />} />
        <Route path="/ShowPurchase" element={<ShowPurchase />} />
        <Route path="/AddPurchase" element={<AddPurchaseForm />} />
        <Route path="/ShowDeletedPurchases" element={<ShowDeletedPurchases />} />
        <Route path="/ShowProduct" element={<ShowProduct />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/AuditProduct/:id" element={<AuditProduct />} />
        <Route path="/ShowProduction" element={<ShowProduction />} />
        <Route path="/AddProduction" element={<AddProduction />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ShowPArty" element={<ShowParty />} />
        <Route path="/AddParty" element={<PartyForm />} />
        <Route path="/AddParty/:id"  element={<PartyForm />} />
        <Route path="/updateParty/:id" element={<UpdateParty />} />
        <Route path="/ShowComponent"  element={<ShowComponent />} />
        <Route path="/AddComponent/:id"  element={<ComponentForm />} />
        <Route path="/AuditComponent/:id"  element={<AuditComponent />} />
        <Route path="/AddCategory"  element={<AddCategory />} />
        <Route path="/ShowEmployee"  element={<ShowEmployee />} />
        <Route path="/AddEmployee/:id"  element={<EmployeeForm />} />
        <Route path="/AddEmployee"  element={<EmployeeForm />} />
        <Route path="/EmployeeDetails/:id"  element={<EmployeeDetails />} />
        <Route path="/Other"  element={<OtherPage />} />
        <Route path="/showExpenses"  element={<ShowExpenses />} />
        <Route path="/AddExpenses"  element={<AddExpenses />} />
        <Route path="/ShowFundTransfers"  element={<ShowFundTransfers />} />
        <Route path="/AddFundTransfers"  element={<AddTransferFund />} />
        <Route path="/BOMGenerator"  element={<BOMGenerator />} />

        <Route path="/Attendance"  element={<AttendanceSystem />} />

      </Routes>
    </Router>
  );
}

export default App;
