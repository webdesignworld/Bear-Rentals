
// "use client";

// import { useState, useEffect } from "react";
// import bookmarkProperty from "../actions/bookmarkProperty";
// import { toast } from "react-toastify";
// import { FaBookmark } from "react-icons/fa";
// import { useSession } from "next-auth/react";

// const BookmarkButton = ({ property }) => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Set initial bookmark state based on property data
//   useEffect(() => {
//     if (property?.isBookmarked) {
//       setIsBookmarked(true);
//     }
//   }, [property]);

//   const handleClick = async () => {
//     if (!userId) {
//       toast.error("You need to sign in to bookmark a property");
//       return;
//     }

//     setLoading(true); // Disable button while processing
//     try {
//       const response = await bookmarkProperty(property?._id);

//       if (response.error) {
//         toast.error(response.error);
//       } else {
//         setIsBookmarked(response.isBookmarked); // Update bookmark status
//         toast.success(response.message || "Bookmark status updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error bookmarking property:", error);
//       toast.error("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false); // Re-enable button
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       disabled={loading}
//       className={`${
//         isBookmarked
//           ? "bg-gradient-to-r from-red-500 to-blue-600 hover:from-blue-600 hover:to-red-500"
//           : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-blue-600 hover:to-purple-500"
//       } text-white font-semibold w-full py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center space-x-2 ${
//         loading ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//     >
//       <FaBookmark className="text-xl" />
//       <span>{isBookmarked ? "Remove Bookmark" : "Bookmark Property"}</span>
//     </button>
//   );
// };

// export default BookmarkButton;
"use client";

import { useState, useEffect } from "react";
import bookmarkProperty from "../actions/bookmarkProperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Set initial bookmark state based on property data
  useEffect(() => {
    if (property?.isBookmarked) {
      setIsBookmarked(true);
    }
  }, [property]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    setLoading(true); // Disable button while processing
    try {
      const response = await bookmarkProperty(property?._id);

      if (response.error) {
        toast.error(response.error);
      } else {
        setIsBookmarked(response.isBookmarked); // Update bookmark status
        toast.success(response.message || "Bookmark status updated successfully!");
      }
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${
        isBookmarked
          ? "bg-gradient-to-r from-red-500 to-blue-600 hover:from-blue-600 hover:to-red-500"
          : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-blue-600 hover:to-purple-500"
      } text-white font-semibold w-full py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center space-x-2 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <FaBookmark className="text-xl" />
      <span>{isBookmarked ? "Remove Bookmark" : "Bookmark Property"}</span>
    </button>
  );
};

export default BookmarkButton;
