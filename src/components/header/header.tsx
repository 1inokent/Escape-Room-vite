import { Link, useLocation } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../hook';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);

  const navItems = [
    { name: 'Квесты', path: AppRoute.Main },
    { name: 'Контакты', path: '/contacts' },
    ...(authorizationStatus === AuthorizationStatus.Auth ?
      [{ name: 'Мои бронирования', path: '/my-quests' }] : [])
  ];

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <Link to={AppRoute.Main}>
          <span className="logo header__logo">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {
              navItems.map((item) => (
                <li className="main-nav__item" key={item.path}>
                  <Link
                    className={`link ${location.pathname === item.path ? 'active' : ''}`}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
        <div className="header__side-nav">
          {
            authorizationStatus === AuthorizationStatus.Auth ? (
              <>
                <Link
                  className="btn btn--accent header__side-item"
                  to={AppRoute.Login}
                  onClick={handleLogout}
                >Выйти
                </Link>
                <a className="link header__side-item header__phone-link" href="tel:88003335599">{userEmail}</a>
              </>
            ) :
              <Link className="btn btn--accent header__side-item" to={AppRoute.Login}>
              Вход
              </Link>
          }

        </div>
      </div>
    </header>
  );
}

export default Header;
