import React from "react";
import { Form, Input, InputNumber, Modal } from "antd";

export default function MovieForm({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };
  return (
    <Modal
      open={open}
      title="Thêm phim mới"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lưu"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Tên phim" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Hình ảnh (URL)">
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item
          name="seats"
          label="Số chỗ ngồi"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={1000} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
