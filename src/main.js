import { Client, Databases, Query } from "node-appwrite";
import crypto from 'crypto';

const verifyGitHubSignature = (req) => {
  const signature = req.headers['x-hub-signature-256'];
  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  return signature === digest;
};

export default async ({ req, res, log, error }) => {
  // Initialize Appwrite client with environment variables
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const databases = new Databases(client);

  try {
    // Validate HTTP method
    if (req.method !== "POST") {
      return res.text("Invalid method", 405);
    }

    // Verify GitHub webhook signature for security
    if (!verifyGitHubSignature(req)) {
      return res.status(401).send('Invalid signature');
    }

    // Parse webhook payload
    const body = JSON.parse(req.body);
    const action = body.action;
    const pr = body.pull_request;

    // Only process merged pull requests
    if (action !== "closed" || !pr.merged) {
      return res.text("Not a merged PR, skipping...");
    }

    // Extract PR data from webhook payload
    const repoName = body.repository.full_name;
    const prId = pr.id;
    const prTitle = pr.title;
    const author = pr.user.login;

    // Check if PR already exists in database
    const existing = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [Query.equal("prId", prId)]
    );

    // Skip if PR is already marked as completed
    if (existing.total > 0 && existing.documents[0].status === "completed") {
      log(`PR #${prId} already completed. Skipping update.`);
      return res.text("Already completed");
    }

    // Store or update PR record in Appwrite database
    if (existing.total === 0) {
      // Create new PR record
      await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        "unique()",
        {
          prId,
          repoName,
          prTitle,
          author,
          status: "completed",
          mergedAt: pr.merged_at,
        }
      );
    } else {
      // Update existing PR record
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        existing.documents[0].$id,
        { status: "completed", mergedAt: pr.merged_at }
      );
    }

    return res.json({ success: true, message: "PR recorded successfully" });
  } catch (err) {
    error("Error handling PR webhook: " + err.message);
    return res.json({ success: false, error: err.message });
  }
};
