import { CageChosen } from './cage-chosen';
import { ContractDetailStatus } from '../../contract-status';

export interface Cage {
  status: ContractDetailStatus;
  hasServiceIncluded: boolean;
  chosen: CageChosen;
  confirmation?: boolean;
  petTravelAcquisition?: boolean;
  isCabinTransporting?: boolean;
}
