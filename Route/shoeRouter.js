import express from "express"
import { upload } from "../Middleware/ImageUpload.js"
import { addShoe, allShoes,deleteShoe,updateShoe } from "../Controller/ShoeController.js"
import { addAdmin,adminLogin } from "../Controller/AdminController.js"
import { userLogin , addUser} from "../Controller/UserController.js"

export const shoeRouter = express.Router()

shoeRouter.post("/add-shoe", upload.single("image"), addShoe)
shoeRouter.get("/all-shoes",allShoes)
shoeRouter.delete("/delete-shoe/:id",deleteShoe)
shoeRouter.put("/update-shoe/:id", updateShoe)

// Admin
shoeRouter.post("/add-admin", addAdmin)
shoeRouter.post("/admin-login", adminLogin)

//User

shoeRouter.post("/add-user", addUser)
shoeRouter.post("/user-login", userLogin)


