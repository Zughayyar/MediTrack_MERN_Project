import { Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";
import AdminDashboard from "./views/AdminDashboard";
import AssistantDashboard from "./views/AssistantDashboard";
import Home from "./components/homePage/Home";
import News from "./components/homePage/News";
import AboutUs from "./components/homePage/AboutUs";
import AdminHome from "./components/admin/AdminHome";
import UsersList from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";
import PractitionerDashboard from "./views/PractitionerDashboard.jsx";

const App = () => {
    return (
        <Routes>
            {/* Home Page */}
            {/*Landing Page Routes*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<AboutUs />} />

            {/*Admin Dashboard Routes*/}
            <Route path="/adminDashboard" element={<AdminDashboard/>}>
                <Route index path="home" element={<AdminHome/>} />
                <Route path="users" element={<UsersList/>} />
                <Route path="addUser" element={<UserForm/>} />
                <Route path="editUser/:id" element={<UserForm/>} />
            </Route>

            {/*Practitioner Dashboard Routes*/}
            <Route path='/practDashboard' element={<PractitionerDashboard/>} />

            {/*Assistant Dashboard Routes*/}
            <Route path='/assistDashboard' element={<AssistantDashboard/>} />

        </Routes>
    );
};

export default App;
