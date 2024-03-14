import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Folder } from '../domain/folder';
import { FolderService } from '../domain/folder.service';
import { endpoints } from '../../shared/domain/endpoint';


export const folderService: FolderService = {
    ...servicesHost<Folder>(axiosInstance, endpoints.folders.root),
} 
