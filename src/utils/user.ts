import { AuthenticationResponseData } from '../types/user';

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    throw new Error('Email is not valid.');
  }
}

export function validateUsername(username: string) {
  if (!username) {
    throw new Error('Username is not valid.');
  }
}

export function validatePassword(password: string) {
  const lengthCheck = /^.{8,20}$/;
  const letterAndNumberCheck = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

  if (!lengthCheck.test(password)) {
    throw new Error('Password is not valid.');
  }

  if (!letterAndNumberCheck.test(password)) {
    throw new Error('Password is not valid.');
  }
}

export function storeAuthenticationResponseDataToLocalStorage(
  data: AuthenticationResponseData
) {
  const {
    accessToken,
    user: { email, username },
  } = data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userInfo', JSON.stringify({ email, username }));
}
