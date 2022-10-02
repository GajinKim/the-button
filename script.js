window.onload = updateValues();

function triggerClick(color) {
  // update database
  fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/simulate_click/${color}`,
    { method: "POST" }
  );

  updateValues();
}

async function updateValues() {
  console.log("loading");
  document.getElementById("loading-data").innerHTML = "Loading Data";
  document.getElementById("red-counter").innerHTML = "...";
  document.getElementById("green-counter").innerHTML = "...";
  document.getElementById("blue-counter").innerHTML = "...";
  
  // update html
  await fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/click_counter`
  ).then((response) => {
    response.json().then((data) => {
      updateColorCounterValues(
        data["red_counter"],
        data["green_counter"],
        data["blue_counter"]
      );
    });
  });

  document.getElementById("loading-data").innerHTML = "Finished Updating Data";
  console.log("done loading data");
}

function updateColorCounterValues(red_counter, green_counter, blue_counter) {
  document.getElementById("red-counter").innerHTML = red_counter;
  document.getElementById("green-counter").innerHTML = green_counter;
  document.getElementById("blue-counter").innerHTML = blue_counter;
}
