import Select from "react-select";
import { useEffect, useState } from "react";
import useCountries from "@/hooks/useCountries.jsx";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import { postBrand } from "@/services/brand.js";
import { useHistory } from "react-router-dom";
import { postCard } from "@/services/card.js";

function NewCardContainer(props) {
  const { productId } = props.match.params;
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await postCard({
        productId: productId,
        name: formData.name,
      });

      if (!response.error) {
        toast.success("Create card successfully");
        history.push({
          pathname: AppConfig.ROUTES.PRODUCT,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during create card:", error);
    }
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">New Card</h1>
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

export default NewCardContainer;
