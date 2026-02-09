# Tasks

## Platform Submission & Approval System
**Priority:** High

Build a feature that lets people submit new platforms to the directory, with an AI agent handling review and approval.

### Requirements
- **Submission form** on the site where anyone can suggest a platform (name, URL, description, category)
- **AI agent reviewer** that automatically:
  - Validates the URL is reachable
  - Fetches and verifies the platform's metadata
  - Checks it's actually agent-related (not spam or off-topic)
  - Determines the correct category and tags
  - Approves, rejects, or flags for manual review
- **Approval flow**:
  - Auto-approved submissions get added to `platforms.json` via PR
  - Rejected submissions get a reason logged
  - Edge cases get flagged for manual review
- **Admin dashboard** (or simple notification) for manual overrides
