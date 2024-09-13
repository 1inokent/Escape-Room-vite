import { Booking } from '../../types/booking-types/booking-types';

type BookingProps = {
  booking: Booking;
}

function BookingDate({booking}: BookingProps):JSX.Element {
  return (
    <>
      <fieldset className="booking-form__date-section">
        <legend className="booking-form__date-title">Сегодня</legend>
        <div className="booking-form__date-inner-wrapper">
          {
            booking.slots.today.map((todaySlot) => (
              <label className="custom-radio booking-form__date" key={todaySlot.time}>
                <input
                  type="radio"
                  id={todaySlot.time}
                  name="date"
                  required
                  value={todaySlot.time}
                  disabled={!todaySlot.isAvailable}
                />
                <span className="custom-radio__label">{todaySlot.time}</span>
              </label>
            ))
          }
        </div>
      </fieldset>

      <fieldset className="booking-form__date-section">
        <legend className="booking-form__date-title">Завтра</legend>
        <div className="booking-form__date-inner-wrapper">
          {
            booking.slots.tomorrow.map((tomorrowSlot) => (
              <label className="custom-radio booking-form__date" key={tomorrowSlot.time}>
                <input
                  type="radio"
                  id={tomorrowSlot.time}
                  name="date"
                  required
                  value={tomorrowSlot.time}
                  disabled={!tomorrowSlot.isAvailable}
                />
                <span className="custom-radio__label">{tomorrowSlot.time}</span>
              </label>
            ))
          }
        </div>
      </fieldset>
    </>
  );
}

export default BookingDate;
