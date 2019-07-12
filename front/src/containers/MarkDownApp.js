import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";

import Logo from "../logo.svg";

import MarkDownEditor from "../components/MarkDownEditor";

const { Content, Sider } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocumentIdex: "0",
      documentsList: [
        { title: "Hola", rawText: "#Hola" },
        { title: "Hola2", rawText: "#hola2" }
      ]
    };
  }

  renderDocumentList = () => {
    const { documentsList, currentDocumentIdex } = this.state;

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[currentDocumentIdex]}
        mode="inline"
        onSelect={({ key }) => this.setState({ currentDocumentIdex: key })}
      >
        {documentsList.map((document, key) => (
          <Menu.Item key={key}>
            <Icon type="profile" />
            <span>{document.title}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  render() {
    const { documentsList, currentDocumentIdex } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <div className="logo">
            <img src={Logo} alt="MarkDown Editor Logo" />
            <h2>MarkDown Editor</h2>
          </div>
          {this.renderDocumentList()}
        </Sider>
        <Layout>
          <Content style={{ margin: "0" }}>
            <MarkDownEditor
              rawText={documentsList[currentDocumentIdex].rawText}
              handleOnChange={value =>
                this.setState({
                  documentList: [
                    ...documentsList,
                    { ...documentsList[currentDocumentIdex], rawText: value }
                  ]
                })
              }
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
