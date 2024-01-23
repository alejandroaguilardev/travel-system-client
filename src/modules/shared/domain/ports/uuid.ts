export interface UuidService {
    generate: () => string;
    validate: (uuid: string) => boolean
}