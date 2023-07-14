const createPost = async (req, res) => {
  return res.send("게시글 생성");
};

const findAllPosts = async (req, res) => {
  return res.send("게시글 전체 조회");
};

const findPost = async (req, res) => {
  return res.send("게시글 상세 조회");
};

const updatePost = async (req, res) => {
  return res.send("게시글 수정");
};

const deletePost = async (req, res) => {
  return res.send("게시글 삭제");
};

module.exports = {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
};
