class SceneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.handlePost = this.handlePost.bind(this);

    const params = this.props.match;
    this.prevId = parseInt(params.params.id, 0);
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    const novelRepository = new NovelRepository();

    this.prev = await sceneRepository.findById(this.prevId);
    this.novel = await novelRepository.findById(this.prev.novelId);

    this.setState({
      title: this.novel.title,
      prevContent: this.prev.content
    });
  }

  handlePost(e) {
    if (!currentUser()) {
      alert("ログインしてください");
      location.href = "/#/register";
      return;
    }

    const sceneRepo = new SceneRepository();
    const scene = sceneRepo.create({
      title: this.novel.title,
      content: this.state.content,
      prevId: this.prev.id,
      novelId: this.novel.id
    });

    this.props.history.push(`/scene/${scene.id}`);
  }

  render() {
    return (
      <div>
        <h1 className="title">{this.state.title}</h1>
        <br />
        <label>直前の内容</label>

        <p>{this.state.prevContent}</p>
        <br />
        <div className="field">
          <div className="control">
            <label>追加するシーン</label>
            <textarea
              className="textarea"
              placeholder="むかしむかしあるところにおじいさんとおばあさんがいました。"
              onChange={e => this.setState({ content: e.target.value })}
            ></textarea>
          </div>
        </div>
        <br />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handlePost}>
              投稿
            </button>
          </div>
        </div>
      </div>
    );
  }
}
