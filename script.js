const input = document.querySelector(".search");
const sug = document.querySelector(".suggestions");
const endpoint = "https://restcountries.com/v3.1/all";
console.log(endpoint);
let countryNames = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    countryNames = data.map((country) => country.name.common); // Vous pouvez directement extraire les noms communs des pays

    countryNames.forEach((common) => {
      console.log(common);
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données : ",
      error
    );
  });

// Ajoutez un écouteur pour le champ de recherche
input.addEventListener("input", () => {
  filterResults(input.value);
});

function filterResults(searchText) {
  const regex = new RegExp(searchText, "gi");
  const matchedCountries = countryNames.filter((country) =>
    regex.test(country)
  );
  displayMatches(matchedCountries);
}

function displayMatches(matches) {
  const html = matches
    .map((match) => {
      return `<li>${match}</li>`;
    })
    .join("");
  sug.innerHTML = html;
}
