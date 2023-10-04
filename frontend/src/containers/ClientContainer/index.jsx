import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AppConfig from "@/constants/AppConfig.js";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { deleteClient, getClients } from "@/services/client.js";

function ClientContainer() {
  const [clients, setClients] = useState([]);
  const [pagination, setPagination] = useState({
    pageCount: 0,
    page: 1,
    per_page: AppConfig.PER_PAGE,
  });

  useEffect(() => {
    loadClients();
  }, [pagination.page]);

  const loadClients = async () => {
    try {
      const response = await getClients({
        page: pagination.page,
        per_page: pagination.per_page,
      });

      if (!response.error) {
        setClients(response.collection);
        setPagination({
          ...pagination,
          pageCount: response.pagination.total_pages,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during fetch clients:", error);
    }
  };

  const handlePageClick = (event) => {
    setPagination({ ...pagination, page: event.selected + 1 });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteClient({
        id,
      });

      if (!response.error) {
        toast.success("Delete client successfully");
        await loadClients();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete client:", error);
    }
  };
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Clients</h1>
      <Link
        to="/client/new"
        className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded float-right"
      >
        New Client
      </Link>
      <div className="w-full mt-12">
        <div className="bg-white overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payout Rate
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 &&
                clients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {client.created_at}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {client.payout_rate}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/client/${client.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800"
                      >
                        <FontAwesomeIcon icon="fa fa-pencil-alt" />
                      </Link>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800"
                      >
                        <FontAwesomeIcon icon="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pagination.pageCount}
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          }
          containerClassName="flex items-center text-gray-600 mt-2"
          pageClassName="px-4 py-2 rounded hover:bg-gray-200"
          activeClassName="bg-gray-300 text-gray-900 font-medium hover:bg-gray-200"
          previousClassName="p-2 ml-4 rounded hover:bg-gray-200"
          nextClassName="p-2 mr-4 rounded hover:bg-gray-200"
          renderOnZeroPageCount={null}
        />
      </div>
    </main>
  );
}

export default ClientContainer;