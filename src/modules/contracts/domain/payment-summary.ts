import { ErrorDomain } from "../../shared/domain/errors/error-domain";
import { CustomerPayment } from "./customer-payments";

export interface PayInInstallment {
    price: number;
    percentage: number;
    date: Date;
    isPay: boolean;
    customerPayments?: CustomerPayment[];
}



export const securePayInInstallments = (payInInstallments: PayInInstallment[]) => {
    payInInstallments.forEach(_ => {

        if (!_.date || !_.percentage || !_.price) {
            throw new ErrorDomain(
                "Debe especificar  todos los plazos de pago",
                400,
                ErrorDomain.error.INVALID_ARGUMENT
            );

        }
    })
}
