/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import { VARIABLE } from "../../src/lib/variable";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pic from "../../public/me.jpg";
import { SlideShow } from "../../src/components/SlideShow";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles2 from "../../styles/Managa.module.css";
import styles from "../../styles/Home.module.css";

const QUERY = gql`
  query ($mangaChapterId: String!) {
    mangaChapter(id: $mangaChapterId) {
      chapter
      volume
      pages
      title
      relationships
      nextChapter
      images
    }
  }
`;

class ChapterClass extends React.Component<any> {
  state: {
    index: number;
    page: number;
    height: number;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
      page: props.page,
      height: process.browser ? window.innerHeight : 0,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  onNext = () => {
    if (this.state.index === this.state.page - 1) {
      this.setState({
        index: 0,
      });
      this.props.onNextChapter();
      return;
    }
    this.setState({ index: this.state.index + 1 });
  };

  onBack = () => {
    if (this.state.index === 0) return;
    this.setState({ index: this.state.index - 1 });
  };

  onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 37:
        this.onBack();
        break;
      case 39:
        this.onNext();
        break;
      default:
        return;
    }
  };

  onResize = () => {
    this.setState({ height: window.innerHeight - 100 });
  };

  componentDidMount() {
    window.document.addEventListener("keydown", this.onKeyDown, false);

    window.addEventListener("resize", this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown, false);
    window.removeEventListener("resize", this.onResize, false);
  }

  render(): React.ReactNode {
    return (
      <div>
        <br />
        <br />
        <h5>{this.props.data.mangaChapter.title}</h5>
        <h6>
          {
            this.props.data.mangaChapter.relationships.find(
              (x: any) => x.type === "manga"
            ).attributes.title.en
          }
        </h6>
        <br />
        <div style={{ display: "flex" }}>
          <div
            className="text-center bg-info"
            style={{ marginRight: 10, width: "calc(100% / 3)" }}
          >
            Vol.{this.props.data.mangaChapter.volume} Ch.
            {this.props.data.mangaChapter.chapter}
          </div>
          <div
            className="text-center bg-info"
            style={{ marginRight: 10, width: "calc(100% / 3)" }}
          >
            Page.{this.state.index + 1}/{this.state.page}
          </div>
          <div
            className="text-center bg-info"
            style={{
              marginRight: 10,
              width: "calc(100% / 3)",
              cursor: "pointer",
            }}
            onClick={() => {
              this.props.onMenu();
            }}
          >
            Menu
          </div>
        </div>
        <br />
        {this.props.data.mangaChapter.relationships.find(
          (x: any) => x.type === "manga"
        ).attributes.originalLanguage !== "ko" ? (
          <div
            style={{
              display: "flex",
              height: this.state.height,
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: window.innerWidth / 3,
                bottom: 0,
                left: 0,
                backgroundColor: "transparent",
                height: "100%",
                zIndex: 1,
              }}
              onClick={this.onBack}
            ></div>
            <div
              style={{
                position: "absolute",
                width: window.innerWidth / 3,
                bottom: 0,
                right: 0,
                backgroundColor: "transparent",
                height: "100%",
                zIndex: 1,
              }}
              onClick={this.onNext}
            ></div>
            <div></div>
            {this.props.data.mangaChapter.images.map((x: any, i: number) => {
              return (
                <div
                  className={
                    i === this.state.index
                      ? styles2.chapter_manga_viewer
                      : styles2.chapter_manga
                  }
                  key={i}
                >
                  <Image
                    src={Pic}
                    loader={() => x}
                    alt=""
                    placeholder="blur"
                    height={this.state.height}
                    quality={100}
                    className={styles2.koImage}
                    priority
                  />
                </div>
              );
            })}
            <div></div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              height: this.state.height,
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div></div>
            <div>
              {this.props.data.mangaChapter.images.map((x: any, i: number) => {
                return (
                  <div key={i} className="text-center">
                    <img src={x} alt="" className={styles2.koImage} />
                  </div>
                );
              })}
              <div
                className="bg-danger"
                style={{
                  width: window.innerWidth - 100,
                  padding: 10,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={this.props.onNextChapter}
              >
                Next Chapter
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    );
  }
}

const Chapter: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    fetchPolicy: "no-cache",
    skip: !router.query.id,
    variables: {
      mangaChapterId: String(router.query.id),
    },
  });

  return (
    <div className={styles.container}>
      {loading && (
        <div className="container text-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {data && (
        <ChapterClass
          page={data.mangaChapter.images.length}
          data={data}
          onNextChapter={() => {
            if (data.mangaChapter.nextChapter === null) {
              router.push(
                `/manga/${
                  data.mangaChapter.relationships.find(
                    (x: any) => x.type === "manga"
                  ).id
                }`
              );
            } else {
              router.push(`/chapter/${data.mangaChapter.nextChapter}`);
            }
          }}
          onMenu={() => {
            router.push(
              `/manga/${
                data.mangaChapter.relationships.find(
                  (x: any) => x.type === "manga"
                ).id
              }`
            );
          }}
        />
      )}
    </div>
  );
};

export default Chapter;
