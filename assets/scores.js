var scoreList = document.querySelector("#high-score-list")
    
scoreList.textContent = localStorage.getItem("text") + ': ' + localStorage.getItem("score");

var clear = document.querySelector("#clear");

clear.addEventListener("click", function() {
    localStorage.clear()
    scoreList.style.display = "none";
})

