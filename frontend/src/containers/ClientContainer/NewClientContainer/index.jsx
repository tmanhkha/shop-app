import { useState } from "react";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import { useHistory } from "react-router-dom";
import { getProducts, postProduct } from "@/services/product.js";
import { getBrands } from "@/services/brand.js";
import { AsyncPaginate } from "react-select-async-paginate";
import { postClient } from "@/services/client.js";

function NewClientContainer() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    payoutRate: "",
    productIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await postClient({
        email: formData.email,
        password: formData.password,
        payoutRate: formData.payoutRate,
        productIds: formData.productIds.map((id) => id.value),
      });

      if (!response.error) {
        toast.success("Create client successfully");
        history.push({
          pathname: AppConfig.ROUTES.CLIENT,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during create client:", error);
    }
  };

  const loadProductOptions = async (search, loadedOptions, { page }) => {
    try {
      const response = await getProducts({
        page: page,
      });

      if (!response.error) {
        return {
          options: response.collection.map((product) => {
            return { value: product.id, label: product.name };
          }),
          hasMore: response.pagination.has_more,
          additional: {
            page: page + 1,
          },
        };
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during fetch products:", error);
    }
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">New Product</h1>
      <div className="flex flex-wrap">
        <div className="w-full my-6 pr-0 lg:pr-2">
          <div className="leading-loose">
            <form
              onSubmit={handleSubmit}
              className="p-10 bg-white rounded shadow-xl"
            >
              <div className="">
                <label className="block text-sm text-gray-600" htmlFor="name">
                  Email
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="email"
                  name="email"
                  value={formData.email}
                  type="email"
                  required
                  placeholder="Email"
                  aria-label="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  className=" block text-sm text-gray-600"
                  htmlFor="description"
                >
                  Password
                </label>
                <input
                  className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  placeholder="Password"
                  aria-label="Password"
                  value={formData.password}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="name">
                  Payout rate
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="payoutRate"
                  name="payoutRate"
                  value={formData.payoutRate}
                  type="number"
                  required
                  placeholder="Payout Rate"
                  aria-label="Payout Rate"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Products
                </label>

                <AsyncPaginate
                  isMulti
                  value={formData.productIds}
                  loadOptions={loadProductOptions}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, productIds: selectedOption })
                  }
                  additional={{
                    page: 1,
                  }}
                />
              </div>
              <div className="mt-6">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NewClientContainer;
