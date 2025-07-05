import React, { useState, useEffect } from 'react';
import './home.css';

const Dropdownx = ({yearY, monthY, dayY, timeY}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const nextThreeDays = new Array(7).fill(null).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index);
      return date;
    });

    setDateOptions(nextThreeDays);
  }, []);

  const handleDateChange = (event) => {
    const value = event.target.value;

    const yearx = value.substring(0, 4);
    const monthx = value.substring(5, 7);
    const dayx = value.substring(8, 10);
    const timex = value.substring(25, 30);

    // Update state variables based on the selected date and time slot
    setSelectedDate(`${yearx}/${monthx}/${dayx}`);
    setSelectedTimeSlot(timex);
};


  
  

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const currentHour = new Date().getHours();
  const availableTimeSlots = [
    { label: '8:00 AM - 12:00 PM', value: '8-12' },
    { label: '12:00 PM - 2:00 PM', value: '12-2' },
    { label: '2:00 PM - 4:00 PM', value: '02-04' },
    { label: '4:00 PM - 6:00 PM', value: '04-06' },
    { label: '6:00 PM - 8:00 PM', value: '06-08' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <select
        id="date"
        onChange={handleDateChange}
        value={`${selectedDate}-${selectedTimeSlot}`}
        className='home-select'
      >
        <option value="" disabled>
          Select a date
        </option>
        {dateOptions.map((date) => (
          <optgroup key={date.toISOString()} label={date.toDateString()} style={{ borderBottom: '1px solid black' }}>
            {availableTimeSlots.map((slot) => (
              <option key={`${date.toISOString()}-${slot.value}`} value={`${date.toISOString()}-${slot.value}`}>
                {slot.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* <p>
        Selected Date: {selectedDate}
        <br />
        Selected Time Slot: {selectedTimeSlot || 'N/A'}
      </p> */}
    </div>
  );
};

export default Dropdownx;
