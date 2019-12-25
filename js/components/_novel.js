class _Novel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.handlePost = this.handlePost.bind(this);
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    const novelRepository = new NovelRepository();

    const novelId = getIdFromURI(this);

    this.novel = await novelRepository.findById(novelId);
    this.root = await sceneRepository.findById(this.novel.rootId);

    this.setState({
      title: this.novel.title,
      summary: this.novel.summary,
      rootContent: this.root.content,
      rootId: this.root.id
    });
  }

  handlePost(e) {}

  render() {
    const new_url = `#/new/scene/${this.state.rootId}`;

    return (
      <div>
        <h1 className="title">{this.state.title}</h1>
        <br></br>
        <h2 className="subtitle">概要</h2>
        <p>{this.state.summary}</p>
        <br></br>
        <h2 className="subtitle">ID: {this.state.rootId}</h2>
        <p>{this.state.rootContent}</p>
        <br />
        <div className="field is-grouped">
          <div className="control">
            <a className="button" href={new_url}>
              シーンの追加
            </a>
          </div>

          <div className="control">
            <button
              className="button"
              onClick={e => {
                this.handleLike(e);
              }}
            >
              {!this.state.isLiked ? "高評価" : "高評価を解除"}
            </button>
          </div>
        </div>
        <br />

        <h3 className="subtitle">次のシーン候補</h3>
        {this.state.rootId && <NextScenes sceneId={this.state.rootId} />}
      </div>
    );
  }
}
