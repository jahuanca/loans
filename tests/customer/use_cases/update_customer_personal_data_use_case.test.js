jest.mock('../../../src/customer/repositories', () => ({
    findCustomerByIdRepository: jest.fn(),
    updateCustomerPersonalDataRepository: jest.fn(),
}))

const {
    findCustomerByIdRepository,
    updateCustomerPersonalDataRepository,
} = require('../../../src/customer/repositories')
const updateCustomerPersonalDataUseCaseExecute = require('../../../src/customer/use_cases/customer/update_customer_personal_data_use_case')

const input = {
    id: 3,
    idUser: 42,
    idTypeDocument: 1,
    document: '12345678',
    name: 'Jose',
    lastName: 'Perez',
    phone: '987654321',
}

describe('Update Customer personal data use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el cliente no existe, no debe actualizar', async () => {
        findCustomerByIdRepository.mockResolvedValue(null)

        await expect(updateCustomerPersonalDataUseCaseExecute(input)).rejects.toThrow('El cliente no existe')
        expect(updateCustomerPersonalDataRepository).not.toHaveBeenCalled()
    })

    test.each([
        ['sin alias', undefined],
        ['alias vacio', ''],
    ])('%s se guarda como null', async (_, alias) => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        updateCustomerPersonalDataRepository.mockResolvedValue({ id: 3 })

        const result = await updateCustomerPersonalDataUseCaseExecute({ ...input, alias })

        expect(result).toEqual({ id: 3 })
        expect(updateCustomerPersonalDataRepository).toHaveBeenCalledWith({ ...input, alias: null })
    })

    test('Pasa el alias tal cual si tiene valor', async () => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        updateCustomerPersonalDataRepository.mockResolvedValue({ id: 3 })

        await updateCustomerPersonalDataUseCaseExecute({ ...input, alias: 'Pepe' })

        expect(updateCustomerPersonalDataRepository).toHaveBeenCalledWith({ ...input, alias: 'Pepe' })
    })
})
