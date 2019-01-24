import React, { PureComponent } from "react";

import { Menu, Segment } from "semantic-ui-react";
import logo from "../logo.png";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes";
import { withRouter } from "react-router-dom";
import MenuItems from "./MenuItems";

class Header extends PureComponent {
  state = { activeItem: "/contact" };
  handleItemClick = (e, { value }) => {
    const { activeItem } = this.state;
    if (activeItem === value) return;
    this.setState({ activeItem: value });
    this.props.history.push(value);
  };
  componentDidMount() {
    if (this.props.location.pathname !== this.state.activeItem) {
      this.setState({ activeItem: this.props.location.pathname });
    }
  }
  componentDidUpdate() {
    if (this.props.location.pathname !== this.state.activeItem) {
      this.setState({ activeItem: this.props.location.pathname });
    }
  }
  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary size="tiny">
          <Menu.Item style={{ marginLeft: "50px" }}>
            <img src={logo} alt="logo" />
          </Menu.Item>
          {MenuItems.map((item, idx) => {
            return (
              <Menu.Item
                name={item.name}
                active={activeItem === item.value}
                onClick={this.handleItemClick}
                key={`menu_${idx}`}
                value={item.value}
              />
            );
          })}
        </Menu>
        <Segment>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  // exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            })}
            <Redirect from="/" to="/contact" />
          </Switch>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Header);
