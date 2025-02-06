const welcomeSelfMail = (name: string, email: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Subscription Alert</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p class="footer">You received this notification because someone subscribed.</p>
  </div>
</body>
</html>`;
};
