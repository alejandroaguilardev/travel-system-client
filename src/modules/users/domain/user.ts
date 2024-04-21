import { Role } from '../../roles/domain/role';
import { UserAuthInterface } from './user-auth.interface';
import { ProfileInterface } from './user-profile.interface';
import { Status } from '../../shared/domain/status';

export interface User {
  id: string,
  email: string,
  roles: Role[],
  profile: ProfileInterface;
  user?: string;
  status?: Status;
  auth?: UserAuthInterface;
  isAdvisor?: boolean;
  isDoctor?: boolean;
}

export interface NewUser extends Omit<User, 'id' | 'roles'> {
  id?: string;
  roles?: string[];
}

export const userToNewUser = (user: User): NewUser => {

  const roles = user.roles.map((_) => {
    if (typeof _ === "string") return _;
    return _.id;
  });
  return { ...user, roles }
}