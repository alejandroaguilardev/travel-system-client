import { ContractDetailGeneral } from "./tabs/contact-detail-general";
import { ContractDetailPayment } from "./tabs/contact-detail-payment";
import { ContractDetailTravel } from "./tabs/contact-detail-travel";
import { ContractDetailCage } from './tabs/contact-detail-cage';
import { ContractDetailDocumentation } from "./tabs/documentation/contact-detail-documentation";
import { ContractDetailTopico } from "./tabs/contact-detail-topico";
import { ContractDetailPet } from "./tabs/contract-detail-pet";

export const tabs = [
    {
        value: "Datos Generales",
        component: <ContractDetailGeneral />
    },
    {
        value: "Datos de las Mascotas",
        component: <ContractDetailPet />
    },
    {
        value: "Topico",
        component: <ContractDetailTopico />
    },
    {
        value: "Documentación",
        component: <ContractDetailDocumentation />
    },
    {
        value: "Fase de Jaula",
        component: <ContractDetailCage />
    },
    {
        value: "Fase de Reserva",
        component: <ContractDetailTravel />
    },
    {
        value: "Cuotas de Pagos",
        component: <ContractDetailPayment />
    },
]