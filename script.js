function triggerClick(color) {
  // update database
  fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/simulate_click/${color}`,
    { method: "POST" }
  );

  // update html
  fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/click_counter`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
