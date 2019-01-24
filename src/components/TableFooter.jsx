import React, { PureComponent } from "react";
import { Grid, Table, Input, Pagination } from "semantic-ui-react";

class TableFooter extends PureComponent {
  state = {
    activePage: this.props.activePage
  };

  componentDidUpdate(prevProps) {
    if (this.props.activePage !== prevProps.activePage) {
      this.setState({ activePage: this.props.activePage });
    }
  }
  handleInputPaginateChange = (e, { value }) => {
    this.setState({ activePage: value });
  };
  handlePageChange = (e, { activePage }) => {
    if (parseInt(activePage, 10) !== parseInt(this.state.activePage, 10))
      this.props.handlePageChange(activePage);
  };
  changePages = e => {
    if (parseInt(e.target.value, 10) !== parseInt(this.props.activePage, 10))
      this.props.handlePageChange(parseInt(e.target.value, 10));
  };
  render() {
    const { min, max, total, limit, totalCell } = this.props;
    const { activePage } = this.state;
    const from =
      parseInt(activePage, 10) * parseInt(limit, 10) - parseInt(limit, 10) + 1;
    const to =
      parseInt(activePage, 10) * parseInt(limit, 10) > total
        ? total
        : parseInt(activePage, 10) * parseInt(limit, 10);
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={totalCell}>
            <Grid columns={2} verticalAlign="middle">
              <Grid.Column style={{ textAlign: "right" }} width={4}>
                {total > 0 && `Showing ${from} to ${to} of ${total} entries`}
              </Grid.Column>
              <Grid.Column floated="right" width={12}>
                <Grid columns={2} verticalAlign="middle">
                  <Grid.Column style={{ textAlign: "right" }}>
                    <div>{`page: ${activePage}/${max}`}</div>
                    <Input
                      min={min}
                      max={max}
                      onChange={this.handleInputPaginateChange}
                      type="range"
                      value={activePage}
                      onMouseUp={this.changePages}
                      floated="right"
                      onBlur={this.changePages}
                    />
                  </Grid.Column>
                  <Grid.Column style={{ textAlign: "right" }}>
                    <Pagination
                      activePage={activePage}
                      onPageChange={this.handlePageChange}
                      totalPages={max}
                      // floated="right"
                    />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}

export default TableFooter;
