import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = role === "admin" ? "/loginAdmin" : "/loginUser";

    try {
      const response = await api.post(endpoint, { email, password });

      console.log("Login response:", response.data);

      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 2000, // Automatically close after 2 seconds
      });

      role === "admin"
        ? login(
            response.data.adminId,
            response.data.username,
            response.data.email,
            response.data.createdAt,
            role
          )
        : login(
            response.data.userId,
            response.data.username,
            response.data.email,
            response.data.createdAt,
            role
          );
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/homeuser");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed.";
      console.error("Login error:", err);

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });

      setError(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <Container component="main" style={{ minHeight: "70vh" }} maxWidth="xs">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Enter your email and password to login
            </Typography>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {error && (
                <Typography color="error" variant="body2" className="my-2">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
          </CardContent>
          {/* <CardActions>
            <Link to="/forgot-password">
              <Button size="small">Forgot password?</Button>
            </Link>
          </CardActions> */}
          <CardActions>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/signup">
                <Button size="small">Sign up</Button>
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default Login;
