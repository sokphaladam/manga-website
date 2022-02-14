import React, { useEffect, useState } from "react";
import Image from "next/image";
import { VARIABLE } from "../lib/variable";
import Pic from "../../public/me.jpg";
import Link from "next/link";

export function CardManage({
  mangaId,
  filename,
  title,
}: {
  mangaId: string;
  filename: string;
  title: string;
}) {
  return (
    <Link href={`/manga/${mangaId}`}>
      <a>
        <div
          style={{
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 40,
            position: "relative",
            width: 200,
            height: 300,
            cursor: "pointer",
          }}
        >
          <Image
            src={Pic}
            alt=""
            loader={() => {
              return `${VARIABLE.STATIC}covers/${mangaId}/${filename}`;
            }}
            width={200}
            height={300}
            quality="100"
            priority
            className="card-manga"
            placeholder={"blur"}
            title={title}
          />
          <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.6)",
              bottom: 0,
              fontSize: "18pt",
              width: 200,
              borderRadius: "0 0 7px 7px",
              color: "#ffffff",
              padding: 5,
            }}
          >
            {title}
          </div>
        </div>
      </a>
    </Link>
  );
}
