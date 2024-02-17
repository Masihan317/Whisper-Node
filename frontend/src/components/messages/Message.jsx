import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { time } from '../../utilities/time';

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const myMessage = message.sid === authUser._id
  const formattedTime = time(message.createdAt)
  const chatDirection = myMessage ? "chat-end" : "chat-start"
  const chatAvatar = myMessage ? authUser.profilePicture : selectedConversation.profilePicture
  const chatColor = myMessage ? "bg-blue-500" : "bg-gray-700"

  return (
    <div className={`chat ${chatDirection}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ">
          <img alt="bubble" src={chatAvatar}/>
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${chatColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  )
}

export default Message