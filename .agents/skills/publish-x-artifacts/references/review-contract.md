# Review and publication contract

## Two separate approvals

1. **Artifact approval** permits making one named private Artifact public and staging its Gallery page.
2. **Deployment approval** permits deploying the already reviewed website changes to `ancher.us`.

Neither “start,” “run the batch,” nor approval of this workflow grants either permission. Approval must identify the Artifact or an unmistakable review item. If revisions are requested, return it to `needs_revision` and generate a new private revision.

## Required state order

`source_ready → brief_ready → generating → pending_review → approved → artifact_public → site_staged → deploy_approved → deployed → verified`

Generation errors return to `generating`. Rejected reviews move through `needs_revision` before generation. Never skip from private generation to public or deployed.

## Review packet

Show the reviewer:

- Gallery slug and proposed title
- intended audience(s) and deliverable type
- primary keyword
- every X source URL
- private Ancher review link
- visible word count
- validator result
- a screenshot or direct preview
- any inference or limitation that requires attention

Stop at `pending_review`. Do not combine review and publication in one action.

Identify each run by `slug:sourceHash`. Store the Ancher Artifact ID and current state. On retry, resume the same item or create an explicit revision; do not silently create duplicates.
