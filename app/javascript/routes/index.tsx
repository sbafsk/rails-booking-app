import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import AllBookingTable from "../components/Bookings/TableAllBookings"

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listado" exact component={AllBookingTable} />
      </Switch>
    </Router>
  )
}
