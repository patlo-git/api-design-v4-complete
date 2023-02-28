import prisma from "../db";

// Get all products
export const getProducts = async (req, res) => {
  // query user table from products handler
  // we have user.id and user.id from req.user
  // need to query for user again
  // to get other stuff to access the product
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  })

  // connects to all products in our Product table
  res.json({data: user.products});
}

// Get one product
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id
    }
  })

  res.json({data: product});
};

// Create one product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    })
  
    res.json({data: product});
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// Update one product
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      // Created an index b/c this is a unique combination we don't have access to
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    },
    // when query comes back update with this data
    data: {
      name: req.body.name
    }
  })

  // return updated item, so client doesn't have to make another request to get updated item
  res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  });

  res.json({data: deleted})
}