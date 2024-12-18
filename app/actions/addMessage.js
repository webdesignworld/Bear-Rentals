// 'use server';
// import connectDB from '../../config/database';
// import Message from '../../models/Message';
// import Property from '../../models/Property';
// import { getSessionUser } from '../../utils/getSessionUser';
// import User from '../../models/User';


// async function addMessage( formData) {
//   await connectDB();

//   const sessionUser = await getSessionUser();

//   if (!sessionUser || !sessionUser.userId) {
//     return { error: 'You must be logged in to send a message' };
//   }

//   const { userId } = sessionUser;

//   if (userId === recipient) {
//     return { error: 'You can not send a message to yourself' };
//   }

//   const newMessage = new Message ({
//     sender: userId,
//     recipient,
//     propertyId: formData.get('property'),
//     name: formData.get('name'),
//     email: formData.get('email'),
//     phone: formData.get('phone'),
//     body: formData.get('message'),
//   });

//   // Use create instead of save
//   await newMessage.create();

//   return { submitted: true };
// }

// export default addMessage;