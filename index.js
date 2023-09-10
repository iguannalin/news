window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  const lines = [];
  let time = 0;
  let interval = () => getRandomInt(1, 50);

  function typewrite(word, breakline = false) {
    if (breakline) word.split(" ").forEach((ww) => { 
        ww.split("").forEach((ch) => {
        setTimeout(() => { 
          if(ch == "*") container.innerHTML += " ";
          else container.innerHTML += ch;
        }, time += interval());
      });
    });
    else word.split("").forEach((ch) => {
      setTimeout(() => { 
        if (ch == "*") container.innerHTML += " ";
        else container.innerHTML += ch;
      }, time += interval());
    });
  }

  function fronttrack(poem) {
    container.innerHTML += "<br>";
    let line = "";
    poem.split(" ").forEach((word) => {
      if (word.match(/[.,-]/g)) return;
      typewrite((word+"*"));
      line += (word + "*");
      if (Math.random() > 0.85) {
        container.innerHTML += "<br>";
        lines.push(line);
        line = "";
      }
    });
    lines.push(line);
    backtrack();
  }

  function backtrack() {
    lines.reverse().forEach((line) => {
      typewrite((line), true);
    });    
  }

  fetch("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=AnMEmLbge9xojcPa7zOuToDvvpNlr7iK").then((r) => r.json()).then((result) => {
    let poem = "";  
    for (let i = 0; i < getRandomInt(1, 2); i++) {
      let article = result.results[getRandomInt(0, result.results.length)].abstract;
      poem += article.substring(0, getRandomInt(3, article.length));
    }
    fronttrack(poem);
  });
});