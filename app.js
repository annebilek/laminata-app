
main().catch(error => {
  console.error('Error in main function:', error);
});

async function main() {
  console.log('Application started');

  const productsParent = document.getElementById('products');
  const products = await loadData('products.json');
  const parts = await loadData('parts.json');

  products.forEach(product => {
    console.log(`ID: ${product.id}, Name: ${product.name}`);

    const elem = document.createElement('li');
    elem.id = `product-${product.id}`;
    elem.textContent = product.name;

    const childUl = document.createElement('ul');
    product.options.forEach(option => {
      const childLi = document.createElement('li');
      const childButton = document.createElement('button');
      childButton.textContent = `${option.height}mm`;
      childButton.onclick = () => {
        console.log(`Option clicked: ${option}`);
        showParts(parts.filter(part => option.parts.includes(part.id)));
      };
      childButton.classList.add('border-blue-500', 'bg-blue-500', 'text-white', 'm-2', 'px-2', 'py-1', 'rounded');
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
  console.log('Parts list shown');

  const partsParent = document.getElementById('parts');
  partsParent.replaceChildren(); // Remove the first child if it exists

  filteredParts.forEach(part => {
    console.log(`Part ID: ${part.id}, Name: ${part.name}`);

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