

"use server";

import cloudinary from "../../config/cloudinary";
import connectDB from "../../config/database";
import Property from "../../models/Property";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User authentication required.");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found.");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property.");
  }

  // Extract public IDs from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    await Promise.all(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(`BearRentals/${publicId}`)
      )
    );
  }

  // Delete property from the database
  await property.deleteOne();

  // Revalidate path for ISR
  revalidatePath("/");
}

export default deleteProperty;
