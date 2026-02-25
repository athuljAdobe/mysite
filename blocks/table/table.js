async function createTableHeader(table, columns) {
  const tr = document.createElement("tr");

  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    tr.append(th);
  });

  table.append(tr);
}

async function createTableRow(table, row, columns, index) {
  const tr = document.createElement("tr");

  columns.forEach(col => {
    const td = document.createElement("td");

    if (col === "S.No") {
      td.textContent = index;
    } else {
      td.textContent = row[col] || "-";
    }

    tr.append(td);
  });

  table.append(tr);
}

async function createTable(jsonURL, sheetValue) {
  let url = jsonURL;

  // If sheet selected
  if (sheetValue && sheetValue !== "all") {
    url = `${jsonURL}?sheet=${sheetValue}`;
  }

  const resp = await fetch(url);
  const json = await resp.json();

  let dataArray = [];

  // Case 1: Multi-sheet JSON
  if (json[":type"] === "multi-sheet") {
    dataArray = json.data.data; // default first sheet
  }
  // Case 2: Single sheet response
  else if (json.data) {
    dataArray = json.data;
  }

  const table = document.createElement("table");

  if (!dataArray || dataArray.length === 0) {
    return table;
  }

  // Dynamic columns from first object
  const dynamicColumns = Object.keys(dataArray[0]);

  // Add serial number column
  const columns = ["S.No", ...dynamicColumns];

  await createTableHeader(table, columns);

  dataArray.forEach((row, i) => {
    createTableRow(table, row, columns, i + 1);
  });

  return table;
}

export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  if (!countries) return;

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("countries-block");

  // ✅ Create dropdown
  const dropdown = document.createElement("select");
  dropdown.id = "region";

  dropdown.innerHTML = `
    <option value="all">All</option>
    <option value="helix-India">India Sheet</option>
  `;

  parentDiv.append(dropdown);

  // ✅ Initial table load
  const table = await createTable(countries.href, "all");
  parentDiv.append(table);

  countries.replaceWith(parentDiv);

  // ✅ Dropdown change event
  dropdown.addEventListener("change", async () => {
    const newTable = await createTable(countries.href, dropdown.value);
    const oldTable = parentDiv.querySelector("table");
    oldTable.replaceWith(newTable);
  });
}