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
    return (
      <div>
        <h1 className="title">{this.state.title}</h1>
        <br></br>

        <h2 className="subtitle">概要</h2>
        <p>{this.state.summary}</p>

        <br></br>

        <h2 className="subtitle">ID: {this.state.rootId}</h2>
        <p>{this.state.rootContent}</p>

        <br></br>

        <button class="button">シーンを追加</button>
      </div>
    );
  }
}
