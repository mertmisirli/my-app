import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles for react-calendar
import '../styles/Calendar.css'; // Add custom styles for your page (optional)
import Header from '../components/Header';
import Footer from '../components/Footer';

const WorkoutCalendar = () => {
  // Default selected date
  const [date, setDate] = useState(new Date());

  // Sample workout data - this would come from your backend or state management
  const workouts = {
    '2024-12-16': 'Upper Body Workout - Pushups, Dumbbell Press, Biceps Curls',
    '2024-12-18': 'Leg Day - Squats, Lunges, Leg Press',
    '2024-12-20': 'Cardio - 30-minutes Running',
  };

  // Handle date change
  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Display workout for a specific date
  const displayWorkout = (date) => {
    const dateKey = date.toISOString().split('T')[0]; // format date as 'YYYY-MM-DD'
    return workouts[dateKey] || 'No workout scheduled for this day';
  };

  return (

    <>

      <Header />
      <div className="calendar-container">
        <h2>Workout Calendar</h2>

        <div className="row">

          <div className="col-md-6 ">
            <div className="calendar-wrapper d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
              <Calendar
                onChange={onDateChange}
                value={date}
                tileClassName={({ date, view }) => {
                  const dateKey = date.toISOString().split('T')[0];
                  if (workouts[dateKey]) {
                    return 'workout-scheduled';
                  }
                  return '';
                }}
              />
            </div>
          </div>


          <div className="col-md-6 mt-sm-4 mt-lg-0">
            <div className="calendar-content d-flex justify-content-center align-items-center" style={{ }}>
              {/* React Calendar component */}
              <div className="workout-details text-center">
                <h3>Workout Details for {date.toLocaleDateString()}</h3>
                <p>{displayWorkout(date)}</p>

                <button className="mark-completed-btn">Mark as Completed</button>
                <button className="add-workout-btn">Add Workout</button>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="row mt-5">
        <p>My Plans</p>
      </div>

      <Footer />

    </>
  );
};

export default WorkoutCalendar;
