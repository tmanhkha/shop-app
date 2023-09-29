import Select from "react-select";
import { useEffect, useState } from "react";
import useCountries from "@/hooks/useCountries.jsx";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import { getBrand, putBrand } from "@/services/brand.js";
import { useHistory } from "react-router-dom";

function EditBrandContainer(props) {
  const { brandId } = props.match.params;
  const history = useHistory();
  const { selectedCountry, countries } = useCountries();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: selectedCountry,
    status: { value: "active", label: "Active" },
  });

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    try {
      const response = await getBrand({
        id: brandId,
      });

      if (!response.error) {
        setFormData({
          ...formData,
          name: response.name,
          description: response.description,
          country: countries.find(
            (country) => country.value === response.country,
          ),
          status: AppConfig.STATUS_OPTIONS.find(
            (option) => option.value === response.status,
          ),
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during fetch brands:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({ ...formData, country: selectedCountry });
  }, [selectedCountry]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await putBrand({
        id: brandId,
        name: formData.name,
        description: formData.description,
        country: formData.country.value,
        status: formData.status.value,
      });

      if (!response.error) {
        toast.success("Update brand successfully");
        history.push({
          pathname: AppConfig.ROUTES.BRAND,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during update brand:", error);
    }
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">New brand</h1>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
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
                  Country
                </label>
                <Select
                  name="country"
                  options={countries}
                  value={formData.country || selectedCountry}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, country: selectedOption })
                  }
                />
              </div>
              <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                <label className="block text-sm text-gray-600" htmlFor="status">
                  Status
                </label>
                <Select
                  name="status"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "InActive" },
                  ]}
                  value={formData.status}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, status: selectedOption })
                  }
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

export default EditBrandContainer;
