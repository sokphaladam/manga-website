import styles from "../../styles/Home.module.css";
import styles2 from "../../styles/Managa.module.css";
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import Image from "next/image";
import Pic from "../../public/me.jpg";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const QUERY = gql`
  query ($mangaDetailId: String!) {
    mangaDetail(id: $mangaDetailId) {
      description
      title
      chapterNumbersResetOnNewVolume
      altTitles
      contentRating
      coverImage
      createdAt
      id
      isLocked
      lastChapter
      lastVolume
      links
      originalLanguage
      publicationDemographic
      relationships
      state
      status
      updatedAt
      version
      year
      tags {
        group
        id
        name
        version
      }
      volumes {
        chapter
        createdAt
        id
        images
        pages
        publishAt
        readableAt
        relationships
        title
        translatedLanguage
        updatedAt
        volume
        externalUrl
      }
    }
  }
`;

export default function MangaDetail() {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      mangaDetailId: router.query.id,
    },
  });

  return (
    <div className={styles.container}>
      {loading && (
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {data && (
        <div
          className={styles2.manga_background}
          style={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url(${data.mangaDetail.coverImage})`,
            height: window.innerHeight,
            overflow: "auto",
          }}
        >
          <div className={styles2.container}>
            <div style={{ display: "flex" }}>
              <Image
                src={Pic}
                loader={() => `${data.mangaDetail.coverImage}`}
                width={200}
                height={300}
                alt=""
                className="card-manga"
                quality="100"
                priority
                placeholder={"blur"}
              />
              <div className={styles2.block_title} style={{ display: "flex" }}>
                <div>
                  <p className={styles2.title} style={{ fontSize: "50pt" }}>
                    {data.mangaDetail.title.en}
                  </p>
                  <p className={styles2.title} style={{ fontSize: "14pt" }}>
                    {data.mangaDetail.altTitles.map(
                      (x: any) =>
                        Object.keys(x)[0] ===
                          data.mangaDetail.originalLanguage &&
                        x[Object.keys(x)[0]]
                    )}
                  </p>
                </div>
                <div>
                  <p className={styles2.title} style={{ fontSize: "14pt" }}>
                    {
                      data.mangaDetail.relationships.find(
                        (f: any) => f.type === "author"
                      ).attributes.name
                    }
                  </p>
                  <br />
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <small
                      style={{
                        marginRight: 10,
                        marginBottom: 10,
                        textTransform: "uppercase",
                        fontSize: 10,
                        fontWeight: "bold",
                        padding: 4,
                        borderRadius: 5,
                      }}
                      className="bg-danger text-light"
                    >
                      {data.mangaDetail.contentRating}
                    </small>
                    {data.mangaDetail.tags.map((x: any) => {
                      return (
                        <small
                          key={x.name}
                          className="badge bg-secondary"
                          style={{ marginRight: 10, marginBottom: 10 }}
                        >
                          {x.name.en}
                        </small>
                      );
                    })}
                    <div className="position-relative">
                      <small>
                        <span
                          style={{ position: "absolute", left: 0, top: "50%" }}
                          className={`translate-middle p-1 border border-light rounded-circle ${
                            data.mangaDetail.status === "completed"
                              ? "bg-info"
                              : "bg-success"
                          }`}
                        ></span>
                        <b
                          className="text-light"
                          style={{ marginLeft: 10, textTransform: "uppercase" }}
                        >
                          PUBLICATION: {data.mangaDetail.status}
                        </b>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <p style={{ color: "#f3f3f3" }}>
              {data.mangaDetail.description.en}
            </p>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: 300 }}>
                <h5 className="text-light" style={{ fontWeight: "bold" }}>
                  Genres:
                </h5>
                {data.mangaDetail.tags
                  .filter((x: any) => x.group === "genre")
                  .map((x: any) => {
                    return (
                      <small
                        key={x.name}
                        className="badge bg-secondary"
                        style={{ marginRight: 5 }}
                      >
                        {x.name.en}
                      </small>
                    );
                  })}
                <br />
                <br />
                <h5 className="text-light" style={{ fontWeight: "bold" }}>
                  Themes:
                </h5>
                {data.mangaDetail.tags
                  .filter((x: any) => x.group === "theme")
                  .map((x: any) => {
                    return (
                      <small
                        key={x.name}
                        className="badge bg-secondary"
                        style={{ marginRight: 5 }}
                      >
                        {x.name.en}
                      </small>
                    );
                  })}
              </div>
              <div
                style={{
                  width: "calc(100% - 350px)",
                }}
              >
                <ul className={styles2.list}>
                  {data.mangaDetail.volumes.map((x: any) => {
                    return (
                      <li
                        key={x.id}
                        className={styles2.item}
                        onClick={() => {
                          if (x.pages === 0) {
                            return (
                              process.browser &&
                              window.open(x.externalUrl, "_blank")?.focus()
                            );
                          }
                          router.push(`/chapter/${x.id}`);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <small>
                            {x.pages === 0 && (
                              <i
                                className="fa-solid fa-up-right-from-square"
                                style={{ marginRight: 7 }}
                              ></i>
                            )}
                            Vol.{x.volume || 0} Ch.{x.chapter || 0} - {x.title}
                          </small>
                          <small>Pages: {x.pages}</small>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
