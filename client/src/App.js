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
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="calculator" element={<LoanCalculator />} />
        
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                
                <Route index element={<Welcome />} />

                <Route path="loans">
                  <Route index element={<LoansList />} />
                  {/* <Route path=":id" element={<EditLoan />} /> */}
                  <Route path="new" element={<NewLoan />} />
                </Route>
                
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              
              </Route> {/*End Dash */}
            </Route>
          </Route> 
        </Route> {/* End of Protected Routes */}
        
      </Route>
    </Routes>
  );
}

export default App;
