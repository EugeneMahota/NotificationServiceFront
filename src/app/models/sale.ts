import {Product} from './product';

export class Sale {
  id: string;
  name: string;
  telephone: number;
  info: string;
  status: string;
  address: string;
  flPickup: boolean;
  date: Date;
  product: Product[];
  sum: number;
}
