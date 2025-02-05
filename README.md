# aigeniecorp

# Features:

## User Authentication:

Secure login and signup system.
Session management using JSON Web Tokens (JWT).

## Document Management:
Upload documents with options for privacy (private/shared).
Store files securely and index content for AI-powered search.

## Team Management:
Invite team members to view documents.

## Chat Interface:

AI-powered chat with a toggle to search the internet (via OpenAI API) or perform internal document searches.

## AI-Powered Search:

Use OpenAI for AI-powered search functionality.

# Tech Stack:

Frontend: React with TypeScript.
Backend: Node.js with Express.
Database: MongoDB.
File Storage: AWS S3 or Google Cloud Storage.
AI: OpenAI API for chat and search.

TO create JWT token:
`openssl rand -base64 32`
