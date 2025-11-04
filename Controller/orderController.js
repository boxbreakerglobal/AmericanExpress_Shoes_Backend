import { orderModel } from "../Models/Orders.js";


export const allOrders = async(req , res)=>{
    try{
        const allOrders = await orderModel.find({})

        return res.json({success:true, allOrders})




    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}



export const getTodayEarnings = async (req, res) => {
  try {
    // Get today's start and end time
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find all orders from today
    const todayOrders = await orderModel.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // Sum the total values
    const totalEarnings = todayOrders.reduce((sum, order) => sum + order.total, 0);
    console.log(todayOrders)

    res.json({
      message: "Today's earnings calculated successfully",
      totalEarnings,
      totalOrders: todayOrders.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate today's earnings" });
  }
};





export const getMonthlyEarnings = async (req, res) => {
  try {
    // Get the current date
    const now = new Date();

    // Get the first and last day of the current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1st day of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // last day of the month

    // Find all orders within this month
    const monthlyOrders = await orderModel.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Sum the total values
    const totalEarnings = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    res.json({
      message: "Monthly earnings calculated successfully",
      totalEarnings,
      totalOrders: monthlyOrders.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate monthly earnings" });
  }
};



export const getWeeklyEarnings = async (req, res) => {
  try {
    const now = new Date();

    // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = now.getDay();

    // Calculate start of the week (Monday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((currentDay + 6) % 7)); // move back to Monday
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Fetch all orders between start and end of week
    const weeklyOrders = await orderModel.find({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });

    // Calculate totals
    const totalOrders = weeklyOrders.length;
    const totalEarnings = weeklyOrders.reduce((sum, order) => sum + order.total, 0);

    // Optional: average per order
    const averageOrderValue = totalOrders > 0 ? (totalEarnings / totalOrders).toFixed(2) : 0;

    res.json({
      message: "Weekly earnings calculated successfully",
      totalOrders,
      totalEarnings,
      averageOrderValue,
      weekRange: {
        start: startOfWeek.toDateString(),
        end: endOfWeek.toDateString(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate weekly earnings" });
  }
};




export const getEarningsByMonth = async (req, res) => {
  try {
    // Aggregate total earnings grouped by year + month
    const earnings = await orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalEarnings: { $sum: "$total" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Month short names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Format response with month names
    const formattedEarnings = earnings.map(e => ({
      year: e._id.year,
      month: monthNames[e._id.month - 1],
      totalEarnings: e.totalEarnings,
      totalOrders: e.totalOrders,
    }));

    res.json({
      message: "Monthly earnings retrieved successfully",
      data: formattedEarnings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get monthly earnings" });
  }
};




export const getEarningsMonthByMonth = async (req, res) => {
  try {
    // Match only current year's data (optional)
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);

    const earnings = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          earnings: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Month short names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Map to { month, earnings, orders }
    const formatted = earnings.map(e => ({
      month: monthNames[e._id.month - 1],
      earnings: e.earnings,
      orders: e.orders,
    }));

    res.json({
      message: "Monthly earnings retrieved successfully",
      data: formatted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get monthly earnings" });
  }
};

export const addOrders = async(req , res)=>{
    try{
        const orders = new orderModel(req.body)

        orders.save()

        

        return res.json({success:true, allOrders})




    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}