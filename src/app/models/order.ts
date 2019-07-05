import {Service} from './service';

export class Order {
  id: string;
  name: string;
  telephone: number;
  date: Date;
  status: string;
  service: Service;
  info: string;
}
