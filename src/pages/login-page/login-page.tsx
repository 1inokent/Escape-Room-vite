import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';

import { QuestPage } from '../../types/quests-types/quest-page-types';
import { AppRoute, AuthorizationStatus } from '../../const';
import { loginAction } from '../../store/api-actions';

type FormInputProps = {
  userEmail: string;
  userPassword: string;
}

interface LocationState {
  from?: string;
}

function LoginPage():JSX.Element {
  const dispatch = useAppDispatch();
  const questPage = useAppSelector<QuestPage | null>((state) => state.questPage);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const from = state?.from || AppRoute.Main;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputProps>();

  const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
    try {
      setIsSubmitting(true);
      await dispatch(loginAction({
        login: data.userEmail,
        password: data.userPassword,
      })).unwrap();
      setErrorMessage(null);
      navigate(from);
    } catch (error) {
      setErrorMessage('Не удалось выполнить вход. Пожалуйста, проверьте данные и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(from);
    }
  }, [authorizationStatus, from, navigate]);

  if (!questPage) {
    return <SpinnerLoader />;
  }

  return (
    <div className="wrapper">
      <Header />

      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={questPage.coverImgWebp}
            />
            <img
              src={questPage.previewImg}
              srcSet={questPage.coverImg}
              alt={questPage.title}
              width="1366"
              height="768"
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form
              className="login-form"
              action="https://echo.htmlacademy.ru/"
              method="post"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Адрес электронной почты"
                      disabled={isSubmitting}
                      {...register('userEmail', {
                        required: 'Email обязателен',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Введите корректный email'
                        }
                      })}
                    />
                    {errors.userEmail && <p className="error-message">{errors.userEmail.message}</p>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Пароль"
                      disabled={isSubmitting}
                      {...register('userPassword', {
                        required: 'Пароль обязателен',
                        minLength: { value: 3, message: 'Пароль должен быть минимум 3 символа' },
                        maxLength: { value: 15, message: 'Пароль должен быть максимум 15 символов' },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,15}$/,
                          message: 'Пароль должен содержать хотя бы одну букву и одну цифру'
                        }
                      })}
                    />
                    {errors.userPassword && <p className="error-message">{errors.userPassword.message}</p>}
                  </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Войти
                </button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
                  name="user-agreement"
                  required
                />
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#">
                  правилами обработки персональных данных
                  </a>&nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
