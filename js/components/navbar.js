class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggined: false
    };

    this.handlePost = this.handlePost.bind(this);
  }

  async componentDidMount() {
    const self = this;
    setInterval(() => {
      const user = currentUser();
      self.setState({ loggined: Boolean(user) });
    }, 1000);
  }

  async handlePost(e) {}

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://example.com">
            <img src="../logo-hyper-wide2.png" width="94" height="28" />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">Github</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">開発者について</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">読書する</a>

            <a className="navbar-item">投稿する</a>
            <div className="navbar-item">
              {!this.state.loggined && (
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">Log in</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <p></p>
      </nav>
    );
  }
}
