document.addEventListener('DOMContentLoaded', () => {
    addLinkToPullRequests();
    addLinkToIssues();
    document.querySelector("#pull-requests-form").onsubmit = () => {
        addLinkToPullRequests();
        return false;
    };
    document.querySelector("#issues-form").onsubmit = () => {
        addLinkToIssues();
        return false;
    };
});

function addLinkToPullRequests() {
    const orgPlusRepo = document.querySelector('#repoForPullRequests').value;
    const authors = document.querySelector('#skipForPullRequests').value;

    const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
    var url = baseUrl + "repo:" + orgPlusRepo + " is:pr";
    const authorsToSkip = authors.split(",");

    for (i of authorsToSkip) {
        url += " -author:" + i;
    }

    const p = document.createElement('p');
    p.innerHTML = "Skipping " + authorsToSkip.join(", ");
    document.querySelector('#resultsForPullRequests').append(p);

    var link = document.createElement('a');
    var linkText = document.createTextNode(url);
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.appendChild(linkText);
    document.querySelector('#resultsForPullRequests').append(link);
}

function addLinkToIssues() {
    const orgPlusRepo = document.querySelector('#repoForIssues').value;
    const authors = document.querySelector('#skipForIssues').value;

    const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
    var url = baseUrl + "repo:" + orgPlusRepo + " is:issue";
    const authorsToSkip = authors.split(",");

    for (i of authorsToSkip) {
        url += " -author:" + i;
    }

    const p = document.createElement('p');
    p.innerHTML = "Skipping " + authorsToSkip.join(", ");
    document.querySelector('#resultsForIssues').append(p);

    var link = document.createElement('a');
    var linkText = document.createTextNode(url);
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.appendChild(linkText);
    document.querySelector('#resultsForIssues').append(link);
}
