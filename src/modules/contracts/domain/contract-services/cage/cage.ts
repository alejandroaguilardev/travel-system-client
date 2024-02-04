import { CageChosen } from './cage-chosen';
import { ContractStatus } from '../../contract-status';

export interface Cage {
  status: ContractStatus;
  hasServiceIncluded: boolean;
  chosen: CageChosen;
  recommendation?: string;
}
