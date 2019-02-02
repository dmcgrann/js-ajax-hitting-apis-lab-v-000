function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories() {
  var users = JSON.parse(this.responseText);
  const repoList = `<ul>${users
    .map(
      u =>
        '<li>' +
        u.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${name}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' | ' + c.author.login + ' | ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
