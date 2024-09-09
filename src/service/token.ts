import { AUTH_TOKEN_KEY } from '../const';

type Token = string;

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

const saveToken = (token: Token): void =>
  localStorage.setItem(AUTH_TOKEN_KEY, token);

const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

export { getToken, saveToken, dropToken };
