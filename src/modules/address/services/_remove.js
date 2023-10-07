  const existing = await db("address").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Manzil topilmadi!");
  }

