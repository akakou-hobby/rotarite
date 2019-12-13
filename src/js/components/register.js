class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleRegiser = this.handleRegiser.bind(this);
  }

  handleRegiser(e) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/");
      }
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  render() {
    return (
      <div>
        <h1>登録</h1>
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
          新規登録
        </button>
        <button
          onClick={() => {
            this.props.history.push("/login");
          }}
        >
          ログインはこちら
        </button>
      </div>
    );
  }
}
