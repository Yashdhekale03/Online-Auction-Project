import { useState, useEffect } from "react";
import api from "../services/api";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
const MyBids = ({ id }) => {
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("MyBids component mounted with ID:", id);
    const fetchBids = async () => {
      try {
        const response = await api.get("/listAllBids");
        // console.log("Fetched bids:", response.data); // Log the response for debugging

        const data = response.data;

        // Ensure currentPrice exists, is not null, and is a valid number
        const myBidsData = data
          .filter((bid) => bid.userId === id)
          .map((bid) => ({
            id: bid.bidId,
            title: `Auction #${bid.auctionId}`,
            currentBid: bid.bidAmount,
            time: new Date(bid.bidTime).toLocaleString(),
          }));

        // console.log("Top Bids:", topBidsData); // Log the mapped and sorted bids
        setMyBids(myBidsData);
      } catch (error) {
        console.error("Error fetching bids:", error.message);
        setMyBids([]); // In case of error, set topBids to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [id]);
  return (
    <div>
      <Card
        className="flex-1"
        style={{
          minHeight: "300px",
          maxHeight: "400px",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              My Bids
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
          ) : myBids.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                padding: "10px",
                margin: 0,
                overflowY: "auto",
                maxHeight: "300px",
              }}
            >
              {myBids.map((bid) => (
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
  );
};
export default MyBids;
