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
        this.props.history.push("/");
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
        <div class="field">
          <label class="label">メールアドレス</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="taro@example.com"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
        </div>

        <div class="field">
          <label class="label">パスワード</label>
          <div class="control">
            <input
              class="input"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
        </div>

        <br />

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" onClick={this.handleLogin}>
              ログイン
            </button>
          </div>
        </div>
      </div>
    );
  }
}
