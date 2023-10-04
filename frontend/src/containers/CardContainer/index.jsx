import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AppConfig from "@/constants/AppConfig.js";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { deleteCard, getCards } from "@/services/card.js";

function CardContainer() {
  const [cards, setCards] = useState([]);
  const [pagination, setPagination] = useState({
    pageCount: 0,
    page: 1,
    per_page: AppConfig.PER_PAGE,
  });

  useEffect(() => {
    loadCards();
  }, [pagination.page]);

  const loadCards = async () => {
    try {
      const response = await getCards({
        page: pagination.page,
        per_page: pagination.per_page,
      });

      if (!response.error) {
        setCards(response.collection);
        setPagination({
          ...pagination,
          pageCount: response.pagination.total_pages,
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during fetch cards:", error);
    }
  };

  const handlePageClick = (event) => {
    setPagination({ ...pagination, page: event.selected + 1 });
  };

  const handleDelete = async (productId, id) => {
    try {
      const response = await deleteCard({
        productId,
        id,
      });

      if (!response.error) {
        toast.success("Delete card successfully");
        await loadCards();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete card:", error);
    }
  };
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Cards</h1>
      <div className="w-full mt-12">
        <div className="bg-white overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unique Activation Numbers
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Purchase Details PIN
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {cards.length > 0 &&
                cards.map((card) => (
                  <tr key={card.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {card.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {card.activation_number}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {card.purchase_details_pin}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {card.product.name}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {card.created_at}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDelete(card.product.id, card.id)}
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

export default CardContainer;
