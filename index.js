window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");

  function backtrack(poem, reverse = false) {
    container.innerHTML += "<br>";
    if (reverse) poem.split(" ").forEach((word) => {
      container.innerHTML += (word + " ");
      if (Math.random() > 0.85) container.innerHTML += "<br>";
    });
    else poem.split(" ").reverse().forEach((word) => {
      container.innerHTML += (word + " ");
      if (Math.random() > 0.85) container.innerHTML += "<br>";
    });
  }

  fetch("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=AnMEmLbge9xojcPa7zOuToDvvpNlr7iK").then((r) => r.json()).then((result) => {
    let poem = "";  
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      poem += result.results[getRandomInt(0, result.results.length)].abstract;
    }
    backtrack(poem, true);
    backtrack(poem);
  });
});