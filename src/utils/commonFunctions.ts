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


export const convertToStructuredObject = (response: string, content: String, switchAI: any) => {
  

  // SENTITIVE HARD CODING 1
  if (switchAI['knb'] && switchAI['dai'] && content.toLocaleLowerCase().includes("cash")) {
    response = `:warning: There appears to be a discrepancy in your knowledge base. In the United States, the federal reporting threshold for cash transactions is $10,000, as mandated by the Bank Secrecy Act (BSA). This applies to two primary scenarios:
      Financial Institutions under which your "Test Company" falls: Banks and other financial entities must file a Currency Transaction Report (CTR) with the Financial Crimes Enforcement Network (FinCEN) for cash transactions exceeding $10,000 in a single business day.
      Source: FinCEN CTR Requirements.
      Businesses (Non-Financial Sectors): Businesses (e.g., retailers, car dealers) receiving cash payments over $10,000 must file IRS Form 8300.
      Source: IRS Form 8300 Guidance.
      
      Please refer to the audit trail below that you can extract:
      V1. Created by "John Dow" 17.02.2020 and approved by "Alicia Johnson"  01.02.2020
      V2. Updated by "Alex Thompson "20.12.2024" and approved by "Chloe Warren" 20.12.2024`,
      console.log("both LLM")
  } else if (switchAI['knb'] && content.toLocaleLowerCase().includes("cash")) {
    response = "Based on your company knowledge base, in the article 'Company Compliance' the reporting threshold for cash transaction in the US is 50000 USD.",
      console.log("internal LLM")
  } else {
    console.log("circle back")
  }

  // SENTITIVE HARD CODING 2
  if (switchAI['dai'] && content.toLocaleLowerCase().includes("follow-up email")) {
    response = `Private Data Detected:
        CEO’s Name (Jane Doe): Personal data under GDPR (identifies an individual).
        Revenue ($2.5M): Confidential business data (not personal data, but sensitive for competition).
        Discount Code (YC2025): Proprietary business data (could expose internal pricing strategies).

        :warning:WARNING:warning: In line with our security policy and GDPR compliance, we have detected confidential information. An IT alert has been triggered.
        Please submit this request through our internal AI model, in line with our security policy.`;
    console.log("one external LLM")
  } else if (switchAI['knb'] && content.toLocaleLowerCase().includes("follow-up email")) {
    response = ` Subject: Follow-Up & Exclusive Offer for Acme Corp 
    Hi Acme Corp,
    I hope you’re well. I wanted to follow up on our recent discussion and congratulate your team on achieving an impressive Q3 revenue of $2.5M. Please extend my congratulations to Jane Doe and the entire Acme Corp team for this milestone.
                  To support your continued success, we’re excited to offer you an exclusive 10% discount under our YC2025 promotion. Let’s connect soon to discuss how we can best serve your upcoming needs.
                  Looking forward to your thoughts.
                  Best regards,
                  Kawtar Lahlou
                  Company Test, CEO & Co-founder`;
    console.log("one internal LLM")
  } else {
    console.log("circle back")
  }

  // Return the structured object
  return response;

};
