window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  // const poem = "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.\n\nDoes my sassiness upset you?\nWhy are you beset with gloom?\n’Cause I walk like I've got oil wells\nPumping in my living room.\n\nJust like moons and like suns,\nWith the certainty of tides,\nJust like hopes springing high,\nStill I'll rise.\n";
  // const input = document.getElementById("input")
  // input.onchange =backtrack;

  const container = document.getElementById("container");

  function backtrack(poem, reverse = false) {
    // poem = input.value;
    // poem.split("\n").forEach((line) => {
    //   container.innerHTML += (line + "<br>");
    // });
    // poem.split("\n").reverse().forEach((line) => {
    //   container.innerHTML += (line + "<br>");
    // });
    console.log(poem);
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