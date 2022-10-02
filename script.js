async function triggerClick(color) {
  // update database
  await fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/simulate_click/${color}`,
    { method: "POST" }
  );

  // update html
  await fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/click_counter`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
