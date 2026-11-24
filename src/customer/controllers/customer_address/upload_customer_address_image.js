
const uploadCustomerAddressImageController = (req, res) => {
    const { image } = req.value
    return res.status(200).json({ image })
}

module.exports = uploadCustomerAddressImageController
