import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';


/* ============================= */
/*  Placeholder Table            */
/* ============================= */
async function createTableWithPlaceholder(table) {

  const locale = getMetadata('locale') || 'en';
  const placeholders = await fetchPlaceholders(locale);

  const {
    fnameKey = 'First Name',
    lnameKey = 'Last Name',
    roleKey = 'Role',
    orgKey = 'Organization',
    cntryKey = 'Country',
    header = 'Author Details',
    firstName = '',
    lastName = '',
    role = '',
    organization = '',
    country = ''
  } = placeholders;

  /* Header Row */
  const headerRow = document.createElement('tr');
  const headerCol = document.createElement('th');
  headerCol.colSpan = 2;
  headerCol.textContent = header;
  headerRow.append(headerCol);

  /* First Name */
  const firstRow = document.createElement('tr');
  firstRow.innerHTML = `
    <td>${fnameKey}</td>
    <td>${firstName}</td>
  `;

  /* Last Name */
  const lastRow = document.createElement('tr');
  lastRow.innerHTML = `
    <td>${lnameKey}</td>
    <td>${lastName}</td>
  `;

  /* Role */
  const roleRow = document.createElement('tr');
  roleRow.innerHTML = `
    <td>${roleKey}</td>
    <td>${role}</td>
  `;

  /* Organization */
  const orgRow = document.createElement('tr');
  orgRow.innerHTML = `
    <td>${orgKey}</td>
    <td>${organization}</td>
  `;

  /* Country */
  const countryRow = document.createElement('tr');
  countryRow.innerHTML = `
    <td>${cntryKey}</td>
    <td>${country}</td>
  `;

  table.append(
    headerRow,
    firstRow,
    lastRow,
    roleRow,
    orgRow,
    countryRow
  );
}


/* ============================= */
/*  Create Table From Document   */
/* ============================= */
function createTableWithDocument(table, block) {

  const rows = [...block.children];

  rows.forEach((row, index) => {

    const tr = document.createElement('tr');

    if (index === 0) {
      // Header row
      const th = document.createElement('th');
      th.colSpan = 2;
      th.textContent = row.textContent.trim();
      tr.append(th);
    } else {
      [...row.children].forEach((col) => {
        const td = document.createElement('td');
        td.textContent = col.textContent.trim();
        tr.append(td);
      });
    }

    table.append(tr);
  });
}


/* ============================= */
/*  Main Decorate                */
/* ============================= */
export default async function decorate(block) {

  const table = document.createElement('table');
  table.classList.add('author-table');

  const hasRows = [...block.children].length > 1;

  if (hasRows) {
    createTableWithDocument(table, block);
  } else {
    await createTableWithPlaceholder(table);
  }

  block.replaceWith(table);
}