import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import CalendarNewBookings from "../components/Bookings/CalendarNewBookings"

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listado" exact component={CalendarNewBookings} />
      </Switch>
    </Router>
  )
}
