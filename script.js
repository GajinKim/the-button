function triggerClick() {
  fetch(
    "https://ce5n80ky5e.execute-api.us-east-1.amazonaws.com/Prod/button_counter/click",
    { method: "POST" }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
