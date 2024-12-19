
"use client"
import {useState} from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "../actions/markMessageAsRead"
import deleteMessage from "../actions/deleteMessage"
import { Trash2} from "lucide-react";
import { Eye, EyeOff } from 'lucide-react';


const MessageCard = ({ message }) => {
        const [isRead, setIsRead] = useState(message.read);
        const [isDeleted, setIsDeleted] = useState(false);


        const handleReadClick = async () => {
                const read = await markMessageAsRead(message._id);
                setIsRead(read);
                toast.success(`Marked as ${read ? 'read' : 'new'}`);
              };
            
        const handleDeleteClick = async () => {
                await deleteMessage(message._id);
                setIsDeleted(true);
                toast.success('Message Deleted');
              };

              if (isDeleted) {
                return <p>Deleted message</p>;
              }
            



  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
          {!isRead && (
        <div className='absolute top-2 right-2 bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      <button 
         onClick={handleReadClick}
      className="mt-4 mr-3 bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-md">
{isRead ? (
    <>
      <EyeOff size={20} className="mr-2" />
      Mark As New
    </>
  ) : (
    <>
      <Eye size={20} className="mr-2" />
      Mark As Read
    </>
  )}


      {/* {isRead ? 'Mark As New' : 'Mark As Read'} */}
      </button>

      <button 
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 mt-4 mr-3 rounded-md ">
       
        <Trash2 size={20} className="mr-2" />
      Mark as Delete
      
      </button>
    </div>
  );
};

export default MessageCard;




