import React, { useState } from "react";
import { Card, Button, List, Input, Modal, message } from "antd";
import { v4 as uuidv4 } from "uuid";

export default function UserView({ movies, tickets, setTickets }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userName, setUserName] = useState("");
  const [visible, setVisible] = useState(false);

  // Lấy danh sách vé theo phim
  function getMovieTickets(movieId) {
    return tickets.filter((t) => t.movieId === movieId);
  }

  function handleBook(movie) {
    setSelectedMovie(movie);
    setVisible(true);
  }
  function handleOk() {
    if (!userName) {
      message.error("Nhập tên người đặt vé");
      return;
    }
    // Kiểm tra số ghế đã đặt
    const movieTickets = getMovieTickets(selectedMovie.id);
    if (movieTickets.length >= selectedMovie.seats) {
      message.error("Phim đã hết chỗ!");
      return;
    }
    // Kiểm tra user đã đặt chưa
    if (movieTickets.some((t) => t.userName === userName)) {
      message.error("Bạn đã đặt vé phim này!");
      return;
    }
    setTickets([
      ...tickets,
      {
        id: uuidv4(),
        movieId: selectedMovie.id,
        userName,
        time: Date.now(),
        canceled: false,
      },
    ]);
    setUserName("");
    setVisible(false);
    message.success("Đặt vé thành công!");
  }
  function handleCancel() {
    setUserName("");
    setVisible(false);
  }

  function handleCancelTicket(ticketId) {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, canceled: true } : t))
    );
    message.info("Đã huỷ vé!");
  }

  return (
    <>
      <h2>Danh sách phim</h2>
      <List
        grid={{ gutter: 12, column: 6 }}
        dataSource={movies}
        renderItem={(movie) => {
          const movieTickets = getMovieTickets(movie.id);
          const available =
            movie.seats - movieTickets.filter((t) => !t.canceled).length;
          return (
            <List.Item>
              <Card
                style={{
                  minWidth: 160,
                  maxWidth: 500,
                  margin: "0 auto",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                cover={
                  <img
                    alt={movie.title}
                    src={
                      movie.image ||
                      "https://variety.com/wp-content/uploads/2023/03/Movie-Theater-Film-Cinema-Exhibition-Placeholder.jpg?w=1000&h=562&crop=1"
                    }
                    style={{
                      height: 500,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                }
                title={movie.title}
                extra={
                  available > 0 ? (
                    <Button onClick={() => handleBook(movie)}>Đặt vé</Button>
                  ) : (
                    <span style={{ color: "red" }}>Hết chỗ</span>
                  )
                }
              >
                <div>
                  <b>Chỗ trống:</b> {available} / {movie.seats}
                </div>
                <div>
                  <b>Đã đặt:</b>{" "}
                  {movieTickets.filter((t) => !t.canceled).length} vé
                </div>
                <div>{movie.description}</div>
                <div>
                  <b>Người đã đặt:</b>{" "}
                  {movieTickets
                    .filter((t) => !t.canceled)
                    .map((t) => (
                      <span key={t.id}>
                        {t.userName}
                        <Button
                          size="small"
                          danger
                          style={{ marginLeft: 8 }}
                          onClick={() => handleCancelTicket(t.id)}
                        >
                          Huỷ vé
                        </Button>{" "}
                      </span>
                    ))}
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
      <Modal
        title={`Đặt vé: ${selectedMovie?.title}`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đặt vé"
      >
        <Input
          placeholder="Nhập tên người đặt"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Modal>
    </>
  );
}
