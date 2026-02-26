document.addEventListener("readystatechange", () => {
  console.log("---Form has been loaded---");

  if (document.readyState === "complete") {

    const form = document.forms[0];
    const submitButton = document.getElementById("submitButton");

    const formSubmitHandler = (event) => {
      event.preventDefault();

      document.getElementById("name");

      const queryString = window.location.search;
      console.log(queryString);

      const urlParams = new URLSearchParams(queryString);
      const referrer = urlParams.get("referrer");
      const project = urlParams.get("project");
      const repo = urlParams.get("repo");

      const formdata = new FormData();

      formdata.append("gdocument", referrer);
      formdata.append("project", project);
      formdata.append("git repo", repo);
      formdata.append("name", document.getElementById("name").value);
      formdata.append("phone", document.getElementById("phone").value);
      formdata.append("email", document.getElementById("email").value);
      formdata.append("message", document.getElementById("message").value);

      console.log("---Submitting form 2---");

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        mode: "no-cors",
      };

      fetch("https://webhook.site/c81b0d84-669e-4b5c-8070-98756b2b3dcb", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    form.addEventListener("submit", formSubmitHandler);
  }
});