import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserHeader from "../components/UserHeader";
import { AuthContext } from "../context/AuthContext"; // Uncomment if using AuthContext

const Auction = () => {
  const [auctions, setAuctions] = useState([]);
  // const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Access user and updater from AuthContext

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctions = await api.get("/listAllAuctions");

        setAuctions(auctions.data);
        // setAdmins(adminsRes.data);
      } catch (err) {
        console.error("Error fetching auctions/admins", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const getAdminName = (adminId) => {
  //   const admin = admins.find((a) => a.adminId === adminId);
  //   return admin ? admin.fullName : "Unknown Admin";
  // };

  return (
    <>
      {user?.role === "admin" ? <Header /> : <UserHeader />}
      <Box sx={{ px: 4, py: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Auctions
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : auctions.length === 0 ? (
          <Typography>No auctions found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {auctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} key={auction.auctionId}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardHeader
                    title={auction.title}
                    subheader={`Status: ${auction.status}`}
                  />
                  <CardContent>
                    {/* <Typography variant="body2" color="text.secondary">
                      {"Category: "}{auction.categoryId}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                      {auction.description || "No description"}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography>
                      <strong>Start Price:</strong> ${auction.startPrice}
                    </Typography>
                    <Typography>
                      <strong>Current Price:</strong> ${auction.currentPrice}
                    </Typography>
                    <Typography>
                      <strong>Time:</strong>{" "}
                      {new Date(auction.startTime).toLocaleString()} -{" "}
                      {new Date(auction.endTime).toLocaleString()}
                    </Typography>
                    {/* <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Created by: {getAdminName(auction.adminId)}
                    </Typography> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Auction;
