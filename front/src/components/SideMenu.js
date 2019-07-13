import React from "react";
import { Menu, Icon, Layout } from "antd";

import Logo from "../logo.svg";

const { Sider } = Layout;

export default function SideMenu(props) {
  const { options, onSelect, headTitle, currentId } = props;

  return (
    <Sider>
      <div className="logo">
        <img src={Logo} alt={`${headTitle} Logo`} />
        <h2>{headTitle}</h2>
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
