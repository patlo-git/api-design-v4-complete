import {Router} from 'express';
import { body } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { getOneUpdate, getUpdates, createUpdate, updateUpdate, deleteUpdate } from './handlers/update';

const router = Router();

// this sub app will be our api.
// one or two routes that don't share same config as this for everything that needs to be authenticated.
//and then another spot for things that don't need to be authenticated.

/**
 * Product
 */
router.get('/product', getProducts);
//id is our route parameter
router.get('/product/:id', getOneProduct);
// body from the incoming json object (req.body) and passing it the field we want to enforce

// update a product
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);

//create a product
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);

router.get('/update/:id', getOneUpdate);

// updating an update
router.put('/update/:id',
// you could also put the following inputs in another file and import them in.
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