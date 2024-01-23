import axios from 'axios';
import { HOST_API } from '../../../../app/config/config-global';

const axiosInstance = axios.create({ baseURL: HOST_API });


axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'No se logró procesar el error, comunicarse con el administrador')
);

export default axiosInstance;