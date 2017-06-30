export const required = value =>
  (value ? undefined : 'Required');

export const requiredArray = value =>
  (value && value.length ? undefined : 'Required');

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

export const tasksMin = sended => max =>
  Number(max) < Number(sended)
  ? undefined
  : `Min hours ${max} should be less than Max hours ${sended}`;

export const tasksMax = sended => max =>
  Number(sended) < Number(max)
  ? undefined
  : `Max hours ${sended} should be bigger than Min hours ${max}`;