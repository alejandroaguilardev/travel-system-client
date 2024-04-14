export const contractServiceMock = {
    save: jest.fn(),
    remove: jest.fn(),
    search: jest.fn(),
    searchById: jest.fn(),
    update: jest.fn(),
    searchClientById: jest.fn(),
    searchClient: jest.fn(),
    finish: jest.fn(),
    finishClient: jest.fn(),
    cancel: jest.fn(),
    updateFolder: jest.fn(),
    updatePayment: jest.fn(),
}

export const contractDetailServiceMock = {
    remove: jest.fn(),
    search: jest.fn(),
    searchById: jest.fn(),
    updateDocumentation: jest.fn(),
    updateCage: jest.fn(),
    updateTravel: jest.fn(),
}
