import React, { useEffect, useState } from "react";
import api from "../config/axios.js";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsCard = ({ title, value, icon: Icon, bg }) => (
  <div
    className={`card text-white shadow-lg position-relative overflow-hidden ${bg}`}
    style={{ filter: "brightness(1.15)" }}
  >
    <div className="card-body d-flex justify-content-between align-items-center position-relative">
      <div>
        <h6 className="text-uppercase">{title}</h6>
        <h3 className="fw-bold">{value}</h3>
      </div>
      <div
        className="position-absolute bottom-0 end-0 opacity-25"
        style={{ fontSize: "5rem", pointerEvents: "none" }}
      >
        <Icon size={70} />
      </div>
    </div>
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(56, 55, 55, 0.2), rgba(54, 54, 54, 0.6))",
        zIndex: 0,
      }}
    />
  </div>
);

const Analytics = () => {
  const [metrics, setMetrics] = useState({
    users: 0,
    products: 0,
    totalRevenue: 0,
    totalSales: 0,
  });
  const [dailyData, setDailyData] = useState([
    {
      date: "2025-06-01",
      sales: 5,
      revenue: 1200,
    },
    {
      date: "2025-06-02",
      sales: 1,
      revenue: 200,
    },
    {
      date: "2025-06-03",
      sales: 1,
      revenue: 113,
    },
    {
      date: "2025-06-04",
      sales: 11,
      revenue: 5000,
    },
    {
      date: "2025-06-05",
      sales: 1,
      revenue: 10,
    },
    {
      date: "2025-06-06",
      sales: 3,
      revenue: 320,
    },
    {
      date: "2025-06-07",
      sales: 1,
      revenue: 900,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("v1/admins/analytics");
        if (res.status === 200) {
          const { users, products, totalRevenue, totalSales } =
            res.data.analyticsData;
          setMetrics({ users, products, totalRevenue, totalSales });
          // setDailyData(res.data.totalSalesData.dailySalesData);
          // console.log("Daily Sales Data:", dailyData)
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return <div className="text-center mt-5 mx-lg-2">Loading analytics...</div>;

  return (
    <div
      className="container"
      style={{ paddingTop: "5rem", paddingLeft: "6rem" }}
    >
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <AnalyticsCard
            title="Users"
            value={metrics.users}
            icon={Users}
            bg="bg-primary"
          />
        </div>
        <div className="col-md-3">
          <AnalyticsCard
            title="Total Sales"
            value={metrics.totalSales}
            icon={ShoppingCart}
            bg="bg-success"
          />
        </div>
        <div className="col-md-3">
          <AnalyticsCard
            title="Total Products"
            value={`${metrics.products}`}
            icon={Package}
            bg="bg-primary"
          />
        </div>
        <div className="col-md-3">
          <AnalyticsCard
            title="Revenue"
            value={`$${metrics.totalRevenue}`}
            icon={DollarSign}
            bg="bg-warning"
          />
        </div>
      </div>

      <div
        className="card shadow-sm mb-5"
        width="1500px"
        style={{ background: "#e6e9e7", marginTop: "4.5rem" }}
      >
        <div className="card-body">
          <h5 className="card-title mb-3">Last 7 Days Revenue</h5>
          <ResponsiveContainer width="104%" height={450}>
            <LineChart
              data={dailyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="black" />
              <YAxis yAxisId="left" stroke="black" />
              <YAxis yAxisId="right" orientation="right" stroke="black" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#0d6efd"
                // fill="#cfe2ff"
                // strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                // fill="#cfe2ff"
                // strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
