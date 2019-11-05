import { Description } from '../../../shared/models/description';

export class Option {
  id?: number;
  code: string;
  type: string;
  order: string;
  descriptions: Description[];
}
