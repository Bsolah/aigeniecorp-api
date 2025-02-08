const welcomeMail = (name: string) => { 
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Subscribing</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            background-color: #0A2540;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hi ${name}, Thank You for Subscribing!</h1>
        <p>We're excited to have you as a part of our prospective customer list. Stay tuned for updates, exclusive offers, and the latest news.</p>
        <a href="#" class="button">Explore More</a>
        <p class="footer">If you have any questions, feel free to <a href="#">contact us</a>.</p>
    </div>
</body>
</html>`;
}

export default welcomeMail;