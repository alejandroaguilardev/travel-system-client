import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { FolderService } from '../../domain/folder.service';

export const folderRemover = (folderService: FolderService, uuid: UuidService) => async (folderId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(folderId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await folderService.remove(folderId);
    return response;
}