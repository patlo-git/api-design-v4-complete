import {Router} from 'express';
import { body } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { getOneUpdate, getUpdates, createUpdate, updateUpdate, deleteUpdate } from './handlers/update';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);

// update a product
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);

// create a product
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);

router.get('/update/:id', getOneUpdate);

// updating an update
router.put('/update/:id',
// could also put the following inputs in another file and import them in.
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputErrors,
  updateUpdate
);

// creating an update
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputErrors,
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});

router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputErrors, (req, res) => {
    res.json({message: 'updatepoint:id PUT is alll goood'})
});

router.post('/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputErrors, (req, res) => {
    res.json({message: 'updatepoint:id POST is alll goood'})
});

router.delete('/updatepoint/:id', () => {});

export default router;