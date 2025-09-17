import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TableComponent from "../Components/TableCompoment";
import Buttons from "../Atoms/Buttons";
import {
  useModalStore,
  useUsers,
  type useModalStoreType,
} from "../Store/Store";
import FormComponents from "../Components/FormComponents";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const MasterLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const createUserState = useUsers((state: any) => state.createUser);
  const openModal = useModalStore(
    (state: useModalStoreType) => state.openModal
  );

  const openTheModal = () => {
    openModal();
  };
  function createUserApi(data: any) {
    createUserState(data);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <FormComponents handleSubmission={createUserApi} />

        <Header style={{ padding: 0, background: colorBgContainer }}>
          React Hook From + Zustand + Ant Design
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <Breadcrumb
              style={{ margin: "10px 0" }}
              items={[{ title: "User Data" }]}
            />
            <Buttons
              myOnClick={openTheModal}
              label="Create User"
              btnColor="volcano"
              htmlType="button"
            />
          </div>

          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <TableComponent />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>React Hook From</Footer>
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
