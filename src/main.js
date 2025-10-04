import { Client, Databases, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const databases = new Databases(client);

  try {
    if (req.method !== "POST") {
      return res.text("Invalid method", 405);
    }

    const body = JSON.parse(req.body);
    const action = body.action;
    const pr = body.pull_request;

    // Only act on merged PRs
    if (action !== "closed" || !pr.merged) {
      return res.text("Not a merged PR, skipping...");
    }

    const repoName = body.repository.full_name;
    const prId = pr.id;
    const prTitle = pr.title;
    const author = pr.user.login;

    // Check if PR already exists or completed
    const existing = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [Query.equal("prId", prId)]
    );

    if (existing.total > 0 && existing.documents[0].status === "completed") {
      log(`PR #${prId} already completed. Skipping update.`);
      return res.text("Already completed");
    }

    // Store or update PR in Appwrite
    if (existing.total === 0) {
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
