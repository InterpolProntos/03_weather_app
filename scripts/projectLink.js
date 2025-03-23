document.addEventListener("DOMContentLoaded", () => {
  const base_url = "https://interpolprontos.github.io/";

  const projects = ["01_personal_page", "02_todo_list", "03_weather_app"];

  const currentProject = "03_weather_app";
  const currentIndex = projects.findIndex((elem) => elem === currentProject);

  const prevProject = document.getElementById("prevProject");
  const nextProject = document.getElementById("nextProject");

  if (currentIndex > 0) {
    prevProject.href = base_url + projects[currentIndex - 1] + "/";
  } else {
    prevProject.style.visibility = "hidden"; // Hide if no previous project
  }

  if (currentIndex < projects.length - 1) {
    nextProject.href = base_url + projects[currentIndex + 1] + "/";
  } else {
    nextProject.style.visibility = "hidden"; // Hide if no next project
  }
});
