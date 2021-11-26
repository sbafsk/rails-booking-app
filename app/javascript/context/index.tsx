import React, {
  useContext,
  createContext,
  useReducer,
  useCallback
} from "react"
import { mapKeys, camelCase } from "lodash"

import { reducer } from "./reducer"
import { getBookings, postBooking } from "../api/booking"
import {
  BookingActions,
  IBookingState,
  IBooking,
  IBookingForm,
  IDialogProps,
  IUseBookings
} from "../types"

const {
  REQUEST_BOOKINGS,
  FILTER_BOOKINGS,
  SET_LOADING,
  SET_ERROR,
  SET_DIALOG
} = BookingActions

// todo: why defaultValue is asked
const BookingContext = createContext(undefined)

export const useBookings = (): IUseBookings => {
  return useContext(BookingContext)
}

const initialState: IBookingState = {
  bookings: [],
  loading: false,
  filter: { date: new Date(), room: "" },
  error: null,
  dialog: null
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const requestBookings = useCallback(async () => {
    dispatch({ type: SET_LOADING, payload: true })
    try {
      const bookings = await getBookings()
      const formatedBookings = bookings.map((b) =>
        mapKeys(b, (val, key) => (key = camelCase(key)))
      )
      dispatch({ type: REQUEST_BOOKINGS, payload: formatedBookings })
    } catch (error) {
      console.error(error)
      setError(error)
      throw error
    }
  }, [])

  const addBooking = async (booking: IBookingForm) => {
    dispatch({ type: SET_LOADING, payload: true })
    const { day, fromTime, toTime, name, email, room } = booking
    const newBooking: IBooking = {
      from: new Date(`${day}T${fromTime}:00`),
      to: new Date(`${day}T${toTime}:00`),
      userName: name,
      userMail: email,
      room: room
    }
    try {
      await postBooking(newBooking)
      await requestBookings()
    } catch (error) {
      console.error(error)
      setError(error)
      throw error
    }
  }

  const filterBookingsByDay = (date: Date) => {
    console.log(date)
    dispatch({ type: FILTER_BOOKINGS, payload: { date } })
  }

  const filterBookingsByRoom = (room: string) => {
    dispatch({ type: FILTER_BOOKINGS, payload: { room } })
  }

  const setError = (error: null | string) => {
    dispatch({ type: SET_ERROR, payload: error })
  }

  const openDialog = (dialogProps: IDialogProps) => {
    dispatch({ type: SET_DIALOG, payload: dialogProps })
  }

  const closeDialog = () => {
    dispatch({ type: SET_DIALOG, payload: null })
  }

  const value = {
    bookings: state.bookings,
    isLoading: state.loading,
    filter: state.filter,
    dialogProps: state.dialog,
    addBooking,
    requestBookings,
    filterBookingsByDay,
    filterBookingsByRoom,
    setError,
    openDialog,
    closeDialog
  }

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
