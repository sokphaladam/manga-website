import React, { useRef, useState } from "react";
import Image from "next/image";
import Pic from "../../public/me.jpg";
//@ts-ignore
import { Slide } from "react-slideshow-image";

interface Props {
  images: string[];
}

export function SlideShow({ images }: Props) {
  const [index, setIndex] = useState(0);
  const slideRef = useRef<any>();
  const [height, setHeight] = useState(
    process.browser ? window.innerHeight : 0
  );

  process.browser &&
    window.document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          if (slideRef.current) {
            if (index === 0) return;
            slideRef.current.goBack();
          }
          break;
        case 39:
          if (slideRef.current) {
            if (index === images.length - 1) return;
            slideRef.current.goNext();
          }
          break;
      }
    });

  process.browser &&
    window.addEventListener("resize", function () {
      setHeight(this.window.innerHeight);
    });

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    prevArrow: <></>,
    nextArrow: <></>,
    cssClass: {
      display: "none",
    },
  };

  return (
    <div style={{ margin: "auto", width: "100%" }}>
      <Slide
        {...properties}
        autoplay={false}
        ref={slideRef}
        onChange={(e: any) => setIndex(e + 1)}
        easing="ease"
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="each-slide">
              <Image
                src={Pic}
                alt=""
                loader={() => image}
                height={height}
                loading="lazy"
                objectFit="contain"
                objectPosition="auto 100%"
                placeholder="blur"
              />
            </div>
          );
        })}
      </Slide>
    </div>
  );

  /*
  return (
    <div style={{ display: "flex", justifyContent: "center", height: height }}>
      <span className="text-light">
        {index + 1} / {images.length}
      </span>
      <button
        onClick={() => {
          setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
        }}
      >
        {"<"}
      </button>
      <div className="slideshow" style={{ height: height }}>
        <div
          className="slideshowSlider"
          style={{
            transform: `translate3d(${-index * 100}%, 0, 0)`,
            height: height,
          }}
        >
          {images.map((image, index) => {
            return (
              <Image
                src={Pic}
                alt=""
                loader={() => image}
                height={height}
                loading="lazy"
                objectFit="contain"
                objectPosition="auto 100%"
                placeholder="blur"
                key={index}
                className="slide"
              />
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          setIndex((prevIndex) =>
            prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
          );
        }}
      >
        {">"}
      </button>
    </div>
  );
  */
}
