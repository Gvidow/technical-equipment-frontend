import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'date-fns';
import ru from 'date-fns/locale/ru';

const Calendar: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(true);

  const handleButtonClick = () => {
    // setCalendarOpen(!calendarOpen);
  };

  return (
    <>
    {/* <div>
    <button onClick={handleButtonClick}>Открыть календарь</button> */}
      {calendarOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          dateFormat='dd.MM.yyyy'
          locale={ru}
        />
      )}
    {/* </div> */}
    </>
  );
};

export default Calendar;
