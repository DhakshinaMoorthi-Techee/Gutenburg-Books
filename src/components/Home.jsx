import Fiction from "../assets/Fiction.svg";
import Drama from "../assets/Drama.svg";
import Humour from "../assets/Humour.svg";
import Politics from "../assets/Politics.svg";
import Philosophy from "../assets/Philosophy.svg";
import History from "../assets/History.svg";
import Adventure from "../assets/Adventure.svg";
import Next from "../assets/Next.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const navigate = useNavigate();

  const categories = [
    { name: "FICTION", path: Fiction },
    { name: "PHILOSOPHY", path: Philosophy },
    { name: "DRAMA", path: Drama },
    { name: "HISTORY", path: History },
    { name: "HUMOUR", path: Humour },
    { name: "ADVENTURE", path: Adventure },
    { name: "POLITICS", path: Politics },
  ];

  const handleNavigation = (category) => {
    navigate(`/books/${category.toLowerCase()}`);
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center bg-[#F8F7FF]">
        <div className="w-full text-start mb-10 header-section">
          <div className="header-inner py-10">
            <h1 className="text-4xl font-bold text-[#5E56E7]">
              Gutenberg Project
            </h1>
            <p className="text-gray-600 mt-2 text-start">
              A social cataloging website that allows you to freely search its
              database of books, annotations, and reviews.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 header-outer">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(category.name)}
              className="flex items-center justify-between bg-white cursor-pointer transition-all w-full sm:w-[48%] header-card"
            >
              <div className="flex items-center gap-2">
                <img className="icon-img" src={category.path} />
                <span className="text-lg font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
              <span className="text-purple-500">
                <img src={Next} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
