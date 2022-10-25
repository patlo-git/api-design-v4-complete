import { body, ValidationChain } from "express-validator";

export const handleInputValidation = {
  bodyNameString: () => { body('name').isString() },
  bodyTitleToString: () => { body('title').toString() },
  bodyTitleOptional: () => { body('title').optional() },
  bodyBodyOptional: () => { body('body').optional() },
  bodyStatus: () => { body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']) },
  bodyVersion: () => { body('version').optional() }
}