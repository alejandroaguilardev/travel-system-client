import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAuthContext } from '../../../../../auth/hooks/use-auth-context';
import { fDate } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { TypeTraveling } from '../../../../../../modules/contracts/domain/contract-services/travel/contract-travel';



export const useTravelGeneralForm = () => {
  const { setValue, watch } = useFormContext();
  const { user } = useAuthContext();
  const typeTraveling: TypeTraveling = watch('typeTraveling');
  const code: TypeTraveling = watch('airlineReservation.code');
  const airlineReservation = watch('airlineReservation');
  const petPerCharge = watch('petPerCharge');
  const departureDate = fDate(watch("airlineReservation.departureDate"), 'yyyy-MM-dd');
  const arrivalDate = fDate(watch("airlineReservation.arrivalDate"), 'yyyy-MM-dd');

  const editPermit = (readonly: boolean, user?: boolean): boolean => {
    if (readonly) {
      if (user) return false;
      return readonly;
    }
    if (user) return true;

    return false;
  }

  useEffect(() => {
    setValue("airlineReservation.user", user?.id)
  }, [airlineReservation]);

  useEffect(() => {
    setValue("petPerCharge.user", user?.id)
  }, [petPerCharge])


  return {
    typeTraveling,
    code,
    departureDate,
    arrivalDate,
    editPermit,
  }
}
