/*
    SaleDetail Routes
    host + /api/sale-details
*/

const { Router } = require("express");
const { addDetailsSale, getDatilsBySale, deleteDetailsBySale } = require("../controllers/saleDetailController");

const router = Router();


router.post('/add', addDetailsSale);
router.get('/getSales/:id', getDatilsBySale);
router.delete('/deleteBySale/:id', deleteDetailsBySale);




module.exports = router;