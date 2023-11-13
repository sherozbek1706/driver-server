const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const add = async ({ body, user }) => {
  const { address_id } = body;
  const existed = await db("address").where({ id: address_id }).first();

  if (!existed) {
    throw new NotFoundError("Manzil topilmadi!");
  }

  let payload;
  
  if(user.role.includes("admin")){
    payload = { ...body, who: "admin", admin_id: user.id }
  } else {
    let users = await db("users").where({ id: user.id }).first();
    
    if(!users){
      throw new NotFoundError("Foydalanuvchi topilmadi!");
    };
    
    payload = { ...body, phone_number: users.phone_number, who: "user", user_id: user.id }
    
  }

  return db("order")
    .insert(payload)
    .returning("*");
};

module.exports = add;
