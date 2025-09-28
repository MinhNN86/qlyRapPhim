import React, { useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import MovieForm from "./MovieForm";
import TicketList from "./TicketList";
import { v4 as uuidv4 } from "uuid";

export default function AdminView({ movies, setMovies, tickets, setTickets }) {
  const [visible, setVisible] = useState(false);
  const [detailMovie, setDetailMovie] = useState(null);

  // Thêm phim
  function handleAddMovie(movie) {
    setMovies([...movies, { ...movie, id: uuidv4() }]);
    setVisible(false);
    message.success("Đã thêm phim mới!");
  }

  // Xóa phim và vé liên quan
  function handleDeleteMovie(id) {
    setMovies(movies.filter((m) => m.id !== id));
    setTickets(tickets.filter((t) => t.movieId !== id));
    message.info("Đã xóa phim và vé liên quan.");
  }

  // Xem chi tiết vé
  function handleDetail(movie) {
    setDetailMovie(movie);
  }

  const columns = [
    { title: "Tên phim", dataIndex: "title" },
    {
      title: "Hình ảnh",
      render: (_, record) => (
        <img
          src={record.image || "https://via.placeholder.com/80x40"}
          alt=""
          width={80}
        />
      ),
    },
    { title: "Chỗ ngồi", dataIndex: "seats" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button onClick={() => handleDetail(record)} size="small">
            Xem vé
          </Button>
          <Popconfirm
            title="Xóa phim này?"
            onConfirm={() => handleDeleteMovie(record.id)}
          >
            <Button danger size="small" style={{ marginLeft: 8 }}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm phim mới
      </Button>
      <Table
        dataSource={movies}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <MovieForm
        open={visible}
        onCancel={() => setVisible(false)}
        onSubmit={handleAddMovie}
      />
      <Modal
        open={!!detailMovie}
        title={`Danh sách vé: ${detailMovie?.title}`}
        footer={null}
        onCancel={() => setDetailMovie(null)}
        width={600}
      >
        {detailMovie && (
          <TicketList
            movie={detailMovie}
            tickets={tickets}
            setTickets={setTickets}
          />
        )}
      </Modal>
    </>
  );
}
