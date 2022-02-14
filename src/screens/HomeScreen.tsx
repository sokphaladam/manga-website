import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CardManage } from "../components/CardManga";
import { VARIABLE } from "../lib/variable";

async function query(search: string) {
  const res = await fetch(
    `${VARIABLE.URL}manga?${
      search ? `title=${search}&` : ""
    }limit=100&offset=0&order[updatedAt]=desc&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica`
  );
  const data = await res.json();
  return data.data;
}

export function HomeScreen(props: any) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const res = await query(router.query.s ? router.query.s + "" : "");
    setTimeout(() => {
      if (res) {
        setData(res);
        setLoading(false);
      }
    }, 1000);
  }

  useEffect(() => {
    getData();
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {(data as any[]).map((x) => {
        const cover = x.relationships.find((f: any) => f.type === "cover_art");
        return (
          <CardManage
            mangaId={x.id}
            filename={cover ? cover.attributes.fileName : ""}
            key={x.id}
            title={x.attributes.title.en}
          />
        );
      })}
    </div>
  );
}
