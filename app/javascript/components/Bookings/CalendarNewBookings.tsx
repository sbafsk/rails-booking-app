import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  EditRecurrenceMenu,
  DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useBookings } from '../../context';


const useStyles = makeStyles(theme => ({
  todayCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
}));

const currentDate = new Date();

const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  } if (date.getDay() === 0 || date.getDay() === 6) {
    return <WeekView.TimeTableCell {...props} className={classes.weekendCell} />;
  } return <WeekView.TimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  } return <WeekView.DayScaleCell {...props} />;
};

const WeekCalendar = () => {
  const { bookings } = useBookings()
  const convertFromBookingToAppointment = ({ from, to, userName, ...rest }) => ({ startDate: from, endDate: to, displayName: userName, ...rest })
  const appointments = bookings.map(convertFromBookingToAppointment)


  return <Paper>
    <Scheduler
      height={600}
      data={appointments}
    >
      <DayView
        startDayHour={8}
        endDayHour={13}
      />
      <ViewState />
      <WeekView
        startDayHour={9}
        endDayHour={23}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
      />
      <ViewState
        currentDate={currentDate}
      />
      <MonthView />
      <Appointments />
      <AppointmentTooltip />
      <Toolbar />
      <DateNavigator />
      <ViewSwitcher />



    </Scheduler>
  </Paper>
};


export default WeekCalendar
