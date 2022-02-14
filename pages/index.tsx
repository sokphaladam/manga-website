import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { VARIABLE } from "../src/lib/variable";
import { HomeScreen } from "../src/screens/HomeScreen";
import styles from "../styles/Home.module.css";

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(
    router.query.s ? router.query.s : ""
  );

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <input
          type="text"
          className="form-control"
          placeholder="Search title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              router.query.s = searchInput;
              router.push({
                pathname: router.pathname,
                query: router.query,
              });
              setSearchInput("");
            }
          }}
        />
        <br />
        <HomeScreen {...props} />
      </div>
    </div>
  );
};

export default Home;
