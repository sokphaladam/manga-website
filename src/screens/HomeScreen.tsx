import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CardManage } from "../components/CardManga";
import { VARIABLE } from "../lib/variable";
import Image from "next/image";
import Pic from "../../public/me.jpg";

const QUERY = gql`
  query mangaList($search: String) {
    mangaList(limit: 25, search: $search) {
      id
      title
      altTitles
      chapterNumbersResetOnNewVolume
      contentRating
      createdAt
      isLocked
      lastChapter
      lastVolume
      links
      originalLanguage
      publicationDemographic
      state
      status
      updatedAt
      version
      year
      tags {
        id
        group
        name
        version
      }
      coverImage
      relationships
    }
  }
`;

export function HomeScreen() {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      search: router.query.s ? router.query.s : undefined,
    },
  });

  return (
    <div>
      {loading && (
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {data && (
        <div className="container">
          <table className="table table-striped table-dark table-bordered table-hover table-manga">
            <thead>
              <tr>
                <th colSpan={2}>Manga</th>
                <th>Content, Demographic</th>
                <th className="text-center">Status</th>
                <th className="text-center">Author</th>
              </tr>
            </thead>
            <tbody>
              {data.mangaList.map((x: any) => {
                return (
                  <tr key={x.id} onClick={() => router.push(`/manga/${x.id}`)}>
                    <td style={{ width: 90 }}>
                      <Image
                        src={Pic}
                        loader={() => x.coverImage}
                        placeholder="blur"
                        priority
                        alt=""
                        width={75}
                        height={85}
                        objectFit={"cover"}
                        className="rounded"
                      />
                    </td>
                    <td>
                      <b>
                        <small>{x.title.en}</small>
                      </b>
                      <br />
                      {x.originalLanguage === "zh" && (
                        <i className="fi fi-cn"></i>
                      )}
                      {x.originalLanguage === "ko" && (
                        <i className="fi fi-kr"></i>
                      )}
                      {x.originalLanguage === "ja" && (
                        <i className="fi fi-jp"></i>
                      )}
                      {x.originalLanguage === "en" && (
                        <i className="fi fi-us"></i>
                      )}
                      <br />
                      <small>Latest Chapter: {x.lastChapter}</small>
                      <br />
                      <small>Year: {x.year}</small>
                    </td>
                    <td>
                      <small
                        className="bg-danger"
                        style={{
                          padding: 2,
                          borderRadius: 5,
                          fontSize: 11,
                          textTransform: "uppercase",
                        }}
                      >
                        {x.contentRating}
                      </small>
                      {x.publicationDemographic && (
                        <small
                          className="bg-info"
                          style={{
                            padding: 2,
                            borderRadius: 5,
                            fontSize: 11,
                            textTransform: "uppercase",
                            marginLeft: 7,
                          }}
                        >
                          {x.publicationDemographic}
                        </small>
                      )}
                    </td>
                    <td
                      className="text-center"
                      style={{ textTransform: "uppercase" }}
                    >
                      <b>
                        <small>{x.status}</small>
                      </b>
                    </td>
                    <td className="text-center">
                      {x.relationships
                        .filter((re: any) => re.type === "author")
                        .map((author: any, i: number) => {
                          return (
                            <small key={i}>
                              <small>{author.attributes.name}</small>
                              <br />
                            </small>
                          );
                        })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
