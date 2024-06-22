import moment from 'moment';

export function formatDate(value, format = 'DD/MM/YYYY', type?) {
  return value && value !== '0000-00-00 00:00:00'
    ? moment(value, type).format(format)
    : '';
}

function isValidDate(dateString) {
  if (!dateString) {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(Number(date?.getTime()));
}

export function formatDateInput(value) {
  const newDate = isValidDate(value) ? new Date(value) : null;
  return newDate ? moment(newDate).format('YYYY-MM-DD') : '';
}
