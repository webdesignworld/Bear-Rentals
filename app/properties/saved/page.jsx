"use client"

import PropertyCard from "../../components/PropertyCard";
import connectDB from "../../../config/database";
import User from "../../../models/User";
import { getSessionUser } from "../../../utils/getSessionUser";

const SavedPropertiesPage = async () => {
  try {
    // Ensure the database connection
    await connectDB();

    // Fetch the session user
    const sessionUser = await getSessionUser();

    // Handle missing session
    if (!sessionUser || !sessionUser.userId) {
      return (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            <p>You need to sign in to view your saved properties.</p>
          </div>
        </section>
      );
    }

    const { userId } = sessionUser;

    // Fetch user's bookmarks
    const user = await User.findById(userId).populate("bookmarks");
    console.log(bookmarks)

    if (!user) {
      return (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            <p>User not found.</p>
          </div>
        </section>
      );
    }

    const { bookmarks = [] } = user; // Ensure bookmarks is always an array

    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          {bookmarks.length === 0 ? (
            <p>No saved properties.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookmarks.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading saved properties:", error);
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          <p>An error occurred while loading saved properties. Please try again later.</p>
        </div>
      </section>
    );
  }
};

export default SavedPropertiesPage;


