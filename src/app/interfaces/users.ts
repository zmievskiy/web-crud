import {Cars} from './cars';

export interface Users {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  cars: Cars[];
}
