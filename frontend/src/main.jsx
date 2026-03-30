import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from '../Components/Signup.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from '../Components/Login.jsx'
import 'react-toastify/ReactToastify.css'
import MainPage from '../Components/MainPage.jsx'

import MaterialManagement from '../Components/MaterialManagement.jsx'
import Attendance from '../Components/Attendance.jsx'
import RequestsTemp from '../Components/RequestsTemp.jsx'
import ExpensesOrg from '../Components/ExpensesOrg.jsx'
import AddExpense from '../Components/AddExpense.jsx'
import EditExpense from '../Components/EditExpense.jsx'
import MainPage2  from '../Components/MainPage2.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element : <MainPage/>
  },

  {
    path : '/login',
    element : <Login/>
  },
  {
    path:'/signup',
    element : <Signup/>
  },
  {
    path : '/expense',
    element : <ExpensesOrg/>
  },{
    path : '/material',
    element: <MaterialManagement/>
  },
  {
    path : '/attendance',
    element: <Attendance/>
  },{
    path : '/request',
    element : <RequestsTemp/>
  },{
    path :'/add-expense',
    element : <AddExpense/>
  },{
    path: '/edit-expense/:id',
    element : <EditExpense/>
  },{
    path : '/main2',
    element : <MainPage2/>

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
