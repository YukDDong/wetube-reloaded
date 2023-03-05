let videos = [
  {
    title: "First Video",
    rating: 5,
    coments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    coments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    coments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos })
}
export const search = (req, res) => res.send("Search");
export const watch = (req, res) => {
  const id = req.params.id;
  const video = videos[id-1];
  return res.render("watch", { pageTitle: `Watching : ${video.title}`, video });
}
export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id-1];
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video});
}
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  videos[id-1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    coments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};