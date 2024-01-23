// jest.setup.ts
import '@testing-library/jest-dom';


require('dotenv').config({
    path: '.env.test'
})

jest.mock('./src/app/config/config-global.ts', () => ({
    getEnvironments: () => ({ ...process.env })
}))
