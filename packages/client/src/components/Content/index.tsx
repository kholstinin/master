import "./content.css";

import type { TodoItem } from "todolist-typings";

import React, { useState, useEffect, useRef } from "react";
import { Input, List, Checkbox, Form } from "antd";
import { RestFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Search } = Input;

export function Content() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const inputRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch(BASE_API_URL + "/api/v1/todos")
      .then((resp) => resp.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const onCheck = (item: TodoItem) => {
    const { id } = item;

    fetch(BASE_API_URL + `/api/v1/check/${id}`, {
      method: "get"
    }).then(() => {
      const newItems = [...items],
        changedItem = newItems.filter((item) => item.id === id)[0];

      changedItem.checked = !changedItem.checked;
      setItems(newItems);
    });
  };

  const onAdd = (text: string) => {
    if (text === "") {
      return;
    }

    const dataItem = { data: text, checked: false, id: uuidv4() };

    fetch(BASE_API_URL + "/api/v1/add", {
      method: "post",
      body: JSON.stringify(dataItem)
    }).then(() => {
      setItems([...items, dataItem]);
      form.setFieldValue("todo", "");
    });
  };

  const onDelete = (item: TodoItem) => {
    fetch(BASE_API_URL + "/api/v1/delete", {
      method: "post",
      body: JSON.stringify(item)
    });

    const idForDelete = item.id;
    setItems(items.filter((item) => item.id !== idForDelete));
  };

  return (
    <React.Fragment>
      <div className="input__wrap">
        <Form form={form}>
          <Form.Item name="todo">
            <Search
              placeholder="Write some todo"
              allowClear
              enterButton="Add"
              size="large"
              onSearch={onAdd}
              ref={inputRef}
            />
          </Form.Item>
        </Form>
      </div>
      <List
        itemLayout="vertical"
        className="list"
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="list__item">
            <Checkbox checked={item.checked} onClick={() => onCheck(item)}>
              {item.data}
            </Checkbox>
            <RestFilled
              className="list__remove-icon"
              onClick={() => onDelete(item)}
            />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
}
