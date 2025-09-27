import React from "react";
import { Card, CardHeader, CardContent, Typography, Grid } from "@mui/material";

export default function AuctionProfile() {
  // TODO: In future, you can pass props or fetch stats from an API
  const stats = {
    totalAuctions: 150,
    winnings: 45,
    participations: 120,
    winRate: "30%",
  };

  return (
    <Card className="mb-4" sx={{ height: "100%" }}>
      <CardHeader
        title="Auction Profile"
        titleTypographyProps={{ align: "center", variant: "h6" }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6} className="text-center">
            <Typography variant="h5" fontWeight="bold">
              {stats.totalAuctions}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Auctions
            </Typography>
          </Grid>
          <Grid item xs={6} className="text-center">
            <Typography variant="h5" fontWeight="bold">
              {stats.winnings}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Winnings
            </Typography>
          </Grid>
          <Grid item xs={6} className="text-center">
            <Typography variant="h5" fontWeight="bold">
              {stats.participations}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Participations
            </Typography>
          </Grid>
          <Grid item xs={6} className="text-center">
            <Typography variant="h5" fontWeight="bold">
              {stats.winRate}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Win Rate
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
