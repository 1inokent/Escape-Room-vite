import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { BookingPayload } from '../../types/booking-types/booking-types';
import { Quest } from '../../types/quests-types/quests-types';

import { useHookFormMask } from 'use-mask-input';

type questProprs = {
  quest: Quest;
  register: UseFormRegister<BookingPayload>;
  errors: FieldErrors<BookingPayload>;
  isSubmitting: boolean;
}

function BookingForm({quest, errors, register, isSubmitting}: questProprs): JSX.Element {
  const registerWithMask = useHookFormMask(register);

  return (
    <>
      <fieldset className="booking-form__section" disabled={isSubmitting}>
        <legend className="visually-hidden">Контактная информация</legend>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="contactPerson">Ваше имя</label>
          <input
            type="text"
            id="contactPerson"
            {...register('contactPerson', {
              required: 'Имя обязательно для заполнения',
              pattern: {
                value: /^[А-Яа-яЁёA-Za-z'-]{1,15}$/,
                message: 'Имя должно содержать от 1 до 15 символов'
              }
            })}
            placeholder="Имя"
          />
          {errors.contactPerson && <p className="error-message">{errors.contactPerson.message}</p>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="phone">Контактный телефон</label>
          <input
            type="tel"
            id="phone"
            {...registerWithMask('phone', '+7(999)999-99-99', {
              required: 'Телефон обязателен для заполнения',
              pattern: {
                value: /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
                message: 'Введите телефон в формате +7(999)999-99-99'
              }
            })}
            placeholder="Телефон"
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="peopleCount">Количество участников</label>
          <input
            type="number"
            id="peopleCount"
            {...register('peopleCount', {
              valueAsNumber: true,
              required: 'Количество участников обязательно для заполнения',
              min: {
                value: quest.peopleMinMax[0],
                message: `Минимальное количество участников: ${quest.peopleMinMax[0]}`
              },
              max: {
                value: quest.peopleMinMax[1],
                message: `Максимальное количество участников: ${quest.peopleMinMax[1]}`
              }
            })}
            placeholder="Количество участников"
          />
          {errors.peopleCount && <p className="error-message">{errors.peopleCount.message}</p>}
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="withChildren"
            {...register('withChildren')}
          />
          <span className="custom-checkbox__icon">``
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={isSubmitting}
      >Забронировать
      </button>
    </>
  );
}

export default BookingForm;
