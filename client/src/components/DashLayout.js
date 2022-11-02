import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
        <DashHeader />
        <div className='dash-container'>
            {/* Outlet renders the child components of the route-dashlayout, 
            renders index element if '/' or 
            null if no given routes */}
            <Outlet /> 
        </div>
        <DashFooter />

    </>
  )
}

export default DashLayout