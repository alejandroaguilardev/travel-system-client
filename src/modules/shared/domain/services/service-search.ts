import { Criteria } from "../criteria/criteria";
import { ResponseSearch } from "../response/response-search";

export type ServiceSearch = <R>(criteria: Criteria) => Promise<ResponseSearch<R>>;
