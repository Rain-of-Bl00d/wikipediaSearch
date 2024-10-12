//https://apis.ccbp.in/wiki-search?search=
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function creatingDynamincPart(result) {
    let {
        description,
        link,
        title
    } = result;
    //creating Div
    let dynamicContainer = document.createElement("div");
    dynamicContainer.classList.add("search-results");
    searchResultsEl.appendChild(dynamicContainer);

    //creating anchor
    let anchorEl = document.createElement("a");
    anchorEl.href = link;
    anchorEl.textContent = title;
    anchorEl.target = "_blank";
    anchorEl.classList.add("result-title");
    dynamicContainer.appendChild(anchorEl);

    //creating 
    let Url = document.createElement("p");
    Url.textContent = link;
    Url.target = "_blank";
    Url.classList.add("result-url");
    dynamicContainer.appendChild(Url);

    //description
    let descriptions = document.createElement("p");
    descriptions.textContent = description;
    descriptions.classList.add("link-description");
    dynamicContainer.appendChild(descriptions);

    //hr 
    let horizontal = document.createElement("hr");
    horizontal.style.backgroundColor = "black";
    horizontal.style.height = "1px";
    dynamicContainer.appendChild(horizontal);

}

function createAndAppendData(search_results) {
    spinner.classList.toggle("d-block");
    for (let result of search_results) {
        creatingDynamincPart(result);
    }
}

function searchResults(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-block");
        let searchResult = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchResult;

        let option = {
            method: "GET"
        };
        fetch(url, option).then(
            function(response) {
                return (response.json());
            }
        ).then(
            function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createAndAppendData(search_results);
            }
        );
    }
}


searchInputEl.addEventListener("keydown", searchResults);
