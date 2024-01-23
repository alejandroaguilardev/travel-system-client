import { Role } from '../../roles/domain/role';

export interface User {
  id: string,
  name: string,
  secondName?: string,
  lastName: string,
  secondLastName?: string,
  email: string,
  roles: Role[],
}



export interface NewUser extends Omit<User, 'id' | 'roles'> {
  id?: string;
  roles?: string[];
  password?: string;
}


export const userToNewUser = (user: User): NewUser => {

  const roles = user.roles.map((_) => {
    if (typeof _ === "string") return _;
    return _.id;
  });
  return { ...user, roles }
}