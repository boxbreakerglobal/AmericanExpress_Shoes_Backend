import express from "express"
import { upload } from "../Middleware/ImageUpload.js"
import { addShoe, allShoes,deleteShoe,updateShoe } from "../Controller/ShoeController.js"
import { addAdmin,addDesktopHeroImage,addImage,addModileHeroImage,adminLogin, DeleteDesktopHeroImages, DeleteMobileHeroImages, fetchHeroImages, updatedDesktopHeroImage, updateImages, updateMobileHeroImage } from "../Controller/AdminController.js"
import { userLogin , addUser} from "../Controller/UserController.js"
import { initializePayment, verifyPayment } from "../Controller/PaymentController.js"
import { addOrders, allOrders , getEarningsMonthByMonth, getMonthlyEarnings, getTodayEarnings, getWeeklyEarnings } from "../Controller/orderController.js"
import { addMessage, allMessages } from "../Controller/UserController.js"

export const shoeRouter = express.Router()

shoeRouter.post("/add-shoe", upload.array("images"), addShoe)
shoeRouter.get("/all-shoes",allShoes)
shoeRouter.delete("/delete-shoe/:id",deleteShoe)
shoeRouter.put("/update-shoe/:id", upload.array("images"), updateShoe)

// Admin
shoeRouter.post("/add-admin", addAdmin)
shoeRouter.post("/admin-login", adminLogin)
shoeRouter.delete("/delete-message/:id",deleteShoe)
//Admin He
shoeRouter.post("/add-desktop-hero-image",upload.single("image"),addDesktopHeroImage)
shoeRouter.post("/add-mobile-hero-image",upload.single("image"),addModileHeroImage)

shoeRouter.put("/update-mobile-hero-image/:id",upload.single("image"),updateMobileHeroImage)
shoeRouter.put("/update-desktop-hero-image/:id",upload.single("image"),updatedDesktopHeroImage)

shoeRouter.delete("/delete-mobile-hero-image/:id",upload.single("image"),DeleteMobileHeroImages)
shoeRouter.delete("/delete-mobile-hero-image/:id",upload.single("image"),DeleteDesktopHeroImages)

shoeRouter.get("/all-hero-images", fetchHeroImages)

//User

shoeRouter.post("/add-user", addUser)
shoeRouter.post("/user-login", userLogin)

//

shoeRouter.post("/initiate-payment",initializePayment)
shoeRouter.post("/payment/verify/:reference", verifyPayment)

// Orders
shoeRouter.get("/all-orders",allOrders)
shoeRouter.post("/add-order",addOrders)

// Earnings
shoeRouter.get("/daily-earnings-and-orders",getTodayEarnings)
shoeRouter.get("/monthly-earnings-and-orders", getMonthlyEarnings)
shoeRouter.get("/weekly-orders", getWeeklyEarnings)
shoeRouter.get("/month-by-month-earnings",getEarningsMonthByMonth)

shoeRouter.post("/add-message", addMessage)
shoeRouter.get("/all-messages", allMessages)


//