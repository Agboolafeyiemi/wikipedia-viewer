class Search {
  constructor(search) {
    this.search = search;
  }
  async getResults() {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${this.search}&format=json`
      );
      let json = await res.json();
      this.infor = json.query.search;
      this.infor.map(data => {
        displayResult(data);
      });
    } catch (error) {
      alert(error);
    }
  }
}
let form = document.querySelector(".search");
function renderInput() {
  document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
    form.reset();
  });
}
renderInput();
const getInput = () => {
  return document.querySelector(".input").value;
};
const adjustForm = () => {
  form.classList.add("adjustForm");
}
const controlSearch = () => {

  let query = getInput();
  if (query) {
    adjustForm();
    clearResults();
    const search = new Search(query);
    search.getResults();
  }
};
const displayResult = data => {
  const markup = `
    <li class="list">
        <div class="div-list">
            <h4 class="title">${data.title}</h4>
            <p class="snippet">${data.snippet}</p>
        </div>
     </li> 
    `;
  document
    .querySelector(".result-list")
    .insertAdjacentHTML("beforeend", markup);
};

const clearResults = () => {
  document.querySelector(".result-list").innerHTML = "";
};
