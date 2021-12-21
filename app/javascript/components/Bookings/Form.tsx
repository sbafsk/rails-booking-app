import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import {
  makeStyles,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Box
} from "@material-ui/core"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import moment from "moment"
import BookingList from "./AllBookings"
moment.locale("es")

import { useBookings } from "../../context"
import { IBookingForm } from "../../types"


const rooms = [
  { name: "sala grande", value: "sala-grande" },
  { name: "sala chica", value: "sala-chica" }
]


const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: { maxWidth: "90%" },
    [theme.breakpoints.up("sm")]: { maxWidth: "55%" },
    "& .MuiTextField-root ": {
      margin: "20px 0"
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      marginTop: "55px"
    }
  },
  dateInputs: {
    display: "flex",
    justifyContent: "space-around",
    "& .MuiFormControl-root": {
      "&:not(:first-child)": {
        marginLeft: "7px"
      }
    },
    "& input": {
      fontSize: "13px"
    }
  }
}))

export default function BookingForm() {
  const classes = useStyles()

  const {
    addBooking,
    setBookingsByDay,
    setBookingsByRoom,
    isLoading,
    openDialog,
    filter
  } = useBookings()

  const handleSubmit = async (values: IBookingForm, actions) => {
    try {
      await addBooking(values)
      openDialog({
        severity: "success",
        message: "Reserva guardada."
      })
    } catch (error) {
      openDialog({
        severity: "error",
        message: error.message
      })
    } finally {
      actions.setSubmitting(false)
      actions.resetForm({
        values: {
          ...initialValues,
          day: moment(filter.date).format("yyyy-MM-DD")
        }
      })
    }
  }

 

  const initialValues: IBookingForm = {
    room: filter.room,
    name: "",
    email: "not@implemented.yet",
    day: moment(filter.date).format("yyyy-MM-DD"),
    fromTime: "",
    toTime: ""
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        room: Yup.string().required("Requerido."),
        name: Yup.string().required("Requerido."),
        email: Yup.string().email().required("Requerido."),
        day: Yup.string().required("Requerido."),
        fromTime: Yup.string().required("Requerido."),
        toTime: Yup.string().required("Requerido.")
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, handleChange, touched, errors }) => {
        useEffect(() => {
          setBookingsByDay(moment(values.day).toDate())
        }, [values.day])

        useEffect(() => {
          setBookingsByRoom(values.room)
        }, [values.room])

        return (
          <Form className={classes.form}>
            <FormControl variant="outlined">
              <TextField
                label="Sala"
                select
                id="room"
                variant="outlined"
                value={values.room}
                onChange={handleChange("room")}
                error={touched.room && Boolean(errors.room)}
                helperText={touched.room && errors.room}
              >
                {rooms.map((r) => {
                  return (
                    <MenuItem value={r.value} key={r.value}>
                      {r.name}
                    </MenuItem>
                  )
                })}
              </TextField>
            </FormControl>
            <Box className={classes.dateInputs}>
              <TextField
                id="day"
                label="Día"
                type="date"
                name="day"
                variant="standard"
                value={values.day}
                onChange={handleChange("day")}
                InputLabelProps={{
                  shrink: true
                }}
                error={touched.day && Boolean(errors.day)}
                helperText={touched.day && errors.day}
              />
              <TextField
                id="fromTime"
                name="fromTime"
                label="Desde"
                type="time"
                variant="standard"
                value={values.fromTime}
                onChange={handleChange("fromTime")}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 900 // 15 min
                }}
                error={touched.fromTime && Boolean(errors.fromTime)}
                helperText={touched.fromTime && errors.fromTime}
              />
              <TextField
                id="toTime"
                name="toTime"
                label="Hasta"
                type="time"
                variant="standard"
                value={values.toTime}
                onChange={handleChange("toTime")}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 900 // 15 min
                }}
                error={touched.toTime && Boolean(errors.toTime)}
                helperText={touched.toTime && errors.toTime}
              />
            </Box>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              variant="outlined"
              value={values.name}
              onChange={handleChange("name")}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            {/* <TextField
              id="email"
              name="email"
              label="Email"
              // variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            /> */}
            <Button
              type="submit"
              variant="outlined"
              disabled={isSubmitting || isLoading}
            >
              Guardar
            </Button>
            <Button variant="outlined">
              <Link to="/listado">Listado de Reservas</Link>
            </Button>
            


          </Form>
          
        )
      }}
    </Formik>
  )
}
