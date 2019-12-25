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
      rootContent: this.root.content
    });
  }

  handlePost(e) {}

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.summary}</p>

        <p>{this.state.rootContent}</p>
      </div>
    );
  }
}
