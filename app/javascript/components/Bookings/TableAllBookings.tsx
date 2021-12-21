import React from "react"
import { Link } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core"
import { capitalize } from "lodash"
import moment from "moment"

moment.locale("es")

import { useBookings } from "../../context"

import { IBooking } from "../../types"

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: theme.spacing(3),
    [theme.breakpoints.down("md")]: { maxWidth: "90%" },
    [theme.breakpoints.up("sm")]: { maxWidth: "35%" }
  },
  sub: { textAlign: "center", display: "block", marginTop: theme.spacing(5) }
}))

export default function AllBookingTable() {
  const classes = useStyles()
  const { bookings, filter } = useBookings()
  const { date: dateFilter } = filter

  const filteredBookings: any[] =
    !!bookings &&
    bookings
      .sort((a, b) => (a.from > b.from ? 1 : -1))
      .map((b: IBooking) => {
        return (
          <TableRow key={b.id}>
            <TableCell>
              {moment(b.from).format("HH:mm")}
              {" a "}
              {moment(b.to).format("HH:mm")}
            </TableCell>
            <TableCell>{b.userName}</TableCell>
            <TableCell>{capitalize(b.room.split("-")[1])}</TableCell>
          </TableRow>
        )
      })

  return (
    <TableContainer className={classes.tableContainer}>
      <Typography align="center" variant="h6">
        Listado de reservas
      </Typography>
      {filteredBookings.length != 0 ? (
        <Table aria-label="booking table">
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Sala</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{filteredBookings}</TableBody>
        </Table>
        
      ) : (
        <Typography className={classes.sub} variant="subtitle1">
          No hay reservas para este día.
        </Typography>
      )}

      <Link to="/">Home</Link>
    </TableContainer>
  )
}
