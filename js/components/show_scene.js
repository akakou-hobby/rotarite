class ShowScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isLiked: false
    };

    this.handlePost = this.handlePost.bind(this);
    this.handleLike = this.handleLike.bind(this);

    const params = this.props.match;
    this.sceneId = parseInt(params.params.id, 0);
  }

  handlePost(e) {
    const sceneRepo = new SceneRepository();
    sceneRepo.create(this.state);

    this.props.history.push("/");
  }

  async handleLike(e) {
    const sceneId = this.sceneId;
    const likeRepository = new LikeRepository();

    var isEnable = false;

    if (this.state.isLiked) {
      const likeRepository = new LikeRepository();
      this.like = await likeRepository.findActiveMineById(this.sceneId);
      this.like.isEnable = false;
      likeRepository.store(this.like);
    } else {
      likeRepository.create({ sceneId: sceneId });
    }

    this.setState({ isLiked: !this.state.isLiked });
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    this.scene = await sceneRepository.findById(this.sceneId);

    const novelRepository = new NovelRepository();
    this.novel = await novelRepository.findById(this.scene.novelId);

    const likeRepository = new LikeRepository();
    this.like = await likeRepository.findActiveMineById(this.sceneId);

    this.setState({
      title: this.novel.title,
      content: this.scene.content,
      isLiked: Boolean(this.like)
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.content}</p>

        <button
          onClick={e => {
            this.handleLike(e);
          }}
        >
          {!this.state.isLiked ? "高評価" : "高評価を解除"}
        </button>
      </div>
    );
  }
}
