const yup = require('yup')

const taskSchema = yup.object({
                title: yup.string().trim().required(),
                description: yup.string().required(),
                isCompleted: yup.string().oneOf(["true", "false"]).required(),
                priority: yup.string().oneOf(["low", "medium", "high"]).required()
            })

module.exports = taskSchema