/*
    Merchandise Routes
    host + /api/merchandises
*/

const { Router } = require('express');
const { getMerchandises } = require('../controllers/merchandiseController');

const router = Router();



router.get('/', getMerchandises);






module.exports = router;