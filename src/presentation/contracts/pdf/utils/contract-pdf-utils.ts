import { fCurrency } from "../../../../modules/shared/domain/helpers/format-number";
import { fDate, fMonthDiffText } from "../../../../modules/shared/infrastructure/helpers/format-time";
import { Contract } from "../../../../modules/contracts/domain/contract";

export const numberPets = (quantity: number): string => quantity.toString().padStart(2, '0');

export const priceToPay = (contract: Contract): string => {
    const text = `Se deberá realizar {{pays}} a la firma del presente contrato {{dates}} Se podrá realizarse en efectivo y/o con depósito bancario a la siguiente cuenta N° 0011-0366-0200127294 cuenta ahorros en dólares del banco BBVA Continental. CCI cuenta ahorros dólares del banco BBVA Continental N° 0011-0366-000200127294-23.`




    if (contract?.payInInstallments && contract?.payInInstallments?.length > 1) {
        const pays = contract?.payInInstallments.filter(_ => _.isPay);
        const dates = contract?.payInInstallments.filter(_ => !_.isPay);

        return text
            .replace("{{pays}}", pays.length > 2
                ? `los pagos ${pays.map(_ => _.percentage).join("%, ")}% ($ ${pays.map(_ => _.price).join(", ")})`
                : `el pago ${pays[0].percentage}% ($${pays[0].price})`)
            .replace("{{dates}}", dates.length > 2
                ? `y los pagos ${dates.map(_ => _.percentage).join("%, ")}% ($ ${dates.map(_ => _.price).join(", ")}) restantes, las fechas ${dates.map(_ => fDate(_.date)).join(", ")}.`
                : `y el ${dates[1].percentage} ($${dates[1].price}) restante, ${fMonthDiffText(dates[1].date)}.`)
    }




    return text
        .replace("{{pays}}", `el pago del ${fCurrency(contract.price)} `)
        .replace("{{dates}}", ".")
}


export const destinationCountry = (contract: Contract): string => {
    const countries = contract.details.map(_ => _.travel.destination.countryDestination);
    return countries.join(",")

}