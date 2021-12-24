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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}



const useStyles = makeStyles((theme) => ({
    bookingModal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down("md")]: { flexDirection: "column" },
      [theme.breakpoints.up("sm")]: { flexDirection: "row" }
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
  }))

export default function BookingList() {
  const classes = useStyles()
  const [modal, setModal] = useState<boolean>(false)
  const [modalStyle] = React.useState(getModalStyle);

  return ( modal ?
    
         <div style={modalStyle} className={classes.paper}>
             <AllBookingTable />
             <Button onClick={() => setModal(false)} variant="outlined">Cerrar tabla</Button>
         </div> : <Button onClick={() => setModal(true)} variant="outlined">Listado de bookings</Button>
              
       
          
    

   
  )
}
