function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const details = JSON.parse(this.responseText);
  const detailsList = `<ul>${details
    .map(
      detail =>
        '<li>' +
        detail.author.name + detail.author.login +
        ' - ' +
        detail.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = detailsList;
}
