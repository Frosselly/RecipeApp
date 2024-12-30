import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Root() {
  return (
    <>
      <Nav />
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  );
}
