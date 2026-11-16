
const express = require('express')
const activityLogRoutes = express.Router()
const { getActivityLastsController } = require('../controllers/activity_log/')
const ActivityLog = require('../db/models/activity_log_model')
const Loan = require('../../loan/db/loan_model')

activityLogRoutes.get('/log', getActivityLastsController)
activityLogRoutes.get('/run', async (req, res, next) => {
    const logs = await ActivityLog.findAll({
        where: {
            descriptionOperation: 'CREATE_SPECIAL_LOAN'
        }
    })

    for (let i = 0; i < logs.length; i++) {
        const e = logs[i];
        const { newRegistry } = e
        const { id } = newRegistry

        const loan = await Loan.findByPk(id)
        if (loan == null) continue;
        const { dataValues } = loan
        
        await e.update({
            newRegistry: dataValues
        })
        await e.save()
    }

    return res.json(logs)
})

module.exports = activityLogRoutes