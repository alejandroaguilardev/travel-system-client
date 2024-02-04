import { Cage } from './cage/cage';
import { Documentation } from './documentation/documentation';
import { Travel } from './travel/travel';

export interface ContractServices {
  documentation: Documentation;
  cage: Cage;
  travel: Travel;
}
