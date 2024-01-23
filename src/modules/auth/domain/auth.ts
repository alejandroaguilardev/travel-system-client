import { User } from '../../users/domain/user';

export interface Auth {
    user: User;
    token: string;
}