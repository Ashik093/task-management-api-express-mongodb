const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController')
const TaskController = require('../controller/TaskController')
const AuthVerifyMiddleware = require('./../middleware/AuthVerifyMiddleware')

router.post('/Registration', UserController.Registration)
router.post('/Login', UserController.Login)
router.post('/UpdateProfile', AuthVerifyMiddleware, UserController.UpdateProfile)
    //task
router.get('/GetTaskByStatus/:status', AuthVerifyMiddleware, TaskController.GetTaskByStatus)
router.get('/GetTaskCountByStatus', AuthVerifyMiddleware, TaskController.GetTaskCountByStatus)
router.get('/GetAllTask', AuthVerifyMiddleware, TaskController.GetTask)
router.post('/CreateTask', AuthVerifyMiddleware, TaskController.Create)
router.post('/UpdateTaskStatus', AuthVerifyMiddleware, TaskController.Update)
router.post('/DeleteTask', AuthVerifyMiddleware, TaskController.Delete)


module.exports = router