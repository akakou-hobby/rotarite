class NextScenes extends React.Component {
  constructor(props) {
    super(props);

    this.handlePost = this.handlePost.bind(this);
    this.state = {
      nexts: [],
      likes: [],
      scene: {},
      novel: {}
    };
  }

  async componentDidMount() {
    const novelRepository = new NovelRepository();
    const sceneRepository = new SceneRepository();
    const likeRepository = new LikeRepository();

    const sceneId = this.props.sceneId;

    // const sceneId = getIdFromURI(this);

    const scene = await sceneRepository.findById(sceneId);
    const novel = await novelRepository.findById(scene.novelId);
    const nexts = await sceneRepository.findNext(scene);

    var likes = [];

    for (var next of nexts) {
      const likesCount = await likeRepository.countLikesForScene(next);
      likes.push(likesCount);
    }

    this.setState({
      scene: scene,
      nexts: nexts,
      novel: novel,
      likes: likes
    });
  }

  handlePost(e) {}

  render() {
    var nexts = [];
    const likeRepository = new LikeRepository();

    for (const index in this.state.nexts) {
      const next = this.state.nexts[index];
      const like = this.state.likes[index];
      const url = `/#/scene/${next.id}`;

      nexts.push(
        <div className="box" key={next.id}>
          <h2 className="title is-6">{next.id}</h2>
          <p>評価は{like}です</p>
          <br />
          <a className="button" href={url}>
            このシーンを読む
          </a>
        </div>
      );
    }

    return <div>{nexts}</div>;
  }
}
