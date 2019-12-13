const Router = window.ReactRouterDOM.HashRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Prompt = window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

const Root = () => (
  <Router history={history}>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/scene/:id/" component={ScenePage} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
