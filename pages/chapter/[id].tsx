/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import { useState } from "react";
import Image from "next/image";
import Pic from "../../public/me.jpg";
import { SlideShow } from "../../src/components/SlideShow";

const Chapter: NextPage = ({ data }: any) => {
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(data.chapter.dataSaver.length - 1);
  const [height, setHeight] = useState(
    process.browser ? window.innerHeight : 0
  );

  process.browser &&
    window.addEventListener("resize", function () {
      setHeight(this.window.innerHeight);
    });

  return process.browser ? (
    <SlideShow
      images={data.chapter.dataSaver.map(
        (x: any) => `${data.baseUrl}/data-saver/${data.chapter.hash}/${x}`
      )}
    />
  ) : (
    <></>
  );

  // return (
  //   <div style={{ display: "flex", justifyContent: "center" }}>
  //     {process.browser && (
  //       <Image
  //         src={Pic}
  //         alt=""
  //         loader={() =>
  //           `${data.baseUrl}/data-saver/${data.chapter.hash}/${data.chapter.dataSaver[index]}`
  //         }
  //         height={height}
  //         loading="lazy"
  //         objectFit="contain"
  //         objectPosition="auto 100%"
  //         placeholder="blur"
  //       />
  //     )}
  //   </div>
  // );
};

Chapter.getInitialProps = async (ctx) => {
  const res = await fetch(`${VARIABLE.URL}at-home/server/${ctx.query.id}`);
  const data = await res.json();

  return { data };
};

export default Chapter;
