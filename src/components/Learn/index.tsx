import React from "react";

// Styles
import { Table, TableHeading, TableData } from "./styles";

// Types
import { dataType } from "../../types";

// Assets
import crossImage from "../../images/cross.png";

interface props {
  data: dataType[];
}

export default function Learn({ data }: props) {
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
        {data.map((el) => (
          <tr key={el.word}>
            <TableData>{el.type}</TableData>
            <TableData>{el.word}</TableData>
            <TableData>{el.translation}</TableData>
            <td>
              <img
                src={crossImage}
                alt="cross"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={(e) => console.log(el.word)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
