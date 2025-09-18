import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useUsers } from "../Store/Store";
import type { ColumnsType } from "antd/es/table";

interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

const columns: ColumnsType<UserType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: any) => (
      <Tag color={role === "customer" ? "green" : "blue"}>{role}</Tag>
    ),
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (url: any) => {
      console.log("url", url);
      return (
        <img
          src={`${url}`}
          alt="avatar"
          width={40}
          style={{ borderRadius: "50%" }}
        />
      );
    },
  },
  {
    title: "Created At",
    dataIndex: "creationAt",
    key: "creationAt",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const TableComponent: React.FC = () => {
  const fetchUsers = useUsers((state: any) => state.fetchUsers);
  const usersList = useUsers((state: any) => state.usersList);
  const updateCall = useUsers((state: any) => state.update);

  useEffect(() => {
    fetchUsers();
  }, [updateCall]);

  return (
    <Table<UserType> columns={columns} dataSource={usersList} rowKey="id" />
  );
};
export default TableComponent;
