import './App.css'
import AccountForm from './components/AccountForm';
import Account from './pages/accountController/Account';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transaction from './pages/transactionController/Transaction';
import TransactionForm from './components/TransactionForm';


function App() {
  return (
    <Router>
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Account />} />
        {/* {/* <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Transactions />} /> */}
        <Route path="/accountForm" element={<AccountForm />} /> 
        <Route path="/transactions" element={<Transaction />} /> 
        <Route path="/transactionForm" element={<TransactionForm />} /> 

      </Routes>
    </div>
  </Router>
  );
}

export default App;