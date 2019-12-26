class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/novels");
      }
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    return (
      <div>
        <h1 className="title">ログイン</h1>
        <div className="field">
          <label className="label">メールアドレス</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="taro@example.com"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">パスワード</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
        </div>

        <br />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handleLogin}>
              ログイン
            </button>
          </div>

          <div className="control">
            <button
              className="button is-link is-light"
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
              新規登録はこちら
            </button>
          </div>
        </div>
      </div>
    );
  }
}
