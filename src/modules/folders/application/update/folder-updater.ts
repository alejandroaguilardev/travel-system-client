import { Folder, NewFolder } from '../../domain/folder';
import { FolderService } from '../../domain/folder.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const folderUpdater = (folderService: FolderService, uuid: UuidService) => async (folderId: string, folder: NewFolder): Promise<ResponseSuccess> => {

    if (!uuid.validate(folderId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    const response = await folderService.update(folderId, folder as Folder);
    return response;
}