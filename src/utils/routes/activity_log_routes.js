
const express = require('express')
const activityLogRoutes = express.Router()
const { getActivityLastsController } = require('../controllers/activity_log/')
const ActivityLog = require('../db/activity_log_model')
const Loan = require('../../loan/db/loan_model')

activityLogRoutes.get('/log', getActivityLastsController)
activityLogRoutes.get('/run', async (req, res) => {
    const logs = await ActivityLog.findAll({
        where: {
            description_operation: 'CREATE_SPECIAL_LOAN'
        }
    })

    for (let i = 0; i < logs.length; i++) {
        const e = logs[i];
        const { new_registry } = e
        const { id } = new_registry

        const loan = await Loan.findByPk(id)
        if (loan == null) continue;
        const { dataValues } = loan
        
        await e.update({
            new_registry: dataValues
        })
        await e.save()
    }

    return res.json(logs)
})

module.exports = activityLogRoutes