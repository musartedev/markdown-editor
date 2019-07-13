import React from "react";
import { Row, Col, Input } from "antd";
import showdown from "showdown";

import "./Styles/MarkDownEditor.css";

export default function MarkDownEditor(props) {
  const { rawText, handleOnChange } = props;

  const renderResult = () => {
    const converter = new showdown.Converter();
    return { __html: converter.makeHtml(rawText) };
  };

  return (
    <Row>
      <Col
        className="gutter-row"
        style={{ backgroundColor: "black" }}
        span={12}
        xs={24}
        sm={24}
        md={12}
      >
        <Input.TextArea
          autoFocus
          className="textarea"
          value={rawText}
          onChange={({ target }) => handleOnChange(target.value)}
        />
      </Col>
      <Col
        className="gutter-row markdown-container"
        span={12}
        xs={24}
        sm={24}
        md={12}
      >
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={renderResult()}
        />
      </Col>
    </Row>
  );
}
