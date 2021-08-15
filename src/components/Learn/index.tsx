import React, { useState, useEffect } from "react";

// Styles
import { Table, TableHeading, TableData } from "./styles";

// Types
import { dataType } from "../../types";

// Assets
import crossImage from "../../images/cross.png";

function deleteWord(
  event: React.MouseEvent,
  json: dataType[],
  setJson: React.Dispatch<React.SetStateAction<dataType[]>>
) {
  let id = event.currentTarget.parentElement?.parentElement?.dataset.id;
  const url = "http://localhost:5000/remove/" + id;
  fetch(url, {
    method: "delete",
  });
  setJson(json.filter((el) => el.id !== Number(id)));
}

export default function Learn() {
  let [json, setJson] = useState<dataType[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/learn")
      .then((resp) => resp.json())
      .then((json) => setJson(json))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Table>
      <thead>
        <tr>
          <TableHeading>
            <h3>Type</h3>
          </TableHeading>
          <TableHeading>
            <h3>Word</h3>
          </TableHeading>
          <TableHeading>
            <h3>Translation</h3>
          </TableHeading>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {json.map((el) => (
          <tr key={el.id} data-id={el.id}>
            <TableData>{el.type}</TableData>
            <TableData>{el.word}</TableData>
            <TableData>{el.translation}</TableData>
            <td>
              <img
                src={crossImage}
                alt="cross"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={(e) => deleteWord(e, json, setJson)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
