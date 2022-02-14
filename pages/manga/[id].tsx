import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import Image from "next/image";
import Pic from "../../public/me.jpg";
import Link from "next/link";

const MangaDetail: NextPage = ({ data, id, list }: any) => {
  const { relationships, attributes } = data;
  const cover = relationships.find((f: any) => f.type === "cover_art");
  const author = relationships.find((f: any) => f.type === "author");
  const en_title = attributes.altTitles.map(
    (x: any) => Object.keys(x)[0] === "en" && x[Object.keys(x)[0]]
  );

  return (
    <div className={styles.container}>
      <div
        style={{
          background: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url(${VARIABLE.STATIC}/covers/${id}/${cover.attributes.fileName})`,
          width: "100%",
          height: 300,
          position: "fixed",
          left: 0,
          top: 0,
          right: 0,
          backgroundSize: "cover !important",
          filter: "blur(1px)",
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
            loader={() =>
              `${VARIABLE.STATIC}covers/${id}/${cover.attributes.fileName}`
            }
            width={200}
            height={300}
            alt=""
            className="card-manga"
            quality="100"
            priority
            placeholder={"blur"}
          />
          <div
            style={{
              marginLeft: 20,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: "50pt",
                  fontWeight: "bolder",
                  margin: 0,
                }}
              >
                {attributes.title.en}
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: "14pt",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                {en_title}
              </p>
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: "14pt",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {author.attributes.name}
            </p>
          </div>
        </div>
        <br />
        <p style={{ color: "#fff" }}>{attributes.description.en}</p>
        <br />
        <div className="btn-group">
          <button className="btn btn-sm btn-dark">Info</button>
          <button className="btn btn-sm btn-secondary">Chapter</button>
        </div>
        {Object.keys(list.volumes).map((k) => {
          return (
            <table className="table table-responsive text-light" key={k}>
              {Object.keys(list.volumes[k].chapters).map((x) => {
                return (
                  <tr key={x}>
                    <td>
                      <Link href={`/chapter/${list.volumes[k].chapters[x].id}`}>
                        <a>
                          Vol.{list.volumes[k].volume} Ch.
                          {list.volumes[k].chapters[x].chapter}
                        </a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          );
        })}
        {/* {Object.keys(list.volumes).map((k: any) => {
          return (
            <table className="table table-responsive" key={k}>
              {Object.keys(list.volumes[k].chapters).map((c: any) => {
                return (
                  <tr key={c}>
                    <td>
                      Vol.{list.volumes[k].volume} Ch.
                      {list.volumes[k].chapters[c].chapter}
                    </td>
                  </tr>
                );
              })}
            </table>
          );
        })} */}
      </div>
    </div>
  );
};

MangaDetail.getInitialProps = async (ctx) => {
  const res = await fetch(
    `${VARIABLE.URL}manga/${ctx.query.id}?includes[]=cover_art&includes[]=author&order[volume]=desc&order[chapter]=desc`
  );
  const aggregate = await fetch(
    `${VARIABLE.URL}manga/${ctx.query.id}/aggregate?translatedLanguage[]=en`
  );
  const data = await res.json();
  const x = await aggregate.json();
  return { data: data.data, id: ctx.query.id, list: x };
};

export default MangaDetail;
