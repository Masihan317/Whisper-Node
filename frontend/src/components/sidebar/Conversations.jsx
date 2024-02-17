import Conversation from "./Conversation"
import useFetchConversations from '../../hooks/useFetchConversations'
import { getRandomEmoji } from "../../utilities/emojis"

const Conversations = () => {
  const { isLoading, conversations } = useFetchConversations()
  console.log(conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {isLoading ? <span className="loading loading-spinner mx-auto"/> : null}
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={index === conversations.length - 1}
        />
      ))}
    </div>
  )
}

export default Conversations