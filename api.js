const spinnerToggler = (add, remove) => {
  const spinnerDiv = document.getElementById("spinner-div");
  spinnerDiv.classList.remove(remove);
  spinnerDiv.classList.add(add);
};
const resultDivToggler = (add, remove) => {
  const resultDiv = document.getElementById("result-div");
  resultDiv.classList.remove(remove);
  resultDiv.classList.add(add);
};

const searchButtonHandler = () => {
  const searchText = document.getElementById("search-text").value;
  searchResult(searchText);
  spinnerToggler("d-block", "d-none");
  resultDivToggler("d-none", "d-block");
  document.getElementById("search-text").value = "";
  document.getElementById("search-results").innerHTML = "";
};

const searchResult = (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showResult(data));
};
const resultFilter = (param) => {
  if (param == undefined) {
    return "N/A";
  } else {
    return param;
  }
};
const showResult = (data) => {
  const resultDiv = document.getElementById("search-results");
  document.getElementById(
    "result-counter"
  ).innerText = `Showing ${data.docs.length} of ${data.numFound} results`;
  console.log(data);
  if (data.docs.length === 0) {
    console.log("hejrjwehrejrhj");
    const div = document.createElement("div");

    div.innerHTML = `
    <h3 class="text-center">Sorry! No result Found. Please Try again</h3>
    `;
    resultDiv.appendChild(div);
    console.log("no data");
    resultDivToggler("d-block", "d-none");
    spinnerToggler("d-none", "d-block");
  } else {
    data.docs.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add(
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "col-xs-12",
        "mt-4"
      );
      let imageUrl = "";
      if (element.cover_i == undefined) {
        imageUrl = "image/No-image.jpg";
      } else {
        imageUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
      }

      div.innerHTML = `
          
          <div class="card h-100" >
      
        <img src="${imageUrl}" class="card-img-top img-fluid w-100" alt="...">
        
        <div class="card-body">
          <h5 class="card-title">${resultFilter(element.title)}</h5> 
          <h6 class="card-text">By: ${resultFilter(element.author_name)}</h6>
          <h6 class="card-text">First Published: ${resultFilter(
            element.first_publish_year
          )} </h6>
          <p class="card-text">E-book: ${resultFilter(element.ebook_access)}</p>
          
          
        </div>
        <button class=" border-0 rounded bg-primary text-white p-1 m-1">Add to cart</button>
        <button class=" border-0 rounded bg-danger text-white p-1 m-1">Buy Now</button>
        
      </div>
      
          `;
      resultDiv.appendChild(div);
    });

    resultDivToggler("d-block", "d-none");
    spinnerToggler("d-none", "d-block");
  }
};
