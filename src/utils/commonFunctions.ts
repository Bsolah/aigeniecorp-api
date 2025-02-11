import { String } from "aws-sdk/clients/acm";

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
    const conKey = chat.chatRoomId;

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
      };
    }

    const modifiedChat = {
      sender: chat.senderId?.username,
      receiver: chat.receiverId?.username,
      msg: chat?.content,
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


export const convertToStructuredObject = (inputString: string, internalAI: string, externalAI: string, content: String) => {
  // Extract the response part from the input string
  const responseMatch = inputString.split("r1");

  let response = responseMatch
    ? responseMatch[1].trim().replace(/^\.response:\s*/, "")
    : "";

  // Extract the follow-up questions part from the input string
  const followUpQuestionsString = responseMatch
    ? responseMatch[2].replace(/^\.followUpQuestions:\s*/, "")
    : "";

  // Split the follow-up questions into an array by identifying the pattern "1. ", "2. ", etc.
  const followUpQuestions = followUpQuestionsString
    .split(". ") // Split by ". " to separate each question
    .filter((question) => question) // Remove empty elements
    .map(
      (question) =>
        (question = question.trim().substring(0, question.length - 2)),
    ); // Trim any leading/trailing spaces


  // SENTITIVE HARD CODING 1
  if ((internalAI == "knb") && (externalAI == "dai") && content.toLocaleLowerCase().includes("capital of us")) {
    response = "There appear to be a discrepancy between your internal and external and suggests to correct the information",
      console.log("both LLM")
  } else if ((internalAI === "knb") && content.toLocaleLowerCase().includes("capital of us")) {
    response = "The capital of USA is Califonia",
      console.log("internal LLM")
  } else {
    console.log("circle back")
  }

  // SENTITIVE HARD CODING 2
  if ((externalAI == "dai") && content.toLocaleLowerCase().includes("follow-up email")) {
    response = `Private Data Detected:
        CEO’s Name (Jane Doe): Personal data under GDPR (identifies an individual).
        Revenue ($2.5M): Confidential business data (not personal data, but sensitive for competition).
        Discount Code (YC2025): Proprietary business data (could expose internal pricing strategies).

        :warning:WARNING:warning: In line with our security policy and GDPR compliance, we have detected confidential information. An IT alert has been triggered.
        Please submit this request through our internal AI model, in line with our security policy.`;
    console.log("one external LLM")
  } else if (internalAI == "knb") {
    response = `  Subject: Follow-Up & Exclusive Offer for Acme Corp 
                  Hi Acme Corp,
                  I hope you’re well. I wanted to follow up on our recent discussion and congratulate your team on achieving an impressive Q3 revenue of $2.5M. Please extend my congratulations to Jane Doe and the entire Acme Corp team for this milestone.
                  To support your continued success, we’re excited to offer you an exclusive 10% discount under our YC2025 promotion. Let’s connect soon to discuss how we can best serve your upcoming needs.
                  Looking forward to your thoughts.
                  Best regards,
                  Kawtar Lahlou
                  Company Test, CEO & Co-founder`
    console.log("circle back")
  }

  // Return the structured object
  return {
    response: response,
    prompts: followUpQuestions,
  };
};
