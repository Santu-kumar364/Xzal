import { useSelector } from "react-redux";

const ChatMessage = ({ item }) => {
  const currentUserId = useSelector(store => store.auth.user?.id);
  const isOutgoing = item?.user?.id === currentUserId;

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[75%] rounded-lg p-3 ${
        isOutgoing ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}>
        {item.image && (
          <img 
            src={item.image} 
            alt="Message content" 
            className="max-w-full max-h-64 rounded-md mb-2"
          />
        )}
        {item.content && <p>{item.content}</p>}
        <p className="text-xs opacity-80 mt-1">
          {new Date(item.timestamps).toLocaleTimeString([], {
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;