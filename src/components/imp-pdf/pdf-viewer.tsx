import { FC } from 'react';
import { PDFViewer as PDFViewerRender } from "@react-pdf/renderer"

export interface PdfViewerProps {
    children: JSX.Element;
    width?: number;
    height: number;
    className?: string;
}

export const PdfViewer: FC<PdfViewerProps> = ({ children, ...rest }) => (
    <PDFViewerRender {...rest} >
        {children}
    </PDFViewerRender>
)
