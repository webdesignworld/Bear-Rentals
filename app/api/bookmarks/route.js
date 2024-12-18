// import connectDB from "@/config/database";
// import User from "@/models/User";
// import Property from "@/models/Property";
// import { getSessionUser } from "@/utils/getSessionUser";
// import { getServerSession } from "next-auth";



// export const POST = async (request) => {
// try {
//         await connectDB();
//         const {propertyId} = await request.json();
//         const sessionUser = await getServerSession();

//         if (!session || !session.uerId){
//                 return new Response ("User ID is required", {status: 401});
//         }
//         const {userId} = sessionUser;

//         const user = await User.findOne({_id = userId});

//         let isBookmarked = user.bookmarks.includes(propertyId);

//         let message;

//         if (isBookmarked) {
//                 // If bookmarked, remove it
//                 user.bookmarks.pull(propertyId);
//                 message = "Bookmark removed successfully";
//                 isBookmarked = false;
//               } else {
//                 // If not bookmarked, add it
//                 user.bookmarks.push(propertyId);
//                 message = "Bookmark added successfully";
//                 isBookmarked = true;
//               }
          
// await user.save();

// return new Response(JSON.stringify({message, is Bookmarked}), {status: 200})
// }



// }catch (error){
// console.log(error);
// return new Response ("Something went wrong" , {status: 500});
// }


import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    if (!propertyId) {
      return new Response(
        JSON.stringify({ error: "Property ID is required" }),
        { status: 400 }
      );
    }

    const sessionUser = await getServerSession();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ error: "User is not authenticated" }),
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
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

    await user.save();

    return new Response(
      JSON.stringify({ message, isBookmarked }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /bookmark:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
};
