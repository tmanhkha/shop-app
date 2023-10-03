import Select from "react-select";
import { useState } from "react";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import { useHistory } from "react-router-dom";
import { postProduct } from "@/services/product.js";
import { getBrands } from "@/services/brand.js";
import { AsyncPaginate } from "react-select-async-paginate";
import { getAllISOCodes } from "iso-country-currency";

function NewProductContainer() {
  const history = useHistory();
  const [priceList, setpriceList] = useState([{ price: "", currency: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand_id: "",
    status: AppConfig.STATUS_OPTIONS[0],
  });

  const currencyList = getAllISOCodes().map((item) => {
    return { value: item.currency, label: item.countryName };
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
      const response = await postProduct({
        name: formData.name,
        description: formData.description,
        brand_id: formData.brand_id.value,
        status: formData.status.value,
        priceList: priceList,
      });

      if (!response.error) {
        toast.success("Create product successfully");
        history.push({
          pathname: AppConfig.ROUTES.PRODUCT,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during create product:", error);
    }
  };

  const loadBrandOptions = async (search, loadedOptions, { page }) => {
    try {
      const response = await getBrands({
        page: page,
      });

      if (!response.error) {
        return {
          options: response.collection.map((brand) => {
            return { value: brand.id, label: brand.name };
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
      console.error("Error during fetch brands:", error);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...priceList];
    list[index][name] = value;
    setpriceList(list);
  };

  const handleInputCurrencyChange = (selected, index) => {
    const list = [...priceList];
    list[index]["currency"] = selected.value;
    setpriceList(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...priceList];
    list.splice(index, 1);
    setpriceList(list);
  };

  const handleAddClick = () => {
    setpriceList([...priceList, { price: "", currency: "" }]);
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
                  Name
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="name"
                  name="name"
                  value={formData.name}
                  type="text"
                  required
                  placeholder="Name"
                  aria-label="Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  className=" block text-sm text-gray-600"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                  id="description"
                  name="description"
                  rows="6"
                  required=""
                  placeholder="Description"
                  aria-label="Description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cus_email"
                >
                  Brand
                </label>
                <AsyncPaginate
                  value={formData.brand_id}
                  loadOptions={loadBrandOptions}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, brand_id: selectedOption })
                  }
                  additional={{
                    page: 1,
                  }}
                />
              </div>
              <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                <label className="block text-sm text-gray-600" htmlFor="status">
                  Status
                </label>
                <Select
                  name="status"
                  options={AppConfig.STATUS_OPTIONS}
                  value={formData.status}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, status: selectedOption })
                  }
                />
              </div>
              <div className="mt-2">
                <label
                  className=" block text-sm text-gray-600"
                  htmlFor="description"
                >
                  Prices
                </label>
                {priceList.map((x, i) => (
                  <div key={i}>
                    <div className="inline-block mt-2 w-1/3 pr-1">
                      <label
                        className="block text-sm text-gray-600"
                        htmlFor="cus_email"
                      >
                        Value
                      </label>
                      <input
                        className="w-full px-5 py-1.5 text-gray-700 border border-gray-200 rounded"
                        id="price"
                        name="price"
                        value={x.price}
                        type="number"
                        placeholder="Price"
                        aria-label="Price"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                    <div className="inline-block mt-2 -mx-1 mr-2 pl-1 w-1/3">
                      <label
                        className="block text-sm text-gray-600"
                        htmlFor="status"
                      >
                        Currency
                      </label>
                      <Select
                        name="currency"
                        options={currencyList}
                        value={currencyList.find(
                          (item) => item.value === x.currency,
                        )}
                        onChange={(selectedOption) =>
                          handleInputCurrencyChange(selectedOption, i)
                        }
                      />
                    </div>
                    <div className="inline-block mt-2 -mx-1 pl-1 w-1/3">
                      {priceList.length !== 1 && (
                        <button
                          onClick={() => handleRemoveClick(i)}
                          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded mr-2"
                        >
                          Remove
                        </button>
                      )}
                      {priceList.length - 1 === i && (
                        <button
                          onClick={handleAddClick}
                          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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

export default NewProductContainer;
