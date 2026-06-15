import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

// Enable Next.js draft mode. When active, CMS fetches can include draft content
// by passing `status=draft` to Strapi queries (requires a valid API token with draft access).
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") ?? "post";

  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  const destination = type === "post" && slug ? `/blog/${slug}` : "/blog";
  redirect(destination);
}
