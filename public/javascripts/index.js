(function() {
  "use strict";
  const GITHUB_API_URL = "https://api.github.com/users/";
  const searchBtn = document.getElementById("search_btn");
  const saveBtn = document.getElementById("save_btn");
  const deleteBtn = document.getElementById("delete_btn");
  const textBox = document.getElementById("text_box");
  const searchResultsBlock = document.getElementById("search_results_block");
  const errorBox = document.getElementById("error_message");

  function userInput() {
    return textBox.value.trim().toLowerCase();
  }

  function toggleShowById(id, show) {
    if (show) {
      document.getElementById(id).classList.remove("d-none");
    } else {
      document.getElementById(id).classList.add("d-none");
    }
  }

  async function jsonWebData(url) {
    /**
     *
     * @param {url} a url to fetch
     */
    try {
      console.log(url);
      const res = await fetch(url);
      console.log(res.status);
      // TODO. why only 200?
      if (res.status !== 200) {
        if (res.status === 404) {
          errorDisplay(true, "User not found!!");
        } else if (res.status === 403) {
          errorDisplay(
            true,
            "Search limit exceeded, i know my app is awesome.. but chill!!"
          );
        }
        console.error(
          `Looks like there was a problem. Status Code: ${res.status}`
        );
        return {};
      }

      return await res.json();
    } catch (err) {
      console.error(`cathc: ${res.status}`);
      return {};
    }
  }
  function toggleResultsBox(show) {
    if (show) {
      searchResultsBlock.classList.remove("d-none");
      searchResultsBlock.classList.add("d-flex");
    } else {
      searchResultsBlock.classList.remove("d-flex");
      searchResultsBlock.classList.add("d-none");
    }
  }

  function extractReposList(json) {
    return json.map(({ full_name, html_url }) => {
      return { name: full_name, html_url };
    });
  }

  function extractFollowersList(json) {
    return json.map(({ login, html_url }) => {
      return { name: login, html_url };
    });
  }

  function errorDisplay(show, msg) {
    if (show) {
      errorBox.classList.remove("d-none");
      errorBox.innerText = msg;
    } else {
      errorBox.classList.add("d-none");
    }
  }
  function appendToList(list_id, item) {
    document.getElementById(
      list_id
    ).innerHTML += `<li><a href="${item.html_url}">${item.name}</a></li>`;
  }

  async function getData() {
    document.getElementById("repos_list").innerHTML = "";
    document.getElementById("followers_list").innerHTML = "";
    const input_text = userInput();

    if (!input_text) {
      console.log("empty string");
      errorDisplay(true, "No input!");
      return;
    } else {
      console.log("not empty");
    }

    const {
      login,
      followers_url: followersUrl,
      repos_url: reposUrl
    } = await jsonWebData(GITHUB_API_URL + input_text);

    if (login && followersUrl && reposUrl) {
      const reposJson = await jsonWebData(reposUrl);
      const followersJson = await jsonWebData(followersUrl);

      const reposList = extractReposList(reposJson);
      const followersList = extractFollowersList(followersJson);

      reposList.forEach(element => {
        appendToList("repos_list", element);
      });
      followersList.forEach(element => {
        appendToList("followers_list", element);
      });
      document.getElementById("user-search-view").innerText = userInput();
      if (reposList === undefined || reposList.length == 0)
        toggleShowById("no-repo-msg", true);
      else toggleShowById("no-repo-msg", false);
      if (followersList === undefined || followersList.length == 0)
        toggleShowById("no-follower-msg", true);
      else toggleShowById("no-follower-msg", false);

      toggleResultsBox(true);
    } else {
      console.log("unfound user");
      toggleResultsBox(false);
    }
  }

  async function saveData() {
    const name = userInput();
    if (name === "") {
      errorDisplay(true, "No input!");
      return;
    }
    appendToList("saved_list", name);
  }
  (function() {
    console.log("loaded");
    searchBtn.addEventListener("click", getData);
    saveBtn.addEventListener("click", saveData);
    textBox.addEventListener("click", () => {
      errorBox.classList.add("d-none");
    });
  })();
})();
