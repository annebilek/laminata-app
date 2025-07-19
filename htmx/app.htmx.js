let allPartsData = null;

function populateProducts(event) {
  if (event.detail.xhr.status === 200) {
    const data = JSON.parse(event.detail.xhr.responseText);
    const html = renderProductHtml(data);
    document.getElementById('products').innerHTML = html;
    // Load parts data once when products are loaded
    loadPartsData();
  }
}

async function loadPartsData() {
  try {
    const response = await fetch('../data/parts.json');
    allPartsData = await response.json();
  } catch (error) {
    console.error('Error loading parts data:', error);
  }
}

function renderProductHtml(data) {
  return data.map(item => 
    `<li id="product-${item.id}" class="mb-4 p-2 border border-gray-300 rounded text-lg">
        ${item.name}
        <ul>
          ${item.options.map(option => 
            `<li>
                <button 
                    class="border-blue-900 bg-blue-600 text-white my-1 px-2 py-1 rounded hover:bg-blue-700 hover:cursor-pointer active:bg-blue-800 active:cursor-pointer"
                    onclick="showParts([${option.parts.map(id => `'${id}'`).join(',')}])"
                >
                    <span>${option.height}mm</span>
                </button>
            </li>`).join('')}
        </ul>
     </li>`
  ).join('');
}

function showParts(requiredPartIds) {
  if (!allPartsData) {
    console.error('Parts data not loaded yet');
    return;
  }
  
  const filteredParts = allPartsData.filter(part => requiredPartIds.includes(part.id));
  const html = renderPartsHtml(filteredParts);
  document.getElementById('parts').innerHTML = html;
  document.getElementById('parts-list').classList.remove('hidden');
}

function renderPartsHtml(data) {
  return data.map(item => 
    `<div class="grid grid-cols-[auto_1fr] gap-4 px-4 py-3 border-b last:border-b-0">
        <img src="../data/images/${item.image}" alt="${item.name}" class="h-12 w-16 rounded-md object-cover">
        <span class="flex items-center">${item.name}</span>
    </div>`
  ).join('');
}

function validateInput() {
  const errorMessage = document.getElementById('fence-length-error-message');
  const input = document.getElementById('fence-length');
  const value = input.value.trim();

  if (value.length === 0 || isNaN(value)) {
    errorMessage.textContent = 'Please enter a number';
    return false;
  }

  if (parseFloat(value) < 2) {
    errorMessage.textContent = 'Length must be at least 2 meters';
    return false;
  }

  return true;
}

const fenceLengthInput = document.getElementById('fence-length');
fenceLengthInput.addEventListener('input', function() {
  const errorMessage = document.getElementById('fence-length-error-message');
  if (validateInput()) {
    fenceLengthInput.classList.remove('border-red-500');
    errorMessage.classList.add('hidden');
  } else {
    fenceLengthInput.classList.add('border-red-500');
    errorMessage.classList.remove('hidden');
  }
});
