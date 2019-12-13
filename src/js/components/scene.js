class ScenePage extends React.Component {
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

    location.href = "/";
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    this.scene = await sceneRepository.findById(this.sceneId);

    const novelRepository = new NovelRepository();
    this.novel = await novelRepository.findById(this.scene.data.novelId);

    this.setState({
      title: this.novel.data.title,
      content: this.scene.data.content
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
