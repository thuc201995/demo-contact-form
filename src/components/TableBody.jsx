import React from "react";
import { Table, Label } from "semantic-ui-react";
import * as moment from "moment";
// const MaxMessageLength = 100;
const NoData = () => {
  return (
    <Table.Row>
      <Table.Cell colSpan={16} style={{ textAlign: "center" }}>
        <Label color="green">No new contact</Label>
      </Table.Cell>
    </Table.Row>
  );
};
const TableRow = ({ rowData, handleViewDetail }) => {
  const { name, email, message, createdAt } = rowData;
  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>
        {/* {message.length > MaxMessageLength
          ? message.slice(0, MaxMessageLength) + "..."
          : message} */}
        {message}
      </Table.Cell>
      <Table.Cell>
        {moment(parseInt(createdAt, 10)).format("DD/MM/YYYY, h:mm:ss a")}
      </Table.Cell>
    </Table.Row>
  );
};
const UserReferrerTableBody = ({ data, handleViewDetail }) => {
  return (
    <Table.Body>
      {data.length === 0 && <NoData />}
      {data.map((dataItem, index) => {
        return (
          <TableRow
            rowData={dataItem}
            key={`UserReferrerTableBody_${index}`}
            handleViewDetail={handleViewDetail}
          />
        );
      })}
    </Table.Body>
  );
};
export default UserReferrerTableBody;
