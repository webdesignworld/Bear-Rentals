
import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch the property by ID
    const property = await Property.findById(params.id).lean();

    // Handle property not found
    if (!property) {
      return new Response(
        JSON.stringify({ message: "Property not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return property details as JSON
    return new Response(
      JSON.stringify(property), // Ensure the response is serialized to JSON
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching property:", error);

    // Return generic error message
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
