import { Auth } from './auth';
import { ResponseSuccess } from '../../shared/domain/response/response-success';

export interface AuthService {
  login(email: string, password: string, tokenReCaptcha: string): Promise<Auth>;
  resetPassword(password: string): Promise<Auth>;
  recover(email: string, tokenReCaptcha: string): Promise<ResponseSuccess>;
  verify(): Promise<Auth>;
}
