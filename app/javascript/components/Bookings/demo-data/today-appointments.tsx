import moment from 'moment';
import  {appointments}  from './appointments';
// import { useBookings } from "../../../context"

const currentDate = moment();
let date = currentDate.date();
// const { bookings, filter } = useBookings()
// const { date: dateFilter } = filter

const makeTodayAppointment = (startDate, endDate) => {
  const days = moment(startDate).diff(endDate, 'days');
  const nextStartDate = moment(startDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date);
  const nextEndDate = moment(endDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date + days);

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};

const fn = ({from, to, ...rest}) => ({startDate: from, endDate: to, ...rest})



export default appointments.map(fn).map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    ...makeTodayAppointment(startDate, endDate),
    ...restArgs,
  };

  console.log(restArgs)
  date += 1;
  if (date > 31) date = 1;
  return result;
});
