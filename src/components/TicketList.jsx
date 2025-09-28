import React from "react";
import { Table, Button, Tag, Popconfirm } from "antd";

export default function TicketList({ movie, tickets, setTickets }) {
  const movieTickets = tickets.filter((t) => t.movieId === movie.id);

  function handleCancel(ticketId) {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, canceled: true } : t))
    );
  }

  const columns = [
    { title: "Tên người đặt", dataIndex: "userName" },
    {
      title: "Trạng thái",
      render: (_, r) =>
        r.canceled ? (
          <Tag color="red">Đã huỷ</Tag>
        ) : (
          <Tag color="green">Đã đặt</Tag>
        ),
    },
    {
      title: "Thời gian",
      render: (_, r) => new Date(r.time).toLocaleString(),
    },
    {
      title: "Hành động",
      render: (_, r) =>
        r.canceled ? null : (
          <Popconfirm title="Huỷ vé này?" onConfirm={() => handleCancel(r.id)}>
            <Button danger size="small">
              Huỷ vé
            </Button>
          </Popconfirm>
        ),
    },
  ];

  return (
    <Table
      dataSource={movieTickets}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
}
