const form = document.getElementById("form");
const handle = document.querySelector(".user-id");
const mnRating = document.querySelector(".low");
const mxRating = document.querySelector(".hi");
const allTopics = document.querySelectorAll(".topics");
const ul = document.querySelector(".problem-list");
const ul1=document.querySelector(".problem-list");
const ul2=document.querySelector(".problem-list");
const changes_in_feature_branch=document.querySelector(".problem-list");
ul.innerHTML = "";

// console.log(allTopics);
// axios
//   .get("https://codeforces.com/api/user.status?handle=vd__coder")
//   .then((data) => {
//     console.log(data.data.result);
//   });
form.addEventListener("submit", async (e) => {
  ul.innerHTML = "";
  const validProblems = new Array();
  e.preventDefault();
  const userId = handle.value;
  const minrating = mnRating.value;
  const maxrating = mxRating.value;
  const requiredTopics = new Array();
  for (let topic of allTopics) {
    if (topic.checked) {
      requiredTopics.push(topic.value);
    }
  }

  const userData = await axios.get(
    `https://codeforces.com/api/user.status?handle=${userId}`
  );
  //   console.log(userData);

  const allSubmission = userData.data.result;
  for (let submission of allSubmission) {
    if (submission.verdict != "OK") continue;

    // if (validProblems.indexOf(submission.problem) != -1) continue;
    const rating = submission.problem.rating;
    if (rating < minrating || rating > maxrating) continue;

    for (let topic of requiredTopics) {
      if (submission.problem.tags.indexOf(topic) != -1) {
        validProblems.push(submission.problem);
        break;
      }
    }
  }
  const added = new Array();
  for (let problem of validProblems) {
    if (added.indexOf(problem.name) == -1) {
      added.push(problem.name);
    } else {
      continue;
    }
    const li = document.createElement("li");
    const aTag = document.createElement("a");
    aTag.href = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
    aTag.text = problem.name;
    aTag.target = "_blank";
    li.appendChild(aTag);
    // li.innerHTML = `${problem.name}`;

    ul.appendChild(li);
  }
  console.log(validProblems);
});
