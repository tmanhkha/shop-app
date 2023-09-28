import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import { postSignUp } from "@/services/auth.js";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";

function SignUp() {
  const history = useHistory();
  const currentUser = getUserFromLocalStorage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      history.push({
        pathname: AppConfig.ROUTES.MAIN,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postSignUp(formData);

      if (response?.user) {
        toast.success("Sign Up Successfully");
        history.push({
          pathname: AppConfig.ROUTES.LOGIN,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Create an Account
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={formData.email}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                SignUp
              </button>
            </div>
          </form>
          <div className="mt-2">
            Already have an account ?{" "}
            <Link className="text-blue-500 underline" to="/sign_in">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
