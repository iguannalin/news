window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  const lines = [];

  function fronttrack(poem) {
    container.innerHTML += "<br>";
    let line = "";
    poem = poem.split(" ").forEach((word) => {
      if (word.match(/[.,-]/g)) return;
      container.innerHTML += (word + " ");
      line += (word + " ");
      if (Math.random() > 0.85) {
        container.innerHTML += "<br>";
        lines.push(line);
        line = "";
      }
    });
  }

  function backtrack(poem) {
    lines.reverse().forEach((line) => {
      container.innerHTML += (line + "<br>");
    });    
  }

  fetch("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=AnMEmLbge9xojcPa7zOuToDvvpNlr7iK").then((r) => r.json()).then((result) => {
    let poem = "";  
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      poem += result.results[getRandomInt(0, result.results.length)].abstract;
    }
    fronttrack(poem);
    backtrack(poem);
  });
});