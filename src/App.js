import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import {AiFillAccountBook, AiFillAndroid} from "react-icons/ai";
import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";

import BookablesPage from "./components/Bookables/BookablesPage";
import BookingsPage from "./components/Bookings/BookingsPage";
import UsersPage from "./components/Users/UsersPage";
import UserPicker from "./components/Users/UserPicker";
import AvengersPage from "./components/Avengers/AvengersPage";

export default function App () {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <AiFillAndroid/>
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen/>
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers/>
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/userspick" className="btn btn-header">
                  <FaUsers/>
                  <span>UsersPick</span>
                </Link>
              </li>
              <li>
                <Link to="/avengers" className="btn btn-header">
                  <FaCalendarAlt/>
                  <span>Avengers</span>
                </Link>
              </li>
            </ul>
          </nav>

          <UserPicker/>
        </header>

        <Routes>
          <Route path="/bookings" element={<BookingsPage/>}/>
          <Route path="/bookables" element={<BookablesPage/>}/>
          <Route path="/users" element={<UsersPage/>}/>
          <Route path="/userspick" element={<UserPicker/>}/>
          <Route path="/avengers" element={<AvengersPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}