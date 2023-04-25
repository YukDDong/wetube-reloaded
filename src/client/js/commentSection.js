const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;
  const iconComment = document.createElement("i");
  iconComment.className = "fas fa-comment";
  const iconDelete = document.createElement("i");
  iconDelete.className = "fas fa-trash";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newComment.appendChild(iconComment);
  newComment.appendChild(span);
  newComment.appendChild(iconDelete);
  videoComments.prepend(newComment);
};

const deleteComment = () => {};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // headers 에서 json방식으로 보내고 있다고 알려줘야 JS Obj 형식으로 받을 수 있음
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
