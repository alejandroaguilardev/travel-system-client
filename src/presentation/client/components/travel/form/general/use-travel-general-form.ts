import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fDaySum } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { Travel, TypeTraveling } from '../../../../../../modules/contracts/domain/contract-services/travel/contract-travel';



export const useTravelGeneralForm = () => {
  const { setValue, watch, formState } = useFormContext<Travel>();
  const typeTraveling: TypeTraveling = watch('typeTraveling');
  const code = watch('airlineReservation.code');
  const airlineReservation = watch('airlineReservation');
  const departureDate = watch("airlineReservation.departureDate");
  const arrivalDate = watch("airlineReservation.arrivalDate");




  useEffect(() => {
    if (departureDate) {
      if (typeTraveling === "charge") {
        setValue("airlineReservation.arrivalDate", fDaySum("22/10/2221", 2))
      } else {
        setValue("airlineReservation.arrivalDate", fDaySum(departureDate, 1))
      }
    }
  }, [departureDate]);

  return {
    airlineReservation,
    typeTraveling,
    code,
    departureDate,
    arrivalDate,
    formState
  }
}
