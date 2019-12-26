class NavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      loggined: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(e) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("ログアウトしました");
        location.href = "#/novels";
      });
  }

  async componentDidMount() {
    setInterval(() => {
      const user = currentUser();
      this.setState({ loggined: Boolean(user) });
    }, 500);
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#/novels">
            <img src="img/logo-hyper-wide2.png" width="94" height="28" />
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
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link"></a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  href="https://github.com/akakou/rotarite"
                >
                  Github
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="https://twitter.com/_akakou">
                  開発者（akakou）
                </a>
                {this.state.loggined && (
                  <div>
                    <hr className="navbar-divider" />
                    <a
                      className="navbar-item"
                      onClick={e => {
                        this.handleLogout(e);
                      }}
                    >
                      ログアウト
                    </a>
                  </div>
                )}
              </div>
            </div>

            <a className="navbar-item" href="#/novels">
              読書する
            </a>

            <a className="navbar-item" href="#/new/novel">
              投稿する
            </a>
            <div className="navbar-item">
              {!this.state.loggined && (
                <div className="buttons">
                  <a className="button is-primary" href="#/register">
                    <strong>　登録　</strong>
                  </a>
                  <a className="button is-light" href="#/login">
                    ログイン
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
