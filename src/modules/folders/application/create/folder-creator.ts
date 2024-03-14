import { NewFolder, Folder } from '../../domain/folder';
import { FolderService } from '../../domain/folder.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const folderCreator = (folderService: FolderService, uuid: UuidService) => async (folder: NewFolder): Promise<ResponseSuccess> => {
    folder.id = uuid.generate()!;
    const response = await folderService.save(folder as Folder);
    return response;
}