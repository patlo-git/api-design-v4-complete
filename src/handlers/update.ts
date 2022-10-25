import prisma from "../db";

// Get one Update
export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id
    }
  })

  res.json({data: update});
};

// Get all
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    // do you want updates for the signed in user across many different products or all the updates for a certain product?
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  // the following is not great, if you have to do all this. a telltale sign you don't have the schema set up to get the data you need.
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, []);

  res.json({data: updates});
}

// Update one Update
export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })
  // get all the updates
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, []);

  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({message: 'nope - no match, no update'});
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({data: updatedUpdate})
}

// Create one Update
export const createUpdate = async (req, res) => {
  // need to check that the product id user is sending up belongs to user before we associate an update to a product or id user gave
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    }
  })

  if (!product) {
    // does not belong to user
    return res.json({message: 'product does not belong to user'})
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {connect: {id: product.id}}
    }
  })

  res.json({data: update});
};

export const deleteUpdate = async (req, res) => {
  // need to make sure user owns a product update before we delete
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })
  // get all the updates
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, []);

  // see if there's a match between the products and the updates
  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({message: 'nope - no match, no update'});
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })
  res.json({data: deleted})
}