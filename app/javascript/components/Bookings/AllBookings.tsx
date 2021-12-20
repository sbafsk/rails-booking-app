import React, { useState } from "react"
import {
  makeStyles,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Box
} from "@material-ui/core"
import AllBookingTable from "./TableAllBookings"
import * as Yup from "yup"
import moment from "moment"

moment.locale("es")


const rooms = [
  { name: "sala grande", value: "sala-grande" },
  { name: "sala chica", value: "sala-chica" }
]



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

export default function BookingList() {
  const classes = useStyles()
  const [modal, setModal] = useState<boolean>(false)
 

  return ( modal ?
    
         <div className={classes.bookingBox}>
             <AllBookingTable />
             <Button onClick={() => setModal(false)} variant="outlined">Cerrar tabla</Button>
         </div> : <Button onClick={() => setModal(true)} variant="outlined">Listado de bookings</Button>
              
       
          
    

   
  )
}
