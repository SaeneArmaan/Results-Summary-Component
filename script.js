const Summary = document.querySelector(".summary");

const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const renderData = (data) => {
  const frag = document.createDocumentFragment();

  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("summaryCard", item.category.toLowerCase());
    div.innerHTML = `
        <div>
            <img src=${item.icon} />
            <h2>${item.category}</h2>
        </div>

        <span><strong>${item.score}</strong> &nbsp;/ 100</span>
    `;

    frag.appendChild(div);
  });

  Summary.appendChild(frag);
};

const loadData = async () => {
  const data = await fetchData("./data.json");
  if (data) {
    renderData(data);
  }
};

window.addEventListener("DOMContentLoaded", loadData);
