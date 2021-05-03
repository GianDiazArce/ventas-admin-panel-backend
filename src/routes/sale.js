/*
    Sale Routes
    host + /api/sales
*/

const { Router } = require("express");
const { getSales, newSale, changeSaleStatus, deleteSale, getSaleById } = require("../controllers/saleController");

const router = Router();


router.get('/', getSales);
router.get('/:id', getSaleById)
router.post('/new-sale', newSale);

router.put('/:id', changeSaleStatus);

router.delete('/:id', deleteSale);



module.exports = router;