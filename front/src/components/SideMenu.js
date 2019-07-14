import React from "react";
import { Menu, Icon, Layout } from "antd";

import Logo from "../logo.svg";
import "./Styles/SideMenu.css";

const { Sider } = Layout;

export default function SideMenu(props) {
  const {
    options,
    onSelect,
    headTitle,
    currentId,
    collapsed,
    onCollapse
  } = props;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">
        <img src={Logo} alt={`${headTitle} Logo`} />
        {!collapsed && <h2>{headTitle}</h2>}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentId.toString()]}
        onSelect={({ key }) => onSelect(options.find(elem => elem._id === key))}
      >
        {options &&
          options.length > 0 &&
          options.map(option => {
            return (
              <Menu.Item key={option._id}>
                <Icon type="profile" />
                <span>{option.title}</span>
              </Menu.Item>
            );
          })}
      </Menu>
    </Sider>
  );
}
