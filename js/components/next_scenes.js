class NextScenes extends React.Component {
  constructor(props) {
    super(props);

    this.handlePost = this.handlePost.bind(this);
    this.state = {
      nexts: []
    };
  }

  async componentDidMount() {
    const novelRepository = new NovelRepository();
    const sceneRepository = new SceneRepository();

    const sceneId = this.props.sceneId;

    // const sceneId = getIdFromURI(this);

    const scene = await sceneRepository.findById(sceneId);
    const novel = await novelRepository.findById(scene.novelId);
    const nexts = await sceneRepository.findNext(scene);

    this.setState({
      scene: scene,
      nexts: nexts,
      novel: novel
    });
  }

  handlePost(e) {}

  render() {
    var nexts = [];

    for (const next of this.state.nexts) {
      const url = `/#/scene/${next.id}`;

      nexts.push(
        <div className="box" key={next.id}>
          <h2 className="title is-6">{next.id}</h2>
          <br></br>
          <a className="button" href={url}>
            このシーンを読む
          </a>
        </div>
      );
    }

    return <div>{nexts}</div>;
  }
}
