import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { URLSearchParams } from "url";
import { CardManage } from "../src/components/CardManga";
import { VARIABLE } from "../src/lib/variable";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {(data.data as any[]).map((x) => {
            const cover_key = x.relationships.find(
              (f: any) => f.type === "cover_art"
            ).id;
            return (
              <CardManage
                mangaId={x.id}
                coverId={cover_key}
                key={x.id}
                title={x.attributes.title.en}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch(
    `${VARIABLE.URL}manga?limit=25&offset=0&order[latestUploadedChapter]=desc`
  );
  const data = await res.json();

  return { data };
};

export default Home;
