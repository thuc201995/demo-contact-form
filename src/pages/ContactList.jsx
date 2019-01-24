import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { getContactsQuery } from "../queries/contacts";
import { Table, Loader, Label, Header, Grid, Button } from "semantic-ui-react";
import TableFooter from "../components/TableFooter";
import TableHeader from "../components/TableHeader";
import TableBody from "../components/TableBody";

const getHeader = () => {
  return [
    { content: "Name" },
    { content: "Email" },
    { content: "Message", width: 8 },
    { content: "Created at" }
  ];
};
const RenderFetchingError = () => {
  return (
    <div colSpan={16} style={{ textAlign: "center" }}>
      <Label color="red">Can't connect server. Please try again later.</Label>
    </div>
  );
};
const CustomTable = ({ data, handlePageChange, handleInputPaginateChange }) => {
  const { limit, page, pages, total, docs } = data.contacts;
  const headerData = getHeader();
  return (
    <Table celled color="teal" striped selectable>
      <TableHeader headerData={headerData} />
      <TableBody data={docs ? docs : []} />
      <TableFooter
        key="pagination"
        activePage={page ? page : 1}
        min={1}
        max={pages ? pages : 1}
        total={total ? total : 0}
        limit={limit ? limit : 0}
        handlePageChange={handlePageChange}
        handleInputPaginateChange={handleInputPaginateChange}
        totalCell={headerData.length}
      />
    </Table>
  );
};
const ContactListHeader = () => (
  <Header
    as="h3"
    icon="tasks"
    content="  Contact list"
    style={{ marginBottom: "20px", marginTop: "5px" }}
  />
);
class ContactList extends PureComponent {
  _handlePageChange = (fetchMore, activePage) => {
    fetchMore({
      variables: {
        page: activePage
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          contacts: fetchMoreResult.contacts
        };
      }
    });
  };

  render() {
    return (
      <Query query={getContactsQuery} variables={{ limit: 5 }}>
        {({ loading, error, data, refetch, networkStatus, fetchMore }) => {
          if (networkStatus === 4) return "Refetching!";
          if (loading) return <Loader active inline="centered" />;
          if (error) return <RenderFetchingError />;

          return (
            <div>
              <Grid columns={2}>
                <Grid.Column>
                  <ContactListHeader />
                </Grid.Column>

                <Grid.Column>
                  <Button
                    color="teal"
                    content="Refresh"
                    onClick={() => refetch()}
                  />
                </Grid.Column>
              </Grid>
              <CustomTable
                data={data}
                handlePageChange={this._handlePageChange.bind(this, fetchMore)}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ContactList;
