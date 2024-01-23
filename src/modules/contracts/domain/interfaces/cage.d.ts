import { CageChosen } from '../cage/cage-chosen';
import { StatusDefinition } from '../contract-status';

export interface CageDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  swornDeclaration: boolean;
  chosen: CageChosen;
  recommendation?: string;
}
