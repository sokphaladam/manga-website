import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const QUERY = gql`
  query mangaSearch($search: String) {
    mangaSearch(search: $search)
  }
`;

export function Topbar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data } = useQuery(QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      search,
    },
  });

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Manga</a>
        </Link>
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            router.replace({
              pathname: router.pathname,
              search: "?s=" + searchInput,
            });
          }}
        >
          <input
            type="text"
            className="form-control form-control-sm"
            style={{
              backgroundColor: "transparent",
              color: "#f3f3f3",
            }}
            placeholder="search..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyUp={() => {
              clearTimeout(0);
              setTimeout(() => {
                setSearch(searchInput);
              }, 3000);
            }}
            list="list"
          />
          <datalist id="list">
            {data &&
              data.mangaSearch.manga.map((x: any) => {
                return <option key={x.id}>{x.attributes.title.en}</option>;
              })}
          </datalist>
        </form>
      </div>
    </nav>
  );
}
