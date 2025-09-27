import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
// import UpcomingAuctions from "../components/UpcomingAuctions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api"; // Adjust the import path as necessary
// import PastAuctions from "../components/PastAuctions";
import LiveAuctions from "../components/LiveAuctions";

const Home = () => {
  const [topBids, setTopBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await api.get("/listAllBids");
        // console.log("Fetched bids:", response.data); // Log the response for debugging

        const data = response.data;

        // Ensure currentPrice exists, is not null, and is a valid number
        const topBidsData = data
          .sort((a, b) => b.bidAmount - a.bidAmount) // Sort bids by bidAmount (descending)
          .map((bid) => ({
            id: bid.bidId,
            title: `Auction #${bid.auctionId}`, // Just something readable
            user: `User #${bid.userId}`,
            currentBid: bid.bidAmount,
            time: new Date(bid.bidTime).toLocaleString(), // Format the time
          }));

        // console.log("Top Bids:", topBidsData); // Log the mapped and sorted bids
        setTopBids(topBidsData);
        setIsUpdate(false); // Reset isUpdate after fetching
      } catch (error) {
        console.error("Error fetching bids:", error.message);
        setTopBids([]); // In case of error, set topBids to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [isUpdate]);

  return (
    <>
      <Header />
      <div className="container my-4">
        <section className="row my-4">
          <div className="col-md-6">
            <div className="flex-1">
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Bid Center
              </Typography>
              <Typography variant="h6" paragraph>
                Discover, Bid, and Win! Bid Center offers a seamless platform
                for buyers and sellers to connect, ensuring every auction is
                fair, efficient, and rewarding.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "black", // Change button color to black
                  color: "white", // Text color white
                  "&:hover": {
                    backgroundColor: "#333", // Darker shade on hover
                  },
                }}
              >
                <Link
                  to="/auctions"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Explore Auctions
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <Card className="flex-1" style={{ minHeight: "300px", maxHeight: "400px" }}>
              <CardHeader
                title={
                  <Typography variant="h6" component="div">
                    Top Bids
                  </Typography>
                }
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  textAlign: "center",
                }}
              />
              <CardContent>
                {loading ? (
                  <Typography variant="body1" align="center">
                    Loading...
                  </Typography>
                ) : topBids.length > 0 ? (
                  <ul style={{ listStyleType: "none", padding: "10px", margin: 0, overflowY: "auto", maxHeight: "300px" }}>
                    {topBids.map((bid) => (
                      <li
                        key={bid.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" style={{ flex: 1 }}>
                          {bid.title}
                          {" by "}
                          {bid.user}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold", textAlign: "right" }}
                        >
                          ${bid.currentBid}
                          {" at "}
                          {bid.time}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body1" align="center">
                    Nothing to show
                  </Typography>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="my-4">
          <LiveAuctions update={setIsUpdate}/>
        </section>
        {/* <section className="my-4">
          <PastAuctions />
        </section>
        <section className="my-4">
          <UpcomingAuctions />
        </section> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
