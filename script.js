function triggerClick(color) {
  fetch(
    `https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/button_counter/click/${color}`,
    { method: "POST" }
  );
}
