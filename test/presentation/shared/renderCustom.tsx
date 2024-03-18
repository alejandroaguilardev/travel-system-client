import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ImpContractProvider } from "../../../src/components/imp-pdf/imp-contract/imp-contract-context";

export const renderCustom = (children: ReactNode) => render(
    <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ImpContractProvider>
                {children}
            </ImpContractProvider>
        </LocalizationProvider>
    </MemoryRouter>
);
