
const validateSquema = (req, res, next, squema) => {
    const { value, error } = squema.validate(req.body)
    if (error) {
        const { details } = error
        console.log('Error al validar:')
        console.log(details)
        return res.status(500).json({message: 'Error in validation'})
    }
    req.value = value
    next()
}

module.exports = validateSquema