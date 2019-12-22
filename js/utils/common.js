const getIdFromURI = self => {
  const params = self.props.match;
  return parseInt(params.params.id, 0);
};
