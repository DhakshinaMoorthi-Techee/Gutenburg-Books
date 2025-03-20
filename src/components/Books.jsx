import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Search from "../assets/Search.svg";
import Cancel from "../assets/Cancel.svg";
import Back from "../assets/Back.svg";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BooksComponent() {
  const lastBookRef = useRef(null);
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = searchTerm?.length
        ? await fetch(
            `https://gutendex.com/books/?topic=${category}&search=${searchTerm}`
          )
        : await fetch(
            `https://gutendex.com/books/?topic=${category}&page=${page}`
          );
      const data = await response.json();

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        if (searchTerm?.length) {
          setBookList(data.results);
          setPage(1);
        } else {
          setBookList((prev) => [...prev, ...data.results]);
          setPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchBook = (key) => {
    if (key === "Enter") {
      fetchBooks();
    }
  };

  const openFileFormat = (format) => {
    const bookUrl =
      format["text/html"] || format["application/pdf"] || format["text/plain"];
    bookUrl
      ? window.open(bookUrl, "_blank")
      : alert("No viewable version available");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="min-h-screen mt-10">
        <div className="space-x-3 flex items-center header-category mr-5">
          <button
            onClick={() => navigate(-1)}
            className="text-purple-600 text-xl bg-none"
          >
            <img src={Back} />
          </button>
          <h6 className="text-2xl font-bold text-[#5E56E7]">
            {category?.toUpperCase()}
          </h6>
        </div>
        <div className="relative w-full max-w-lg input-search bg-[#F0F0F6] rounded-2xl">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
            src={Search}
          />
          <input
            type="text"
            placeholder="Type and Press enter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => onSearchBook(e.key)}
            className="w-full pl-10 pr-10 py-2 border-none rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#F0F0F6]"
            >
              <img
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                src={Cancel}
              />
            </button>
          )}
        </div>
        <InfiniteScroll
          dataLength={bookList.length}
          next={fetchBooks}
          hasMore={hasMore}
          scrollThreshold="95%"
          endMessage={
            <p className="text-center mt-4 text-gray-500">
              No more books to load
            </p>
          }
        >
          <div className="w-full mt-10 flex flex-wrap justify-center gap-6 bg-[#F0F0F6] p-10">
            {bookList.map((book, index) => (
              <div
                key={index}
                ref={index === bookList.length - 1 ? lastBookRef : null}
                onClick={() => openFileFormat(book.formats)}
                className="bg-white p-3 rounded-lg shadow-md text-center w-[180px] flex flex-col items-center cursor-pointer"
              >
                <img
                  src={book?.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-full h-56 rounded-md"
                />
                <h2
                  title={book.title}
                  className="mt-2 text-sm font-medium leading-tight"
                >
                  {book.title.length > 20
                    ? `${book.title.slice(0, 20)}...`
                    : book.title}
                </h2>
                <p className="text-xs text-gray-500">{book.authors[0]?.name}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
