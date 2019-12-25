const Router = window.ReactRouterDOM.HashRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Prompt = window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

const Root = () => (
  <div>
    <NavBar></NavBar>

    <div className="main">
      <Router history={history}>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/scene/:id" component={ShowScene} />
        <Route path="/scene/:id/new" component={PostScene} />
        <Route path="/novel/:id" component={ShowNovel} />
        <Route path="/novel/new" component={PostNovel} />
      </Router>
    </div>
  </div>
);

ReactDOM.render(<Root />, document.getElementById("root"));
