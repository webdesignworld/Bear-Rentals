"use client";
import bookmarkProperty from "../actions/bookmarkProperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";


const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }


try {
  const response = await bookmarkProperty(property?._id);

  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(response.message || "Property bookmarked successfully!");
  }
} catch (error) {
  console.error("Error bookmarking property:", error);
  toast.error("An unexpected error occurred. Please try again.");
}


  };



  return (
    <button 
    onClick={handleClick}
    className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-blue-600 hover:to-purple-500 text-white font-semibold w-full py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center space-x-2">
      <FaBookmark className="text-xl" />
      <span>Bookmark Property</span>
    </button>
  );


};


export default BookmarkButton;