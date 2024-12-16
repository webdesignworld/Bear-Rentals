import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({property}) => {
        return (  <button
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-blue-600 hover:to-purple-500 text-white font-semibold w-full py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center space-x-2" 
              >
                <FaBookmark className="text-xl" />
                <span>Bookmark Property</span>
              </button>
               );
}
 
export default BookmarkButton;