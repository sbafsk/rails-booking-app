import React from "react"
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
import moment from "moment"

moment.locale("es")

import { useBookings } from "../../context"

import { IBooking } from "../../types"

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: theme.spacing(3),
    [theme.breakpoints.down("md")]: { maxWidth: "90%" },
    [theme.breakpoints.up("md")]: { maxWidth: "35%" }
  }
}))

export default function BookingTable() {
  const classes = useStyles()
  const { bookings, filter } = useBookings()
  const { date: dateFilter } = filter

  const filteredBookings: any[] =
    !!bookings &&
    bookings
      .sort((a, b) => (a.from > b.from ? 1 : -1))
      .filter((b: IBooking) => {
        return moment(b.from).format("LL") === moment(dateFilter).format("LL")
      })
      .map((b: IBooking) => {
        return (
          <TableRow key={b.id}>
            <TableCell>
              {moment(b.from).format("HH:mm")}
              {" a "}
              {moment(b.to).format("HH:mm")}
            </TableCell>
            <TableCell>{b.userName}</TableCell>
            <TableCell>{b.room.replace("-", " ")}</TableCell>
          </TableRow>
        )
      })

  return (
    <TableContainer className={classes.tableContainer}>
      <Typography align="center" variant="h6">
        {moment(dateFilter).format("LL")}
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
        <Typography variant="h6">No hay reservas para este día.</Typography>
      )}
    </TableContainer>
  )
}
