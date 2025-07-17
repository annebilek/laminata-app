
main().catch(error => {
  console.error('Error in main function:', error);
});

async function main() {
  console.log('Application started');

  await displayProducts();
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
      childButton.classList.add('border-blue-900', 'bg-blue-600', 'text-white', 'my-1', 'px-2', 'py-1', 'rounded');
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
    const elem = document.createElement('li');
    elem.id = `part-${part.sku}`;
    elem.textContent = part.name;

    partsParent.appendChild(elem);
  });
}

function loadData(file) {
  return fetch(`data/${file}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the data as needed
      console.log('Data loaded:', data);
      return data;
    })
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
