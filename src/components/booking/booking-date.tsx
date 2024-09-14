import { FieldErrors } from 'react-hook-form';
import { ChangeEventHandler } from 'react';

import { Booking, BookingPayload, Slot } from '../../types/booking-types/booking-types';

type BookingProps = {
  booking: Booking;
  errors: FieldErrors<BookingPayload>;
  onChange: (value: Slot) => void;
  value: Slot | null;
  isSubmitting: boolean;
}

const TODAY_OR_TOMMOROW = {
  TODAY: 'today',
  TOMMOROW: 'tomorrow'
} as const;

function BookingDate({booking, onChange, errors, value, isSubmitting}: BookingProps):JSX.Element {
  const handleChange = (date: 'today' | 'tomorrow', time: string): ChangeEventHandler<HTMLInputElement> => () => {
    onChange({
      date,
      time,
    });
  };

  return (
    <>
      <fieldset className="booking-form__date-section" disabled={isSubmitting}>
        <legend className="booking-form__date-title">Сегодня</legend>
        <div className="booking-form__date-inner-wrapper">
          {
            booking.slots.today.map((todaySlot) => (
              <label className="custom-radio booking-form__date" key={todaySlot.time}>
                <input
                  type="radio"
                  name="booking-time"
                  id={todaySlot.time}
                  checked={value?.time === todaySlot.time && value?.date === TODAY_OR_TOMMOROW.TODAY}
                  disabled={!todaySlot.isAvailable}
                  onChange={handleChange(TODAY_OR_TOMMOROW.TODAY, todaySlot.time)}
                />
                <span className="custom-radio__label">{todaySlot.time}</span>
              </label>
            ))
          }
        </div>
      </fieldset>

      <fieldset className="booking-form__date-section" disabled={isSubmitting}>
        <legend className="booking-form__date-title">Завтра</legend>
        <div className="booking-form__date-inner-wrapper">
          {
            booking.slots.tomorrow.map((tomorrowSlot) => (
              <label className="custom-radio booking-form__date" key={tomorrowSlot.time}>
                <input
                  type="radio"
                  name="booking-time"
                  id={tomorrowSlot.time}
                  checked={value?.time === tomorrowSlot.time && value?.date === TODAY_OR_TOMMOROW.TOMMOROW}
                  disabled={!tomorrowSlot.isAvailable}
                  onChange={handleChange(TODAY_OR_TOMMOROW.TOMMOROW, tomorrowSlot.time)}
                />
                <span className="custom-radio__label">{tomorrowSlot.time}</span>
              </label>
            ))
          }
        </div>
      </fieldset>
      {errors.date && <p className="error-message">{errors.date.message}</p>}
      {errors.time && <p className="error-message">{errors.time.message}</p>}
    </>
  );
}

export default BookingDate;
