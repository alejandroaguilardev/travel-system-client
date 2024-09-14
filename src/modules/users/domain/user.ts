import { Role } from '../../roles/domain/role';
import { UserAuthInterface } from './user-auth.interface';
import { ProfileInterface } from './user-profile.interface';
import { Status } from '../../shared/domain/status';

export interface User {
  id: string,
  email?: string,
  roles: Role[],
  profile: ProfileInterface;
  user?: string;
  status?: Status;
  auth?: UserAuthInterface;
  isAdvisor?: boolean;
  isDoctor?: boolean;
  linkWhatsApp?: string;
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

export const getLinkWhatApp = (user?: User): string => {
  if (user?.linkWhatsApp) {
    return user.linkWhatsApp
  }
  if (user?.profile?.phone) {
    return `https://wa.me/${user.profile.phone}`
  }
  return `https://wa.me/51994748870`;
}