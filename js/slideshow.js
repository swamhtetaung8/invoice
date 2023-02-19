const photoUpload = document.querySelector("#photoUpload");

photoUpload.addEventListener("change", (event) => {
  console.log(event.target.files);
  const img = document.createElement("img");
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
    document.body.append(img);
  });
  reader.readAsDataURL(event.target.files[0]);
});
