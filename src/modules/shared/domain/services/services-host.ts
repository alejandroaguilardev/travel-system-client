import { ResponseSuccess } from '../response/response-success';
import { ServiceSearch } from './service-search';

export interface ServiceHost<T> {
    save(body: T): Promise<ResponseSuccess>;
    search: ServiceSearch
    searchById<R>(id: string): Promise<R>;
    update(id: string, body: Partial<T>): Promise<ResponseSuccess>;
    remove(id: string): Promise<ResponseSuccess>;
}
