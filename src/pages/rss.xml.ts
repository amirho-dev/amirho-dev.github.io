import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../config/site";
import { t } from "../i18n/utils";

/**
 * English RSS feed — /rss.xml (§8).
 *  · <language>en</language> via customData (per-locale feed requirement)
 *  · newest first; links resolve against the configured site origin
 *  · feed copy comes from the dictionary's meta.rss namespace
 */
export async function GET(context: APIContext) {
  const dict = t("en");

  const posts = (
    await getCollection(
      "blog",
      ({ data }) => data.locale === "en" && !data.draft,
    )
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: dict.meta.rss.title,
    description: dict.meta.rss.description,
    site: context.site ?? new URL(SITE.url),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.split("/")[1] ?? post.id}`,
      categories: post.data.tags,
    })),
    customData: "<language>en</language>",
  });
}
