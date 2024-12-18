import connectDB from "../../../config/database";
import Message from "../../../models/Message";
import  getSessionUser  from "../../../utils/getSessionUser";


export const dynamic = "force-dynamic";


//POST/api/messages



export const POST = async (request) => {
        try{
            await    connectDB();
            const {name, email, phone, message, property, recipient} 
            = await request.json();
            const sessionUser = await getSessionUser();
            if(!session || !session.userId) {
                return new Response ("user id is required ", {status: 401});
            }
            const {user} = sessionUser;
//cant send messages to self
if (user.id === recipient ) {
        return new Response(JSON.stringify({message: "You can not send a message to yourself"}), {status: 400});
}

const newMessage = newMessage ({
        sender: userId,
        recipient, 
        property, 
        name,
        email,
        phone,
        body: message
});

await newMessage.save()
return new Response (JSON.stringify({message: "Message sent"}), {status: 200});

        } catch (error) {
console.log(error);
return new Response ("Something went wrong", {status: 500});
        }
}