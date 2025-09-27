import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  CardActions,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
// import axios from 'axios';
import { toast } from "react-toastify";
import api from "../services/api";
// import { all } from "axios";

export default function LiveAuctions({ update }) {
  const { loggedIn, user } = useContext(AuthContext);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get("/listAllAuctions");
        const allAuctions = response.data;

        // console.log("All Auctions:", allAuctions);

        const currentDateTime = new Date();

        allAuctions.forEach((auction) => {
          if (new Date(auction.endTime) <= currentDateTime) {
            updateAuctionStatus(auction, "CLOSED");
          } else if (new Date(auction.startTime) <= currentDateTime) {
            updateAuctionStatus(auction, "LIVE");
          }
        });
        // Filter live auctions
        const liveAuctions = allAuctions
          .filter((auction) => {
            return (
              auction.status.toUpperCase() === "LIVE" ||
              (new Date(auction.startTime) <= currentDateTime &&
                new Date(auction.endTime) > currentDateTime)
            );
          })
          .sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

        setAuctions(liveAuctions);
        setError("");
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setError("Failed to load auctions.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
    const interval = setInterval(fetchAuctions, 60000); // Auto-refresh every 1 minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const updateAuctionPrice = async (auction, newPrice) => {
    try {
      await api.put("/updateAuction", {
        ...auction,
        currentPrice: newPrice,
      });
      // console.log("Auction price updated:", response.data);
    } catch (error) {
      console.error("Error updating auction price:", error);
    }
  };

  const updateAuctionStatus = async (auction, status) => {
    try {
      await api.put("/updateAuction", {
        ...auction,
        status: status,
      });
      // console.log("Auction status updated:", response.data);
    } catch (error) {
      console.error("Error updating auction status:", error);
    }
  };

  const handlePlaceBid = async (auctionId, bidAmount) => {
    try {
      const response = await api.post("/createBid", {
        auctionId,
        userId: user.id,
        bidAmount,
        bidTime: new Date().toISOString(), // send current timestamp
      });

      console.log(response.data);
      if (response.status === 200) {
        auctions.forEach((auction) => {
          if (auction.auctionId === auctionId) {
            updateAuctionPrice(auction, bidAmount);
            update(true); // Trigger update in parent component
          }
        });
        // Optionally, you can refetch the auctions to get the latest data
        setAuctions((prevAuctions) =>
          prevAuctions.map((auction) =>
            auction.auctionId === auctionId
              ? { ...auction, currentPrice: bidAmount }
              : auction
          )
        );
        // Refetch auctions to get the latest data
        // fetchAuctions();
      }
      toast.success("Bid placed successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(
        "Error placing bid:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to place bid.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live Auctions</h2>

      {loading && <p>Loading auctions...</p>}

      {!loading && error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {!loading && auctions.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#666" }}>
            No live auctions at the moment.
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "10px 0",
        }}
      >
        {auctions.map((auction) => (
          <div key={auction.auctionId} style={{ marginRight: "16px" }}>
            <Card style={{ minWidth: "400px" }}>
              <CardHeader
                title={auction.title}
                subheader={auction.status}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              />
              <CardContent>
                <p>{auction.description}</p>
                <p>Start: {new Date(auction.startTime).toLocaleString()}</p>
                <p>End: {new Date(auction.endTime).toLocaleString()}</p>
                <p>Starting Price: ${auction.startPrice}</p>
                <p>Current Price: ${auction.currentPrice}</p>
              </CardContent>

              {loggedIn && user.role === "user" && (
                <CardActions>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const bidAmount = parseFloat(e.target.bidAmount.value);
                      if (bidAmount > auction.currentPrice) {
                        handlePlaceBid(auction.auctionId, bidAmount);
                        e.target.reset(); // Reset input after submitting
                      } else {
                        alert("Bid must be higher than the current price!");
                      }
                    }}
                    className="d-flex space-x-2"
                  >
                    <TextField
                      type="number"
                      name="bidAmount"
                      label="Enter bid amount"
                      placeholder="Enter bid amount"
                      min={auction.currentPrice + 1}
                      step="0.1"
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "8px" }}
                    >
                      Place Bid
                    </Button>
                  </form>
                </CardActions>
              )}

              {loggedIn && user.role === "admin" && (
                <p style={{ textAlign: "center", color: "red" }}>
                  You cannot place a bid as an admin.
                </p>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
