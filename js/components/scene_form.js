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
      title: this.novel.title
    });
  }

  handlePost(e) {
    const sceneRepo = new SceneRepository();
    sceneRepo.create({
      title: this.novel.title,
      content: this.state.content,
      prevId: this.prev.id,
      novelId: this.novel.id
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <textarea
          onChange={e => this.setState({ content: e.target.value })}
        ></textarea>
        <br />
        <button type="button" value="submit" onClick={this.handlePost}>
          投稿
        </button>
      </div>
    );
  }
}
