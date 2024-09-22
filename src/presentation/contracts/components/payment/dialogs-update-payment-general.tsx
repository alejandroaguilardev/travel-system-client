import { PayInInstallment } from '../../../../modules/contracts/domain/payment-summary';
import { ConfirmPayTotal } from './general/types';
import { DialogUpdatePaymentGeneralParcial } from './general/update-upayment-general-parcial/dialog-update-payment-general-parcial';
import { DialogUpdatePaymentGeneralTotal } from './general/update-upayment-general-total/dialog-update-payment-general-total';
import { useUpdatePaymentGeneral } from './general/use-update-payment-general';
import { validateParcialPay } from '../../../../modules/contracts/domain/customer-payments';

type Props = {
    isOpen: boolean;
    payValues: ConfirmPayTotal | null;
    index?: number;
    payInInstallment?: PayInInstallment;
    payInInstallments: PayInInstallment[],
    onChangePayInInstallments: (updatedPayInInstallments: PayInInstallment[]) => void;
    handleClose: () => void;
}

export const DialogsUpdatePaymentGeneral = ({ index, isOpen, payValues, payInInstallments, payInInstallment, onChangePayInInstallments, handleClose }: Props) => {

    const { priceCustomer, dateCustomer, methodPayment, handlePayTotalOrCancel, handlePayParcial, setDate, setPriceCustomer, setMethodPayment } = useUpdatePaymentGeneral(payInInstallments, onChangePayInInstallments);

    return (
        <>
            <DialogUpdatePaymentGeneralTotal
                payValues={payValues}
                handlePayTotalOrCancel={handlePayTotalOrCancel}
                methodPayment={methodPayment}
                handleMethodPayment={(value) => setMethodPayment(value)}
            />
            {payInInstallment &&
                <DialogUpdatePaymentGeneralParcial
                    index={index ?? 0}
                    isOpen={isOpen}
                    payInInstallment={payInInstallment}
                    priceCustomer={priceCustomer}
                    dateCustomer={dateCustomer}
                    methodPayment={methodPayment}
                    handleMethodPayment={(value) => setMethodPayment(value)}
                    handlePayParcial={handlePayParcial}
                    handleChangeDate={(date) => setDate(date)}
                    handlePriceCustomer={(price) => setPriceCustomer(price)}
                    handleClose={() => {
                        handleClose();
                        setPriceCustomer(0);
                    }}
                    isDisabled={!validateParcialPay(payInInstallment?.isPay)}
                />
            }

        </>
    )
}
