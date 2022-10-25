import prisma from "../db";

// Get all
export const getProducts = async (req, res) => {
  // in the products handler but querying the user table
  // have to query for the user again here b/c we only have the id and name via req.user, not the other stuff we need to access the product
  const user = await prisma.user.findUnique({
    // if doing a query in prisma you need a where property
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  })

  // will be an array, which is where all the products we have goes on our user.products[]...connects to all products in our Product table
  res.json({data: user.products});
}

// Get one product
export const getOneProduct = async (req, res) => {
  // getting id from req object. params is route parameter. Access urlencoded from servers.ts and the : in our 'GET' product/:id route. Turning the parameters and the query string etc to an object for us.
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
    // error code defaults to 500, so no need to include it
    console.error(e);
    next(e);
  }
};

// Update one product
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    // update is kind of like a find and a write
    where: {
      // Created an index b/c this is a unique combination we don't have access to
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    },
    // when you find it this is the data you use to update it.
    data: {
      name: req.body.name
    }
  })

  // send back the thing you updated with the updates on it, so the client doesn't have to make another request to get the updated thing
  res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
  // if we delete many we only get info on what we deleted, but if we delete one, same with update, we get what we deleted.
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