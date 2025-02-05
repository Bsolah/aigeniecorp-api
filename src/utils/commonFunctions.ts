export const processChats = (chats: any[]) => {
  return chats.map((chat) => {
    // Extract user information from the users array
    const user = chat.users.find(
      (user: any) => user.user && user.user.username && user.user.email,
    );

    // If user exists, include username and email in the chat object
    return {
      id: chat._id,
      name: user.user.username, // Add username
      email: user.user.email, // Add email
      status: user.user.status || "online",
      thumb: user.user.image || null,
      messages: chat.messages,
    };
  });
};

export const groupMessagesByConversation = (chats: any[], userId: any) => {
  // Create an object to store grouped messages
  const groupedMessages: any = {};

  // Iterate over each chat message
  chats.forEach((chat) => {
    // console.log({chat, userId})

    // Generate a unique conversation key based on the sender and receiver IDs
    const conKey = [chat.senderId._id, chat.receiverId._id].sort().join("-");

    // Initialize an empty array for the conversation if it doesn't exist yet
    if (!groupedMessages[conKey]) {
      groupedMessages[conKey] = {
        id:
          chat.senderId._id.toString() === userId
            ? chat.receiverId._id
            : chat.senderId._id,
        email:
          chat.senderId._id.toString() === userId
            ? chat.receiverId.email
            : chat.senderId.email,
        name:
          chat.senderId._id.toString() === userId
            ? chat.receiverId.username
            : chat.senderId.username,
        role:
          chat.senderId._id.toString() === userId
            ? chat.receiverId.role
            : chat.senderId.role,
        status: "online",
        // participants : [
        //     { email: chat.senderId.email, _id: chat.senderId._id },
        //     { email: chat.receiverId.email, _id: chat.receiverId._id },
        // ],
        messages: [],
      };
    }

    const modifiedChat = {
      sender: chat.senderId.username,
      // senderEmail: chat.senderId.email,
      receiver: chat.receiverId.username,
      // receiverEmail: chat.receiverId.email,
      msg: chat.content,
      type: chat.type,
      createdAt: chat.createdAt,
      attachments: chat.attachments,
      prompts: null,
    };

    if (chat && chat.prompts) {
      modifiedChat["prompts"] = chat.prompts;
    }

    // Add the current chat message to the conversation array
    groupedMessages[conKey].messages.push(modifiedChat);
  });

  // Convert the grouped messages object into an array of conversations
  return Object.values(groupedMessages);
};


export const convertToStructuredObject = (inputString: string) => {
  console.log({ inputString });
  // Extract the response part from the input string
  const responseMatch = inputString.split("r1");

  console.log({ responseMatch });
  const response = responseMatch
    ? responseMatch[1].trim().replace(/^\.response:\s*/, "")
    : "";
  console.log({ response });

  // Extract the follow-up questions part from the input string
  const followUpQuestionsString = responseMatch
    ? responseMatch[2].replace(/^\.followUpQuestions:\s*/, "")
    : "";
  console.log({ followUpQuestionsString });

  // Split the follow-up questions into an array by identifying the pattern "1. ", "2. ", etc.
  const followUpQuestions = followUpQuestionsString
    .split(". ") // Split by ". " to separate each question
    .filter((question) => question) // Remove empty elements
    .map(
      (question) =>
        (question = question.trim().substring(0, question.length - 2)),
    ); // Trim any leading/trailing spaces

  console.log({ followUpQuestions });

  // Return the structured object
  return {
    response: response,
    prompts: followUpQuestions,
  };
};
