const Router = window.ReactRouterDOM.HashRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Prompt = window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>登録</h1>
        <p>メールアドレス</p>
        <input type="email" placeholder="taro@example.com" />
        <br />
        <p>パスワード</p>
        <input type="password" placeholder="********" />
        <br />
        <button type="button" value="submit" onClick={e => {}}>
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

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>ログイン</h1>
        <p>メールアドレス</p>
        <input type="email" placeholder="taro@example.com" />
        <br />
        <p>パスワード</p>
        <input type="password" placeholder="********" />
        <br />
        <button type="button" value="submit" onClick={e => {}}>
          ログイン
        </button>
      </div>
    );
  }
}

const Root = () => (
  <Router history={history}>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
