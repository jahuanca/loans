const { models } = require("../db")
const { getPromise } = require("./helpers")

const actionUser = (nameAction) => {
    return async (req, res, next) => {
        const { idUser } = req

        const [errUser, user] = await getPromise(
            models.User.findByPk(idUser, { raw: true })
        )

        if (errUser) {
            return next(errUser)
        }

        const [errAction, action] = await getPromise(
            models.Action.findOne({
                raw: true,
                where: { name: nameAction, }
            })
        )

        if (errAction) {
            return next(errAction)
        }

        const { idTypeUser } = user
        const { id: idAction } = action

        const [errType, userAction] = await getPromise(
            models.TypeUserAction.findOne({
                where: {
                    idTypeUser: idTypeUser,
                    idAction: idAction,
                }
            }))

        if (errType) {
            return next(errType)
        }
        
        next()
    }
}

module.exports = {
    actionUser,
}