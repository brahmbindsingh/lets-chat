import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Pages/LoginSignup/Login";
import { useEffect, useState } from "react";
import Alert from "./Components/Layout/Alert/Alert";
import Signup from "./Components/Pages/LoginSignup/Signup";
import Home from "./Components/Pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./actions/userAction";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (document.cookie) {
      dispatch(getUserDetails());
    }
  }, []);
  const [alert, setAlert] = useState({ type: null, message: null });
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert({ type: null, message: null });
    }, 2000);
  };
  return (
    <>
      <Router>
        <Alert alert={{ type: alert.type, message: alert.message }} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Home showAlert={showAlert} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? (
                <Login showAlert={showAlert} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            exact
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup showAlert={showAlert} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
