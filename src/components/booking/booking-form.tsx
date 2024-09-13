import { useForm } from 'react-hook-form';
import { QuestPage } from '../../types/quests-types/quest-page-types';

type FormValues = {
  name: string;
  tel: string;
  person: number;
  children?: boolean;
};

type questProprs = {
  quest: QuestPage;
}

function BookingForm({quest}: questProprs): JSX.Element {
  const { register, formState: { errors } } = useForm<FormValues>();

  return (
    <>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'Имя обязательно для заполнения',
              pattern: {
                value: /^[А-Яа-яЁёA-Za-z'-]{1,15}$/,
                message: 'Имя должно содержать от 1 до 15 символов'
              }
            })}
            placeholder="Имя"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            {...register('tel', {
              required: 'Телефон обязателен для заполнения',
              pattern: {
                value: /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
                message: 'Введите телефон в формате +7 (000) 000-00-00'
              }
            })}
            placeholder="Телефон"
          />
          {errors.tel && <p className="error-message">{errors.tel.message}</p>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            {...register('person', {
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
          {errors.person && <p className="error-message">{errors.person.message}</p>}
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="children"
            checked
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>

      <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
    </>
  );
}

export default BookingForm;
