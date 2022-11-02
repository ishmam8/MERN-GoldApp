import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome'
import LoansList from './features/loans/LoansList'
import UsersList from './features/users/UsersList'
import LoanCalculator from './features/loans/LoanCalculator';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditLoan from './features/loans/EditLoan';
import NewLoan from './features/loans/NewLoan';
import Prefetch from './features/auth/Prefetch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="calculator" element={<LoanCalculator />} />
        
        <Route element={<Prefetch />}>
          <Route path='dash' element={<DashLayout />}>
            
            <Route index element={<Welcome />} />

            <Route path="loans">
              <Route index element={<LoansList />} />
              {/* <Route path=":id" element={<EditLoan />} /> */}
              <Route path="new" element={<NewLoan />} />
            </Route>

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>
          
          </Route> {/*End Dash */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
