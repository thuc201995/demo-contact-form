import React, { PureComponent } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Container,
  Label,
  Modal
} from "semantic-ui-react";

import { addContactMutaion, getContactsQuery } from "../queries/contacts";
import { graphql } from "react-apollo";
const vEmail = "email";
const vRequired = "required";
const nameType = {
  value: "",
  hasError: false,
  error: [],
  isRequired: true,
  validate: [vRequired],
  name: "name",
  label: "Name",
  placeholder: "Full name"
};
const emailType = {
  value: "",
  hasError: false,
  error: [],
  isRequired: true,
  validate: [vRequired, vEmail],
  name: "email",
  label: "Email",
  placeholder: "e.g. Example@gmail.com"
};

const messageType = {
  value: "",
  hasError: false,
  error: [],
  isRequired: true,
  validate: [vRequired],
  name: "message",
  label: "Message",
  placeholder: "Message"
};
const IntitialState = {
  name: nameType,
  email: emailType,
  error: {},
  message: messageType,
  termsAndConditions: false,
  modal: {
    isOpen: false,
    modalHeader: "",
    modalContent: "",
    modalClass: "green"
  }
};
const ResultModal = ({ size, open, close, header, content, color }) => {
  return (
    <Modal size={size} open={open} onClose={close}>
      <Label as="a" color={color} ribbon>
        {header}
      </Label>
      <Modal.Content>
        <center>
          <h3>{content}</h3>
        </center>
      </Modal.Content>
    </Modal>
  );
};
const ContactHeader = () => (
  <Header as="h3" style={{ marginBottom: "20px", marginTop: "5px" }}>
    <Icon name="mail" />
    <Header.Content>
      Contact
      <Header.Subheader>How can we help you?</Header.Subheader>
    </Header.Content>
  </Header>
);

class ContactForm extends PureComponent {
  state = { ...IntitialState };
  _handleChange = (e, { name, value }) => {
    this.setState(prevState => ({
      [name]: { ...prevState[name], hasError: false, error: [], value: value }
    }));
  };

  _handleReset = () => {
    this.setState({
      ...IntitialState
    });
  };
  validate = (typeValid, value) => {
    switch (typeValid) {
      case vRequired:
        return value.trim() ? false : "This Field has been required";
      case vEmail:
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value.trim()).toLowerCase())
          ? false
          : "Email is invalid";
      default:
        return false;
    }
  };
  _handleValidate = fields => {
    let hasError = false;
    const result = fields.map((item, index) => {
      const { validate, name } = item;
      if (!validate) return { isError: false, fieldName: name };

      let isError = false;
      const fieldValid = validate.map(typeValid => {
        const itemValidate = this.validate(typeValid, item.value);
        if (itemValidate !== false) {
          isError = true;
          hasError = true;
        }
        return itemValidate;
      });
      if (isError) {
        const error = fieldValid.filter(item => item !== false);
        return { isError, error, fieldName: name };
      } else return { isError: false, fieldName: name };
    });
    return { hasError, result };
  };
  _handleCloseModal = () => {
    this.setState(prevState => ({
      modal: { ...prevState.modal, isOpen: false }
    }));
  };
  _handleSendContact = () => {
    const { name, email, message } = this.state;
    this.props
      .addContactMutaion({
        variables: {
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim()
        },
        refetchQueries: [{ query: getContactsQuery }]
      })
      .then(value => {
        this._handleReset();
        this.setState(prevState => ({
          isFetching: false,
          modal: {
            modalHeader: "Success",
            modalClass: "blue",
            modalContent: "The contact has been sent",
            isOpen: true
          }
        }));
      })
      .catch((error, value) => {
        this.setState(prevState => ({
          isFetching: false,
          modal: {
            modalHeader: "Error",
            modalClass: "red",
            modalContent: "Something went wrong. Please try again later.",
            isOpen: true
          }
        }));
      });
  };
  _handleSubmit = () => {
    const { name, email, message } = this.state;
    this.setState({ isFetching: true });
    const validate = this._handleValidate([name, email, message]);
    if (validate.hasError) {
      validate.result.forEach(item => {
        if (item.isError) {
          this.setState(prevState => ({
            ...prevState,
            [item.fieldName]: {
              ...prevState[item.fieldName],
              hasError: true,
              error: item.error
            }
          }));
        }
      });
      this.setState({ isFetching: false });
      return;
    }

    this._handleSendContact();
  };
  render() {
    const { name, email, isFetching, message, modal } = this.state;
    return (
      <Container>
        <ContactHeader />
        <Form error loading={isFetching}>
          <Form.Input
            fluid
            label={name.label}
            placeholder={name.placeholder}
            name={name.name}
            value={name.value}
            error={name.hasError}
            onChange={this._handleChange}
            required={name.isRequired}
          />
          {name.hasError && (
            <Label basic color="red" pointing>
              {name.error[0]}
            </Label>
          )}
          <Form.Input
            fluid
            label={email.label}
            placeholder={email.placeholder}
            error={email.hasError}
            name={email.name}
            value={email.value}
            required={email.isRequired}
            onChange={this._handleChange}
          />
          {email.hasError && (
            <Label basic color="red" pointing>
              {email.error[0]}
            </Label>
          )}
          <Form.TextArea
            label={message.label}
            placeholder={message.placeholder}
            error={message.hasError}
            required={message.isRequired}
            onChange={this._handleChange}
            value={message.value}
            name={message.name}
          />
          {message.hasError && (
            <Label basic color="red" pointing>
              {message.error[0]}
            </Label>
          )}
          <br />
          <Button type="submit" onClick={this._handleSubmit}>
            Submit
          </Button>
        </Form>
        <ResultModal
          open={modal.isOpen}
          size="small"
          header={modal.modalHeader}
          content={modal.modalContent}
          color={modal.modalClass}
          close={this._handleCloseModal}
        />
      </Container>
    );
  }
}

export default graphql(addContactMutaion, { name: "addContactMutaion" })(
  ContactForm
);
