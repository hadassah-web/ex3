import data from "../repos.json";

const f = data.map(({ full_name, html_url }) => {
  return { name: full_name, html_url };
});

console.log(f);
