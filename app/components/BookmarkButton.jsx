"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle bookmark toggle
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    if (!property?._id) {
      toast.error("Property ID is missing");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
