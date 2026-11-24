const uploadCustomerAddressImageController = require('../../../src/customer/controllers/customer_address/upload_customer_address_image')

describe('uploadCustomerAddressImageController', () => {
    test('devuelve la clave de la imagen que dejo el middleware', () => {
        const req = { value: { image: 'customer_addresses/123-abc.jpg' } }
        const json = jest.fn()
        const res = { status: jest.fn(() => ({ json })) }

        uploadCustomerAddressImageController(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(json).toHaveBeenCalledWith({ image: 'customer_addresses/123-abc.jpg' })
    })
})
