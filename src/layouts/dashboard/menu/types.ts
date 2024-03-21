import { ReactNode } from "react";

export type ItemSubMenu = {
    title: string;
    path: string;
}

export type ItemMenu = {
    title: string,
    path: string,
    icon: JSX.Element;
    children?: ItemSubMenu[]
}