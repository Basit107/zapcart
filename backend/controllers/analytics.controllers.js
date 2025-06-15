import Users from "../models/user.models.js";
import Product from "../models/product.models.js";
import Order from "../models/order.models.js";


export const getAnalyticsData = async (req, res, next) => {
    try {
        const totalUsers = await Users.countDocuments();
        const totalProducts = await Product.countDocuments();

        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: null, // it groups all documents together,
                    totalSales: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]);

        const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

        // Daily sales Data
        const endDate = new Date();
        // This calculates the date, using milliseconds, exactly 7 days before the given endDate.
		const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

		const dailySalesData = await getDailySalesData(startDate, endDate);

        res.status(200).json({
            success: true,
            message: "Analytics Data successfully retrieved.",
            analyticsData: {
                users: totalUsers,
                products: totalProducts,
                totalSales,
                totalRevenue,
            },
            totalSalesData: {
                dailySalesData
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Analytics Data: Internal Server Error.",
            data: {
                error: error.message
            }
        })
        next(error)
    }
};

// example of dailySalesData
		// [
		// 	{
		// 		_id: "2024-08-18",
		// 		sales: 12,
		// 		revenue: 1450.75
		// 	},
		// ]

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const dailySalesData = await Order.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					sales: { $sum: 1 },
					revenue: { $sum: "$totalAmount" },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		const dateArray = getDatesInRange(startDate, endDate);
		// log(dateArray) // ['2024-08-18', '2024-08-19', ... ]

		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);

			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}