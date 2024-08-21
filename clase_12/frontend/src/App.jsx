import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-800 text-slate-200">
      <h1 className="text-5xl font-bold">Orders</h1>

      <section className="flex flex-row gap-4 mt-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`flex flex-col gap-2  p-4 rounded-lg text-slate-800 ${
              order.status === "pending"
                ? "bg-slate-100"
                : order.status === "completed"
                ? "bg-green-500 text-slate-100"
                : "bg-red-500"
            }`}
          >
            <h2 className="text-2xl font-bold">
              Order: <small>{order.number}</small>
            </h2>
            <p className="text-sm">
              Status: <b>{order.status}</b>
            </p>
            <p className="text-sm">
              Total Price: <b>${order.totalPrice} USD</b>
            </p>
            <hr />
            <h2 className="text-xl font-bold">Products</h2>
            <ul className="list-disc ml-5">
              {order.products.map((product) => (
                <li key={product._id} className="text-sm">
                  {product.name} (${product.price} USD)
                </li>
              ))}
            </ul>

            <hr />

            <h2 className="text-xl font-bold">User</h2>
            <p className="text-sm">
              Name: <b>{order.user.name}</b>
            </p>
            <p className="text-sm">
              Email: <b>{order.user.email}</b>
            </p>

            <hr />

            <h2 className="text-xl font-bold">Business</h2>
            <p className="text-sm">
              Name: <b>{order.business.name}</b>
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
