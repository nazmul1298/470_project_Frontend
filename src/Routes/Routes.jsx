import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import DashBoard from "../Layout/DashBoard";
import Instructor from "../Pages/Instructor/Instructor";
import Class from "../Pages/Class/Class";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageClass from "../Pages/DashBoard/Admin/ManageClass/ManageClass";
import ManageUser from "../Pages/DashBoard/Admin/ManageUser/ManageUser";
import AddClass from "../Pages/DashBoard/Instructor/AddClass/AddClass";
import MyClass from "../Pages/DashBoard/Instructor/MyClass/MyClass";
import SelectedClass from "../Pages/DashBoard/Student/SelectedClass/SelectedClass";
import EnrolledClass from "../Pages/DashBoard/Student/EnrolledClass/EnrolledClass";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/Student/PaymentHistory/PaymentHistory";
import UpdateClass from "../Pages/UpdateClass/UpdateClass";
import PrivateRoutes from "./PrivateRoutes";
import NotFount from "../Pages/NotFount/NotFount";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'instructor',
        element: <Instructor></Instructor>
      },
      {
        path: 'class',
        element: <Class></Class>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
    children: [
      // admin
      {
        path: 'manageclass',
        element: <ManageClass></ManageClass>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
        // loader:({params})=>fetch(`https://summer-camp-server-gray-nine.vercel.app/users/${params.id}`)
      },
      {
        path: 'payhistory',
        element: <PaymentHistory></PaymentHistory>,
        
      },
      {
        path: 'manageuser',
        element: <ManageUser></ManageUser>
      },
      // Instructor
      {
        path: 'addclass',
        element: <AddClass></AddClass>
      },
      {
        path: 'myclass',
        element: <MyClass></MyClass>
      },
      //student
      {
        path: 'selectedclass',
        element: <SelectedClass></SelectedClass>
      },
      {
        path: 'enrolledclass',
        element: <EnrolledClass></EnrolledClass>
      },
      {
        path: 'update/:id',
        element: <UpdateClass></UpdateClass>,
        loader:({params})=>fetch(`https://summer-camp-server-gray-nine.vercel.app/class/${params.id}`)
      },
      
    ]
  },
  {
    path:"*",
    element:<NotFount></NotFount>
  }
]);