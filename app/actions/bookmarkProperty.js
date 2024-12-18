"use server";

import connectDB from "../../config/database";
import User from "../../models/User";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();

  if (!propertyId) {
    return { error: "Property ID is required" };
  }

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User is not authenticated" };
  }

  const { userId } = sessionUser;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    let isBookmarked;
    let message;

    // Check if property is already bookmarked
    if (user.bookmarks.includes(propertyId)) {
      // If bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    // Save the updated user document
    await user.save();

    // Revalidate the saved properties page
    revalidatePath("/properties/saved");

    return {
      message,
      isBookmarked,
    };
  } catch (error) {
    console.error("Error updating bookmarks:", error);
    return { error: "An error occurred while updating bookmarks" };
  }
}

export default bookmarkProperty;

