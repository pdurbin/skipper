document.addEventListener("DOMContentLoaded", () => {
  const repo = "IQSS/dataverse";
  const prAuthors =
    "donsizemore,GPortas,landreev,pdurbin,poikilotherm,qqmyers,sekmiller";
  const issueAuthors =
    "app/sync-by-unito,djbrooke,dlmurphy,donsizemore,eaquigley,esotiri,ferrys,GPortas,jggautier,kcondon,landreev,mercecrosas,mheppler,mreekie,oscardssmith,pameyer,pdurbin,poikilotherm,posixeleni,qqmyers,raprasad,rtreacy,sbarbosadataverse,scolapasta,sekmiller,suenjedt,TaniaSchlatter";
  addLink(repo, "pr", prAuthors);
  addLink(repo, "issue", issueAuthors);
  document.querySelector("#form-pr").onsubmit = () => {
    const authors = document.querySelector("#skip-pr").value;
    addLink(repo, "pr", authors);
    return false;
  };
  document.querySelector("#form-issue").onsubmit = () => {
    const authors = document.querySelector("#skip-issue").value;
    addLink(repo, "issue", authors);
    return false;
  };
});

function addLink(repo, type, authors) {
  console.log(type);
  document.querySelector("#repo-" + type).value = repo;
  document.querySelector("#skip-" + type).value = authors;
  const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
  var url = baseUrl + "repo:" + repo + " is:" + type;
  const authorsToSkip = authors.split(",");

  for (i of authorsToSkip) {
    url += " -author:" + i;
  }

  const p = document.createElement("p");
  p.innerHTML = "Skipping " + authorsToSkip.join(", ");
  document.querySelector("#results-" + type).append(p);

  var link = document.createElement("a");
  var linkText = document.createTextNode(url);
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.appendChild(linkText);
  document.querySelector("#results-" + type).append(link);
}
