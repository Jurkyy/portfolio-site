import { getCollection, type CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

/**
 * Projects for listings (home preview + projects page).
 * Entries with an explicit `order` come first (ascending) and may be child
 * projects; after that come top-level projects by `popularity` (descending).
 */
export async function getListedProjects(): Promise<Project[]> {
	const all = await getCollection("projects");
	const ordered = all
		.filter((p) => p.data.order !== undefined)
		.sort((a, b) => a.data.order! - b.data.order!);
	const rest = all
		.filter((p) => p.data.order === undefined && !p.slug.includes("/"))
		.sort((a, b) => (b.data.popularity ?? 50) - (a.data.popularity ?? 50));
	return [...ordered, ...rest];
}
