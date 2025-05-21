import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import AuthRout from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute'; 
import ColerPage  from './components/ColorPage';
import OrderHistoryPage  from './components/OrderHistoryPage';
import  HomePage  from './components/HomePage';
import  BasketPage  from './components/BasketPage';
import  CategoryPage  from './components/CategoryPage';
import  Status1Page  from './components/Status1Page';
import  Status2Page from './components/Status2Page';
import  Status3Page  from './components/Status3Page';
import  Status4Page  from './components/Status4Page';
import  TablePage  from './components/TablePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AuthRout />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute> }>
          <Route
            path="/home"
            element={
              <HomePage />}/>
          <Route path="/color" element={<ColerPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/history" element={<OrderHistoryPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/status1" element={<Status1Page />} />
          <Route path="/status2" element={<Status2Page />} />
          <Route path="/status3" element={<Status3Page />} />
          <Route path="/status4" element={<Status4Page />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
