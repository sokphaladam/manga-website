import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import Image from "next/image";
import Pic from "../../public/me.jpg";
import { useEffect, useState } from "react";

async function query(coverId: string) {
  const res = await fetch(`${VARIABLE.URL}cover/${coverId}`);
  const data = await res.json();

  return data.data.attributes.fileName;
}

const MangaDetail: NextPage = ({ data, id }: any) => {
  const [filename, setFilename] = useState("");

  async function getData() {
    const coverId = data.relationships.find(
      (f: any) => f.type === "cover_art"
    ).id;
    const x = await query(coverId);
    setFilename(x);
  }

  useEffect(() => {
    getData();
  });

  /*
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto auto;
  */
  return (
    <div className={styles.container}>
      <div
        style={{
          background: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url(${VARIABLE.STATIC}/covers/${id}/${filename})`,
          width: "100%",
          height: 300,
          position: "absolute",
          left: 0,
          backgroundSize: "cover",
          filter: "blur(5px)",
        }}
      />
      <div
        style={{
          minHeight: "100vh",
          padding: "4rem 0",
          flex: 1,
          width: "80%",
          margin: "auto auto",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Image
            src={Pic}
            loader={() => `${VARIABLE.STATIC}/covers/${id}/${filename}`}
            width={200}
            height={300}
            alt=""
            className="card-manga"
          />
          <div style={{ marginLeft: 20, zIndex: 1 }}>
            <p
              style={{ color: "#fff", fontSize: "50pt", fontWeight: "bolder" }}
            >
              {data.attributes.title.en}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MangaDetail.getInitialProps = async (ctx) => {
  const res = await fetch(`${VARIABLE.URL}manga/${ctx.query.id}`);
  const data = await res.json();
  return { data: data.data, id: ctx.query.id };
};

export default MangaDetail;
