class ShowScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.handlePost = this.handlePost.bind(this);

    const params = this.props.match;
    this.sceneId = parseInt(params.params.id, 0);
  }

  handlePost(e) {
    const sceneRepo = new SceneRepository();
    sceneRepo.create(this.state);

    this.props.history.push("/");
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    this.scene = await sceneRepository.findById(this.sceneId);

    const novelRepository = new NovelRepository();
    this.novel = await novelRepository.findById(this.scene.novelId);

    this.setState({
      title: this.novel.title,
      content: this.scene.content
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.content}</p>
      </div>
    );
  }
}
