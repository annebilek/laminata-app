async function getProducts() {
    try {
        const response = await fetch('../data/products.json');
        if (!response.ok) {
            console.error('Failed to fetch products:', response.statusText);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

async function getParts() {
    try {
        const response = await fetch('../data/parts.json');
        if (!response.ok) {
            console.error('Failed to fetch parts:', response.statusText);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading parts:', error);
        return [];
    }
}

function validateFenceLength(fenceLength) {
    if (isNaN(parseFloat(fenceLength))) {
        return 'Please enter a valid number';
    }

    if (parseFloat(fenceLength) < 2) {
        return 'Length must be at least 2 meters';
    }

    return '';
}
