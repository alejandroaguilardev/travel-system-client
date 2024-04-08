export const pdfStyles = {
    page: {
        backgroundColor: '#ffffff',
        color: "#444",
        fontFamily: "Roboto",
    },
    container: {
        margin: 30,
        padding: 10,
        fontSize: 10,
        lineHeight: 1.2,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000",
    },
    subtitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000",
    },
    small: {
        fontSize: 8,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap"

    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: "wrap"
    },
    important: {
        color: "#000",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    superTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000",
        fontSize: 9
    },
    leftSpace: {
        marginLeft: 10,
    },
    textWhite: {
        color: "#fff"
    }
} as const;
