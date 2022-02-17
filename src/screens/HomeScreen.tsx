import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CardManage } from "../components/CardManga";
import { VARIABLE } from "../lib/variable";

const QUERY = gql`
  query mangaList {
    mangaList(limit: 100) {
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
    }
  }
`;

export function HomeScreen() {
  const { data, loading, error } = useQuery(QUERY, {
    onCompleted: () => {
      console.log(data);
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
        <div className="row">
          {data.mangaList.map((x: any) => {
            return (
              <div className="col-md-2" key={x.id}>
                <CardManage
                  mangaId={x.id}
                  filename={x.coverImage}
                  key={x.id}
                  title={x.title.en}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
