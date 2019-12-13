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
        <button
          onClick={e => {
            console.log(e, this);
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
    return <h1>ログイン</h1>;
  }
}

const Root = () => (
  <Router history={history}>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
