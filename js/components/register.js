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
        alert(errorMessage);
      });
  }

  render() {
    return (
      <div>
        <h1 className="title">登録</h1>
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
            <button className="button is-link" onClick={this.handleRegiser}>
              新規登録
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              ログインはこちら
            </button>
          </div>
        </div>
      </div>
    );
  }
}
