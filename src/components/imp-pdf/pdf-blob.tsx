import { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";

const openPdfInIframe = (url: string) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
        if (iframe.contentWindow) {
            iframe.contentWindow.print();
        }
    };
};


interface Props<T> {
    children: JSX.Element;
    handleDataViewerPdf: (data: T | null) => void;
}

export function PdfBlob<T>({ children, handleDataViewerPdf }: Props<T>) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        if (pdfUrl) {
            handleDataViewerPdf(null);
            openPdfInIframe(pdfUrl);
        }
    }, [pdfUrl, handleDataViewerPdf]);

    return (
        <BlobProvider
            document={children}>
            {({ url, loading, error }) => {
                if (loading) {
                    return null;
                }

                if (error) {
                    return <p>Error al generar el PDF</p>;
                }

                if (url) {
                    setPdfUrl(url);
                }
                return null;
            }}
        </BlobProvider>
    )
}
