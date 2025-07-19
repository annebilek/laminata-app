
main().catch(error => {
  console.error('Error in main function:', error);
});

async function main() {
  await displayProducts();
  addInputValidation();
}

async function displayProducts() {
  const products = await loadData('products.json');
  const parts = await loadData('parts.json');
  const productsParent = document.getElementById('products');

  products.forEach(product => {
    const elem = document.createElement('li');
    elem.id = `product-${product.id}`;
    elem.classList.add('mb-4', 'p-2', 'border', 'border-gray-300', 'rounded', 'text-lg');
    elem.textContent = product.name;

    const childUl = document.createElement('ul');
    product.options.forEach(option => {
      const childLi = document.createElement('li');
      const childButton = document.createElement('button');
      childButton.textContent = `${option.height}mm`;
      childButton.onclick = () => {
        showParts(parts.filter(part => option.parts.includes(part.id)));
      };
      childButton.classList.add('border-blue-900', 'bg-blue-600', 'text-white', 'hover:bg-blue-700', 'hover:cursor-pointer', 'my-1', 'px-2', 'py-1', 'rounded');
      childLi.appendChild(childButton);
      childUl.appendChild(childLi);
    });
    elem.appendChild(childUl);

    productsParent.appendChild(elem);
  });
}

function showParts(filteredParts) {
  const partsList = document.getElementById('parts-list');
  partsList.classList.remove('hidden');

  const partsParent = document.getElementById('parts');
  partsParent.replaceChildren(); // Remove the first child if it exists

  filteredParts.forEach(part => {
    const elem = document.createElement('div');
    elem.id = `part-${part.sku}`;
    elem.classList.add('grid', 'grid-cols-[auto_1fr]', 'gap-4', 'px-4', 'py-3', 'border-b', 'last:border-b-0');
    const img = document.createElement('img');
    img.src = `../data/images/${part.image}`;
    img.alt = part.name;
    img.classList.add('h-12', 'w-16', 'rounded-md', 'object-cover');
    elem.appendChild(img);
    const span = document.createElement('span');
    span.classList.add('flex', 'items-center');
    span.textContent = part.name;
    elem.appendChild(span);

    partsParent.appendChild(elem);
  });
}

function loadData(file) {
  return fetch(`../data/${file}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
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

function addInputValidation() {
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
}
