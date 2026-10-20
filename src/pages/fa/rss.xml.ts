import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../../config/site";
import { t } from "../../i18n/utils";

/**
 * Farsi RSS feed — /fa/rss.xml (§8).
 *  · <language>fa</language> via customData
 *  · FA collection only; item links carry the /fa/ prefix so every
 *    entry lands on the Farsi page of the paired post
 */
export async function GET(context: APIContext) {
  const dict = t("fa");

  const posts = (
    await getCollection(
      "blog",
      ({ data }) => data.locale === "fa" && !data.draft,
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
      link: `/fa/blog/${post.id.split("/")[1] ?? post.id}`,
      categories: post.data.tags,
    })),
    customData: "<language>fa</language>",
  });
}
