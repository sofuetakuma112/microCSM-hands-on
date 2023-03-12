import { ApiBlogList, Blog } from "@/types/blog";
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';

type Props = {
    blog: Blog
}

const BlogId: React.FC<Props> = ({ blog }) => {
    console.log("blog.body: %o", blog.body)

    return <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <div
            dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
            }}
            className={styles.post}
        />
    </main>
}

// 静的生成のためのパスを指定します
// Next.js側ではブログのidを知り得ないため、事前に生成するべきHTMLのパスが分かりません。
// そこでこの関数内でデータを取得し、パスを定義してあげる必要があります
// またfallbackをfalseにしています。これで、getStaticPathsで返されないパスをすべて404ページで返します。
export const getStaticPaths = async () => {
    const data = await client.get<ApiBlogList>({ endpoint: "blog" });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: { params: { id: string; }; }) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};

export default BlogId