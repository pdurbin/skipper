const repo = "IQSS/dataverse";
const prAuthors =
  "donsizemore,ErykKul,GPortas,jp-tosca,landreev,pdurbin,poikilotherm,qqmyers,Saixel,sekmiller,stevenwinship";
const issueAuthors =
  "app/sync-by-unito,cmbz,djbrooke,dlmurphy,donsizemore,eaquigley,ErykKul,esotiri,ferrys,GPortas,jggautier,jp-tosca,kcondon,kmika11,landreev,mercecrosas,mheppler,mreekie,oscardssmith,pameyer,pdurbin,poikilotherm,posixeleni,qqmyers,raprasad,rtreacy,Saixel,sbarbosadataverse,scolapasta,sekmiller,stevenwinship,suenjedt,TaniaSchlatter";

replaceLink(repo, "pr", prAuthors);
replaceLink(repo, "issue", issueAuthors);

document.querySelector("#form-pr").onsubmit = () => {
  const repo = document.querySelector("#repo-pr").value;
  const authors = document.querySelector("#skip-pr").value;
  replaceLink(repo, "pr", authors);
  return false;
};

document.querySelector("#form-issue").onsubmit = () => {
  const repo = document.querySelector("#repo-issue").value;
  const authors = document.querySelector("#skip-issue").value;
  replaceLink(repo, "issue", authors);
  return false;
};

function replaceLink(repo, type, authors) {
  console.log(type);
  document.querySelector("#repo-" + type).value = repo;
  document.querySelector("#skip-" + type).value = authors;
  const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
  var url = baseUrl + "repo:" + repo + " is:" + type;
  const authorsToSkip = authors.split(",");

  for (i of authorsToSkip) {
    url += " -author:" + i;
  }

  const div = document.createElement("div");
  const p = document.createElement("p");

  p.innerHTML = "Skipping " + authorsToSkip.join(", ");
  document.querySelector("#results-" + type).append(p);

  var link = document.createElement("a");
  var linkText = document.createTextNode(url);
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.append(linkText);

  div.append(p);
  div.append(link);

  const results = document.querySelector("#results-" + type);

  results.innerHTML = div.innerHTML;
}
