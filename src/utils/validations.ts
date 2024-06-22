import moment, { unitOfTime } from 'moment';
import { string } from 'yup';

interface IValidateFieldDate {
  toData: string;
  key: string;
  message: string;
  typeValidate: unitOfTime.StartOf;
  formatDate?: string;
}

export const validateFieldFromDate = ({
  toData,
  key,
  message,
  typeValidate,
}: IValidateFieldDate) => {
  return string().test(key, message, function (value) {
    return !moment(value).isAfter(moment(this.parent[toData]), typeValidate);
  });
};

export const validateFieldToDate = ({
  toData,
  key,
  message,
  typeValidate,
}: IValidateFieldDate) => {
  return string().test(key, message, function (value) {
    return !moment(value).isBefore(moment(this.parent[toData]), typeValidate);
  });
};
