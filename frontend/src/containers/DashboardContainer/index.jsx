import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getBrands } from "@/services/brand.js";
import toast from "react-hot-toast";
import { getReports } from "@/services/report.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Card Report",
    },
  },
};

function DashboardContainer() {
  const [reportCards, setReportCard] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const labels = reportCards.map((reportCard) => reportCard.date);
  const totalCard = reportCards.map(
    (reportCard) => reportCard.total_cards_created,
  );
  const totalCancelCard = reportCards.map(
    (reportCard) => reportCard.total_inactive_cards,
  );
  const dataCards = {
    labels,
    datasets: [
      {
        label: "Total Card",
        data: totalCard,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Cancel Card",
        data: totalCancelCard,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const loadReports = async () => {
    try {
      const response = await getReports();

      if (!response.error) {
        setReportCard(response);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error during fetch reports:", error);
    }
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Dashboard</h1>

      <div className="flex flex-wrap mt-6">
        <div className="w-full pr-0 lg:pr-2">
          <p className="text-xl pb-3 flex items-center">
            <FontAwesomeIcon icon="fas fa-plus mr-3" />
            Card Report
          </p>
          <div className="p-6 bg-white">
            <Bar options={options} data={dataCards} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardContainer;
