import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import { save, load } from "./utils/storage";

const { Header, Content } = Layout;

export default function App() {
  const [view, setView] = useState("user"); // "user" | "admin"
  // Dữ liệu phim, vé lưu localStorage (key: "movies", "tickets")
  const [movies, setMovies] = useState(() => load("movies", []));
  const [tickets, setTickets] = useState(() => load("tickets", []));

  // Đồng bộ localStorage khi movies/tickets thay đổi
  React.useEffect(() => {
    save("movies", movies);
  }, [movies]);
  React.useEffect(() => {
    save("tickets", tickets);
  }, [tickets]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[view]}
          onClick={(e) => setView(e.key)}
          items={[
            { key: "user", label: "Đặt vé" },
            { key: "admin", label: "Quản trị rạp" },
          ]}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        {view === "user" ? (
          <UserView
            movies={movies}
            setMovies={setMovies}
            tickets={tickets}
            setTickets={setTickets}
          />
        ) : (
          <AdminView
            movies={movies}
            setMovies={setMovies}
            tickets={tickets}
            setTickets={setTickets}
          />
        )}
      </Content>
    </Layout>
  );
}
