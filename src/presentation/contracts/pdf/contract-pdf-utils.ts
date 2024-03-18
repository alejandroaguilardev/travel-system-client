import { fCurrency } from "../../../modules/shared/domain/helpers/format-number";
import { fDateTimeLong } from "../../../modules/shared/infrastructure/helpers/format-time";
import { Contract } from "../../../modules/contracts/domain/contract";

export const numberPets = (quantity: number): string => quantity.toString().padStart(2, '0');

export const priceToPay = (contract: Contract): string => {
    const text = `Se realiza el pago a la firma del presente contrato, {{price}}, siendo con fecha ${fDateTimeLong(contract.startDate)}, vía depósito bancario a la cuenta dólares del banco BBVA Continental N° 0011-0366-0200127294 o a la cuenta soles del banco BBVA Continental N° 0011-0366-0200127286.`

    if (contract?.payInInstallments && contract?.payInInstallments?.length > 1) {
        const prices = contract?.payInInstallments.map(({ date, percentage, price }, index) => {
            if (index === 0) {
                return `con el abono del ${percentage}% del monto acordado en efectivo y/o con transferencia( ${fCurrency(price)} dólares americanos)`
            }
            return `el saldo del ${percentage}% (${fCurrency(price)} dólares americanos) deberá ser abonado el ${fDateTimeLong(date)}`
        })

        return text.replace("{{price}}", prices.join(", "));
    }
    return text.replace("{{price}}", `con el abono de ${fCurrency(contract.price)} del monto acordado en efectivo y/o con transferencia`);
}

export const destination = (contract: Contract): string => {
    if (contract.details.length > 1) {
        const countries = contract.details.map(_ => _.travel.destination.countryDestination);
        return countries.length > 0
            ? `mascotas, cuyos destinos son ${countries.join(",")}`
            : "mascotas"
    }

    return contract.details?.[0]?.travel?.destination?.countryDestination
        ? `mascota, cuyo país de destino es ${contract.details[0].travel.destination.countryDestination}`
        : "mascota";
}