import React from "react"
import { Box, makeStyles, Button } from "@material-ui/core"


import BookingForm from "./Form"
import BookingTable from "./Table"


const useStyles = makeStyles((theme) => ({
  bookingBox: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("md")]: { flexDirection: "column" },
    [theme.breakpoints.up("sm")]: { flexDirection: "row" }
  }
}))

const Bookings = () => {
  const classes = useStyles()

  return (
    <Box className={classes.bookingBox}>
      <BookingForm />
      <BookingTable />
      
 
    </Box>
  )
}

export default Bookings
