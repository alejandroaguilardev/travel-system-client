import { ServiceHost } from '../../shared/domain/services/services-host';
import { NewUser } from './user';

export interface UserService extends ServiceHost<NewUser> { }
