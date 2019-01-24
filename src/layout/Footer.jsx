import React from "react";

const Footer = () => {
  return (
    <footer>
      <section
        id="newsletter"
        className="section is-medium"
        style={{ background: "#cccccc1c" }}
      >
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="title">Hi!</p>
              <p className="subtitle is-4 has-text-grey-light">
                I'am Thuc and this is a simple demo website using react js.
              </p>
            </div>

            <div className="column">
              <form>
                <div className="field is-grouped">
                  <div className="control has-icons-left is-expanded">
                    <input
                      type="email"
                      name="email"
                      className="input is-medium is-flat"
                      placeholder="email address"
                      required=""
                    />
                    <span className="icon is-small is-left">
                      <svg
                        className="svg-inline--fa fa-envelope fa-w-16"
                        aria-hidden="true"
                        data-prefix="fas"
                        data-icon="envelope"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                        />
                      </svg>{" "}
                      <i className="fas fa-envelope" />
                    </span>
                    <img
                      className="bd-drawing bd-is-spam-free"
                      src="https://bulma.io/images/drawing/spam-free.png"
                      alt="spam free"
                      width="112"
                      height="88"
                      style={{
                        top: "-69px",

                        position: "absolute",
                        left: "-62px"
                      }}
                    />
                  </div>

                  <div className="control">
                    <div className="is-hidden">
                      <input type="text" name="hp" id="hp" />
                    </div>
                    <input
                      type="hidden"
                      name="list"
                      value="So5UY3O9gHJkq892bn763Tyf4A"
                    />
                    <p className="button is-medium is-link">
                      <strong>Subscribe</strong>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
