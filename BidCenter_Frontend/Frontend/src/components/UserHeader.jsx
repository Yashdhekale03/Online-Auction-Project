import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for global state
import { toast } from "react-toastify"; // Import Toastify for notifications
import "./style.css";

export default function Header() {
  const { loggedIn, logout } = useContext(AuthContext); // Access login state and logout function from AuthContext

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    toast.success("Logged out successfully!", { position: "top-center", autoClose: 2000 }); // Show success toast
  };

  return (
    <header className="headm  shadow-sm custom-header-bg ">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/homeuser" className="text-dark fs-3 fw-bold d-flex align-items-center gap-2">
        <img src="/New Logo1.jpg" alt="Logo" height="50" width='180' />
        
        </Link>
        <nav>
          {loggedIn ? (
            <div className="d-flex gap-3">
              <Button
                variant="outlined"
                component={Link}
                to="/profileuser"
                className="btn btn-outline-primary"
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                className="btn btn-outline-danger"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                className="btn btn-outline-primary"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                className="btn btn-outline-primary"
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
