import React from "react";
import { Table } from "semantic-ui-react";

const HeaderCells = ({ headerData }) => {
  if (!Array.isArray(headerData)) return "";
  return headerData.map((cellItem, index) => {
    return (
      <Table.HeaderCell
        key={`cell_header_item_${index}`}
        width={cellItem.width}
      >
        {cellItem.content}
      </Table.HeaderCell>
    );
  });
};
const UserReferrerTableHeader = ({ headerData }) => {
  return (
    <Table.Header>
      <Table.Row>
        <HeaderCells headerData={headerData} />
      </Table.Row>
    </Table.Header>
  );
};

export default UserReferrerTableHeader;
