import type { NextPage } from "next";
import { HomeScreen } from "../src/screens/HomeScreen";

const Home: NextPage = (props: any) => {
  return (
    <div>
      <HomeScreen {...props} />
    </div>
  );
};

export default Home;
