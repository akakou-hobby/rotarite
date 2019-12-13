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
        location.href = "/";
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
        <h1>ログイン</h1>
        <p>メールアドレス</p>
        <input
          type="email"
          value={this.state.email}
          placeholder="taro@example.com"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <br />
        <p>パスワード</p>
        <input
          type="password"
          value={this.state.password}
          placeholder="********"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <button type="button" value="submit" onClick={this.handleLogin}>
          ログイン
        </button>
      </div>
    );
  }
}
