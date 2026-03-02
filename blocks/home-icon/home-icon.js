export default function decorate(block) {
  const iconName = block.textContent.trim();

  block.innerHTML = `
    <span " class="icon icon-${iconName}">
      <img src="/icons/${iconName}.svg" alt="${iconName}" /> <p>This is home icon</p>
    </span>
  `;
}