import React, { useEffect } from "react"
import {
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box
} from "@material-ui/core"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import moment from "moment"

moment.locale("es")

import { useBookings } from "../../context"
import { IBookingForm } from "../../types"

const rooms = [
  { name: "Sala 1", value: "sala-1" },
  { name: "Sala 2", value: "sala-2" }
]

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: { maxWidth: "90%" },
    [theme.breakpoints.up("md")]: { maxWidth: "45%" },
    "& .MuiFormControl-root": {
      margin: "15px 0"
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      marginTop: "55px"
    }
  },
  dateInputs: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiFormControl-root": {
      "&:not(:first-child)": {
        marginLeft: "7px"
      }
    },
    "& input": {
      fontSize: "14px"
    }
  }
}))

export default function BookingForm() {
  const classes = useStyles()

  const {
    addBooking,
    filterBookingsByDay,
    filterBookingsByRoom,
    isLoading,
    openDialog
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
    }

    actions.resetForm()
  }

  return (
    <Formik
      initialValues={{
        room: "sala-1",
        name: "asd",
        email: "not@implemented.yet",
        day: moment().format("yyyy-MM-DD"),
        fromTime: "",
        toTime: ""
      }}
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
          filterBookingsByDay(moment(values.day).toDate())
        }, [values.day])

        useEffect(() => {
          filterBookingsByRoom(values.room)
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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
              variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            /> */}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || isLoading}
            >
              Guardar
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
