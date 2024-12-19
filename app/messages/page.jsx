
import connectDB from "../../config/database";
import Message from "../../models/Message";
import "../../models/Property";
import { convertToSerializeableObject } from "../../utils/convertToObject";
import { getSessionUser } from "../../utils/getSessionUser";
import MessageCard from "../components/MessageCard"

const Messages = async () => {
  try {
    // Connect to the database
    connectDB();

    // Get session user
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    // Fetch read messages
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in descending order
      .populate("sender", "username")
      .populate("property", "name")
      .lean();

    // Fetch unread messages
    const unreadMessages = await Message.find({ recipient: userId, read: false })
      .sort({ createdAt: -1 }) // Sort unread messages in descending order
      .populate("sender", "username")
      .populate("property", "name")
      .lean();

    // Combine and serialize messages
    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
      return convertToSerializeableObject({
        ...messageDoc,
        sender: messageDoc.sender,
        property: messageDoc.property,
      });
    });

    // Render messages
    return (
      <section className="bg-purple-50 dark:bg-black">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 dark:text-black">
            <h1 className="text-3xl font-bold mb-4 dark:text-black">Your Messages</h1>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p>You have no messages</p>
              ) : (
                messages.map((message) => (
                        <MessageCard key={message._id} message={message} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return (
      <section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            <p className="text-red-500">An error occurred while loading messages.</p>
          </div>
        </div>
      </section>
    );
  }
};

export default Messages;
