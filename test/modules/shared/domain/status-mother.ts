import { getRandomInteger } from '../../../../src/modules/shared/domain/helpers/random-number';
import { STATUS } from "../../../../src/modules/shared/domain/status";
import { Status } from '../../../../src/modules/shared/domain/status';

const rand = getRandomInteger({ max: 1 });


export const StatusMother = (status?: Status) => status ?? STATUS[rand]