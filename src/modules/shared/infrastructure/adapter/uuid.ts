import { v4 as uuid, validate } from "uuid";
import { UuidService } from "../../domain/ports/uuid";


export default { generate: uuid, validate } as UuidService;