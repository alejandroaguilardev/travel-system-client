import { TOPICO_KEYS } from '../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const topicMessageMail = (value: string): string => {
    const name = replace(value);
    const message = `Tenemos el agrado de anunciar que ${name}, garantizando la efectividad y seguridad del proceso. Por favor, asegúrate de liquidar cualquier saldo pendiente a la brevedad. Esto permitirá que los resultados sean liberados sin demora.`
    return message;
}

const replace = (value: string) => {
    if (TOPICO_KEYS.chip === value) return "el microchip fue implantado exitosamente";
    if (TOPICO_KEYS.vaccination === value) return "la vacuna fue administrada exitosamente ";
    if (TOPICO_KEYS.rabiesReVaccination === value) return "la vacuna de rabia fue administrada exitosamente";
    if (TOPICO_KEYS.rabiesVaccination === value) return "la re vacuna fue administrada exitosamente";
    if (TOPICO_KEYS.takingSampleSerologicalTest === value) return "la toma de muestra se realizó exitosamente";
    if (value === "rabiesSeroLogicalTest") return "El resultado del test serological de rabia es positivo";
    if (TOPICO_KEYS.chipReview === value) return "se reviso el microchip";


    return "los procedimientos fueron realizados correctamente";
}