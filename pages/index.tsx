// pages/index.js
import { Blog } from "@/types/blog";
import Link from "next/link";
import { client } from "../libs/client";



type Props = {
  blogs: Blog[]
}

const Home: React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
// ビルド時にサーバー側で呼ばれる関数
// ビルド時にデータを取得し、静的なHTMLを出力するために必要
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  console.log("data: %o", data)

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home