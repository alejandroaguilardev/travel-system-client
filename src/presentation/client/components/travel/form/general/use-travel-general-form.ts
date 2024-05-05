import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAuthContext } from '../../../../../auth/hooks/use-auth-context';
import { fDaySum, fDate } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { TypeTraveling } from '../../../../../../modules/contracts/domain/contract-services/travel/contract-travel';



export const useTravelGeneralForm = () => {
  const { setValue, watch } = useFormContext();
  const { user } = useAuthContext();
  const typeTraveling: TypeTraveling = watch('typeTraveling');
  const code: TypeTraveling = watch('airlineReservation.code');
  const airlineReservation = watch('airlineReservation');
  const petPerCharge = watch('petPerCharge');
  const departureDate = watch("airlineReservation.departureDate");
  const arrivalDate = watch("airlineReservation.arrivalDate");

  useEffect(() => {
    if (!airlineReservation) {
      setValue("airlineReservation.user", user?.id)
    }
  }, [airlineReservation]);

  useEffect(() => {
    if (!petPerCharge) {
      setValue("petPerCharge.user", user?.id)
    }
  }, [petPerCharge])


  useEffect(() => {
    if (departureDate) {
      if (typeTraveling === "charge") {
        setValue("airlineReservation.arrivalDate", fDate(fDaySum(departureDate, 2), "YYYY MM DD"))
      } else {
        setValue("airlineReservation.arrivalDate", fDate(fDaySum(departureDate, 1), "YYYY MM DD"))
      }
    }
  }, [departureDate]);

  return {
    typeTraveling,
    code,
    departureDate,
    arrivalDate,
  }
}
