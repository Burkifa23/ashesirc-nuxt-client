import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { appConfig } from '@/config/app'

const sanityClient = createClient({
    projectId: appConfig.sanityProjectId,
    dataset: appConfig.sanityDataset,
    apiVersion: appConfig.sanityApiVersion,
    useCdn: !!appConfig.sanityUseCdn,
    token: appConfig.sanityReadToken || undefined,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}

// Convenience GROQ helper — try 'article' first, then 'post', and log results for debugging
export async function fetchBySlug(slug: string) {
    const query = `*[_type in ["article","post"] && slug.current == $slug][0]{..., author->{_id, firstName, lastName, "image": image.asset->url}, tags[]->{_id, title, "slug": slug.current}, mainImage{..., asset->{url}}}`
    const params = { slug }
    try {
        console.debug('[sanity] fetchBySlug query:', query)
        console.debug('[sanity] fetchBySlug params:', params)
        const doc = await sanityClient.fetch(query, params)
        console.debug('[sanity] fetchBySlug result for', slug, doc)

        // If author is present but only as a reference (e.g. { _ref: '...' }) and dereference didn't resolve,
        // try to fetch the author document directly so frontend can read `firstName`/`lastName`.
        if (doc && doc.author && !((doc.author.firstName || doc.author.lastName)) && doc.author._ref) {
            try {
                const authorId = doc.author._ref
                const authorQuery = `*[_id == $id][0]{_id, firstName, lastName, "image": image.asset->url}`
                const authorDoc = await sanityClient.fetch(authorQuery, { id: authorId })
                if (authorDoc) {
                    doc.author = authorDoc
                    console.debug('[sanity] fetched referenced author', authorDoc)
                }
            } catch (ae) {
                console.warn('[sanity] failed to fetch referenced author', ae)
            }
        }

        return doc
    } catch (err) {
        console.error('[sanity] fetchBySlug error for', slug, err)
        throw err
    }
}

export async function fetchFeaturedArticle() {
    const query = `*[_type in ["article","post"] && featured == true] | order(publishedDate desc, _createdAt desc)[0]{..., author->{_id, firstName, lastName, name, "image": image.asset->url}, tags[]->{_id, title, "slug": slug.current}, mainImage{..., asset->{url}}}`
    try {
        console.debug('[sanity] fetchFeaturedArticle query:', query)
        const doc = await sanityClient.fetch(query)
        console.debug('[sanity] fetchFeaturedArticle result:', doc)

        // same referenced-author fallback as in fetchBySlug
        if (doc && doc.author && !((doc.author.firstName || doc.author.lastName)) && doc.author._ref) {
            try {
                const authorId = doc.author._ref
                const authorQuery = `*[_id == $id][0]{_id, firstName, lastName, name, "image": image.asset->url}`
                const authorDoc = await sanityClient.fetch(authorQuery, { id: authorId })
                if (authorDoc) {
                    doc.author = authorDoc
                    console.debug('[sanity] fetched referenced author for featured article', authorDoc)
                }
            } catch (ae) {
                console.warn('[sanity] failed to fetch referenced author for featured article', ae)
            }
        }

        return doc
    } catch (err) {
        console.error('[sanity] fetchFeaturedArticle error', err)
        throw err
    }
}

export async function fetchArticlesList(limit = 20) {
    const query = `*[_type in ["article","post"]] | order(publishedDate desc, _createdAt desc)[0...${limit}]{..., author->{_id, firstName, lastName, name, "image": image.asset->url}, tags[]->{_id, title, "slug": slug.current}, mainImage{..., asset->{url}}}`
    try {
        console.debug('[sanity] fetchArticlesList query:', query)
        const docs = await sanityClient.fetch(query)
        console.debug('[sanity] fetchArticlesList result count:', Array.isArray(docs) ? docs.length : 0)

        // For any docs that still have author as a raw reference, fetch the author document
        for (const doc of docs || []) {
            if (doc && doc.author && !((doc.author.firstName || doc.author.lastName)) && doc.author._ref) {
                try {
                    const authorId = doc.author._ref
                    const authorQuery = `*[_id == $id][0]{_id, firstName, lastName, name, "image": image.asset->url}`
                    const authorDoc = await sanityClient.fetch(authorQuery, { id: authorId })
                    if (authorDoc) {
                        doc.author = authorDoc
                    }
                } catch (ae) {
                    console.warn('[sanity] failed to fetch referenced author for list item', ae)
                }
            }
        }

        return docs || []
    } catch (err) {
        console.error('[sanity] fetchArticlesList error', err)
        throw err
    }
}
