export type Blog = {
    id: string
    title: string
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
}

export type ApiBlogList = {
    contents: Blog[],
    totalCount: number,
    offset: number,
    limit: number
}