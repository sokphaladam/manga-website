/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import { useState } from "react";
import Image from "next/image";
import Pic from "../../public/me.jpg";

const Chapter: NextPage = ({ data }: any) => {
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(data.chapter.dataSaver.length - 1);
  const [height, setHeight] = useState(
    process.browser ? window.innerHeight : 0
  );

  process.browser &&
    window.document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          if (index === 0) return;
          setIndex(index - 1);
          break;
        case 39:
          if (index === data.chapter.dataSaver.length - 1) return;
          setIndex(index + 1);
          break;
      }
    });

  process.browser &&
    window.addEventListener("resize", function () {
      setHeight(this.window.innerHeight);
    });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {process.browser && (
        <Image
          src={Pic}
          alt=""
          loader={() =>
            `${data.baseUrl}/data-saver/${data.chapter.hash}/${data.chapter.dataSaver[index]}`
          }
          height={height}
          loading="lazy"
          objectFit="contain"
          objectPosition="auto 100%"
          placeholder="blur"
        />
      )}
    </div>
  );
};

Chapter.getInitialProps = async (ctx) => {
  const res = await fetch(`${VARIABLE.URL}at-home/server/${ctx.query.id}`);
  const data = await res.json();

  return { data };
};

export default Chapter;
