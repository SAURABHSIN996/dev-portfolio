import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Strapi fires webhooks with event names like "entry.publish", "entry.update", "entry.delete".
// Set a custom header "x-strapi-secret" in the Strapi webhook config.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-strapi-secret");
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model: string = body.model ?? "";
  const event: string = body.event ?? "";

  if (!event.startsWith("entry.")) {
    return NextResponse.json({ revalidated: false });
  }

  const bust = (tag: string) => revalidateTag(tag);

  if (model === "post") {
    bust("posts");
    const slug: string | undefined = body.entry?.slug;
    if (slug) bust(`post-${slug}`);
  } else if (model === "category") {
    bust("categories");
  } else {
    bust("posts");
    bust("categories");
  }

  return NextResponse.json({ revalidated: true });
}
