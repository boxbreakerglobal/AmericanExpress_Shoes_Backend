import axios from "axios";
import { orderModel } from "../Models/Orders.js";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 , callback_url:"http://localhost:8083/verify-payment"}, // Paystack expects amount in kobo
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const {order} = req.params

    let orderBody = order

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    console.log(response)
    console.log(order)

    if (response.data.status === true) {
      const order = new orderModel(JSON.parse(orderBody))
      order.save()
      res.json({ success:true, message: "Payment successful", data: response.data.data });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
