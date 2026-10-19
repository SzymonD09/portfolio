const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", function () {
  menu.classList.toggle("open");
});

const links = menu.querySelectorAll("a");
links.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
  });
});

let score = 0;
const scoreText = document.getElementById("score");

function addPoints(points) {
  score = score + points;
  scoreText.textContent = String(score).padStart(5, "0");
}

const skills = document.querySelectorAll(".skill");

skills.forEach(function (skill) {
  const level = Number(skill.dataset.level);
  const dotsBox = skill.querySelector(".skill-dots");

  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("skill-dot");

    if (i <= level) {
      dot.classList.add("on");
    }

    dot.style.transitionDelay = i * 0.15 + "s";
    dotsBox.appendChild(dot);
  }
});

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      addPoints(100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(function (section) {
  section.classList.add("fade");
  observer.observe(section);
});