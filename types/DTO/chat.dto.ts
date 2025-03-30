
declare global {
  // Room Chat
  type RoomChatResponse = {
    success: boolean;
  };

  type RoomChatRequest = {
    content: string;
  };

  type RoomChatHistoryResponse = {
    messages: ChatMessage[];
  };
}
  