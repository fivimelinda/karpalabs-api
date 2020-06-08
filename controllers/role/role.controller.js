const sec_user_role = require('../../models/sec_user_role');
const moment = require('moment');
const {query} = require('../../models/query');
const TASK_STATUS = require('../../enums/status.enums');

module.exports = function (router) {

    router.get('/', async function (req, res) {
        var filter = {};
        var where = [];

        if (!!req.query.user_id) {
            filter.user_id = req.query.user_id;
        }

        if (!!req.query.group_id) {
            filter.group_id= req.query.group_id;
        }

        var data = await sec_user_role().findAll({ where : filter});

        res.json({ data : data});
    });

    router.get('/:id', async function (req, res) {
        var datum = await sec_user_role().findOne({ where : {user_role_id: req.params.id}});
        res.json({ data : datum});
    });

    router.put('/', async function (req, res) {
        var new_obj = {
            user_id: req.body.assignor_id,
            group_id : req.body.class_id,
            class_id : req.body.class_id,
            subject_id : req.body.subject_id,
            student_id : req.body.title,
            status: 1,
            created_date : moment().format(),
            created_by : req.user.user_name
        }
        try {
            var datum = await sec_user_role().create(new_obj);
            res.json({data: datum});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });

    router.post('/:id', async function (req, res) {
        var update_obj = {
            user_id: req.body.assignor_id,
            group_id : req.body.class_id,
            class_id : req.body.class_id,
            subject_id : req.body.subject_id,
            student_id : req.body.title,
            status: TASK_STATUS.ACTIVE,
            updated_date : moment().format(),
            updated_by : req.user.user_name
        }
        try {
            var datum = await sec_user_role().update(update_obj, {where : {user_role_id : req.params.id }});
            res.json({message: "Data has been updated."});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });

    router.delete('/:id', async function (req, res) {
        sec_user_role().update(
            { status : TASK_STATUS.DELETED},
            {where : {user_role_id : req.params.id}});

        res.json({message : 'Data has been deleted.'});

    });

};