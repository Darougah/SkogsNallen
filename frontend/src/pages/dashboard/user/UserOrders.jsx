import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";

const statusColorMap = {
  Klar: "bg-green-800 text-white",
  Mottagen: "bg-red-500 text-white",
  Behandlas: "bg-yellow-800 text-white",
  Skickad: "bg-blue-800 text-white",
};

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  const orders = orderdata?.orders;

  if (isLoading) return <div className="text-center py-6">Laddar...</div>;
  if (error || !orders?.length) return <div className="text-center py-6 text-red-500">Inga beställningar hittades.</div>;

  return (
    <section className="py-6">
      <div className="w-full px-4 mx-auto">
        <div className="bg-white shadow-lg rounded border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Dina beställningar</h3>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase px-3 py-1 rounded transition"
              type="button"
            >
              Se alla
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Order-ID</th>
                  <th className="px-6 py-3 text-left">Datum</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Totalt</th>
                  <th className="px-6 py-3 text-left">Detaljer</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {orders.map((order, index) => (
                  <tr key={order._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{order.orderId}</td>
                    <td className="px-6 py-3">
                      {new Date(order.createdAt).toLocaleDateString('sv-SE')}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${statusColorMap[order.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {order.amount?.toFixed(2)} kr
                    </td>
                    <td className="px-6 py-3">
                      <Link to={`/orders/${order._id}`} className="text-green-600 hover:underline">
                        Visa beställning
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserOrders;
