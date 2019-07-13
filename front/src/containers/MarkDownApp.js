import React, { Component } from "react";
import { Layout, Alert, Empty, Spin, Row, Button } from "antd";

import MarkDownEditor from "../components/MarkDownEditor";
import SideMenu from "../components/SideMenu";

import * as documentsApi from "../api/document";

const { Content, Header } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentsList: [],
      currentDocument: null,
      loading: false,
      message: null
    };
  }

  handleOnChange = async value => {
    const { currentDocument } = this.state;
    this.setState({ currentDocument: { ...currentDocument, rawText: value } });
  };

  handleOnCreateClick = async () => {
    try {
      const title = window.prompt(`Name your new document`);
      this.setState({ loading: true, message: null });
      const { data } = await documentsApi.create(title);
      this.setState({
        message: data.message || "hola",
        messageType: "success"
      });
      return this.getDocuments();
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.description
          ? error.response.data.error.description
          : "An error has ocurred!";

      this.setState({ loading: false, message });
    }
  };

  handleOnDeleteClick = async () => {
    const { currentDocument } = this.state;
    if (
      window.confirm(`Are you sure you want to delete ${currentDocument.title}`)
    ) {
      try {
        this.setState({ loading: true, message: null });
        const { data } = await documentsApi.remove(currentDocument._id);
        this.setState({ message: data.message, messageType: "success" });
        return this.getDocuments();
      } catch (error) {
        this.setState({
          loading: false,
          message: "Error",
          messageType: "danger"
        });
        console.log(error);
      }
    }
  };

  handleOnSaveClick = async () => {
    const { currentDocument } = this.state;
    try {
      this.setState({ loading: true, message: null });
      const { data } = await documentsApi.update(
        currentDocument._id,
        currentDocument.rawText
      );

      this.setState({ message: data.message });
      this.getDocuments();
    } catch (error) {
      this.setState({ loading: false, message: "Error" });
      console.log(error);
    }
  };

  getDocuments = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await documentsApi.get();

      this.setState(state => ({
        documentsList: data.documents,
        loading: false,
        currentDocument: data.documents[0]
      }));
    } catch (error) {
      this.setState({ loading: false, message: "Error" });
      console.log(error);
    }
  };

  async componentDidMount() {
    await this.getDocuments();
  }

  render() {
    const {
      documentsList,
      currentDocument,
      message,
      messageType,
      loading
    } = this.state;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <SideMenu
          headTitle="Mark Down Editor"
          options={documentsList}
          currentId={currentDocument ? currentDocument._id : 0}
          onSelect={document =>
            this.setState({
              currentDocument: document
            })
          }
        />
        <Layout>
          <Header style={{ padding: "1em" }}>
            <Row type="flex" justify="end">
              {loading && <Spin style={{ marginRight: "1em" }} spinning />}
              <Button
                style={{ marginRight: "1em", alignSelf: "flex-start" }}
                onClick={this.handleOnCreateClick}
              >
                Add
              </Button>
              {currentDocument && [
                <Button
                  key={1}
                  style={{ marginRight: "1em" }}
                  onClick={this.handleOnDeleteClick}
                >
                  Delete
                </Button>,
                <Button
                  key={2}
                  style={{ marginRight: "1em" }}
                  onClick={this.handleOnSaveClick}
                >
                  Save
                </Button>
              ]}
            </Row>
          </Header>
          <Content>
            {message && (
              <Alert
                message={message}
                type={messageType}
                closable
                onClose={() => this.setState({ message: null })}
              />
            )}
            {documentsList.length > 0 ? (
              <MarkDownEditor
                rawText={currentDocument.rawText}
                handleOnChange={this.handleOnChange}
              />
            ) : (
              <Empty
                style={{ marginTop: "3em" }}
                description="No documents yet"
              />
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
