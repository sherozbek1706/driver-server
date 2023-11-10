const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors")

module.exports = async ({user}) => {
    const exist = await db("users").where({ id: user.id, is_deleted: false }).first();
    if(!exist){
        throw new NotFoundError("Foydalanuvchi topilmadi!");
    }

    let orders = await db("order").where({ user_id: user.id , status: "open"})
        .orWhere({ user_id: user.id , status: "progress"}).first();


    // orders.forEach((item) => {

    // })

       

    return orders;

}