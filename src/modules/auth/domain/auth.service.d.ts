import { Auth } from './auth';

export interface AuthService {
  login(email: string, password: string): Promise<Auth>;
  verify(): Promise<Auth>;
}
