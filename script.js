function toggleNav() {
    var nav = document.querySelector("nav");
    if (nav.style.left === "0px") {
        nav.style.left = "-250px"; // Hide the menu
    } else {
        nav.style.left = "0px"; // Show the menu
    }
}

// Toggle dropdown visibility
function toggleDropdown(event) {
    var dropdown = event.currentTarget.querySelector(".dropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
}

// Add event listeners for dropdown toggling
document.querySelectorAll("nav > ul > li").forEach(function (item) {
    item.addEventListener("click", toggleDropdown);
});

// Data structure to hold price data for different crops and seasons 
const cropData = {
    maize: {
        dry: { price: '₦550000 - ₦600000 per ton', image: 'image/maize.jpg' },
        rainy: { price: '₦530000 - ₦580000 per ton', image: 'image/maize.jpg' }
    },
    yam: {
        dry: { price: '₦400000 - ₦700000 per ton', image: 'image/yam.jpg' },
        rainy: { price: '₦380000 - ₦450000 per ton', image: 'image/yam.jpg' }
    },
    cassava: {
        dry: { price: '₦150000 - ₦170000 per ton', image: 'image/casava-image.jpg' },
        rainy: { price: '₦130000 - ₦150000 per ton', image: 'image/casava-image.jpg' }
    },
    rice: {
        dry: { price: '₦170000 - ₦200000 per bag', image: 'image/rice.jpeg' },
        rainy: { price: '₦150000 - ₦170000 per bag', image: 'image/rice.jpeg' }
    },
    millet: {
        dry: { price: '₦450000 - ₦600000 per ton', image: 'image/bag of millet.jpeg' },
        rainy: { price: '₦420000 - ₦550000 per ton', image: 'image/bag of millet.jpeg' }
    },
    sorghum: {
        dry: { price: '₦420000 - ₦480000 per ton', image: 'image/sorghum.jpeg' },
        rainy: { price: '₦410000 - ₦450000 per ton', image: 'image/sorghum.jpeg' }
    },
    cocoa: {
        dry: { price: '₦5000 - ₦8000 per kg', image: 'image/cocoa.jpeg' },
        rainy: { price: '₦4500 - ₦7000 per kg', image: 'image/cocoa.jpeg' }
    },
    beans: {
        dry: { price: '₦380000 - ₦400000 per bag', image: 'image/beans.jpeg' },
        rainy: { price: '₦370000 - ₦390000 per bag', image: 'image/beans.jpeg'}
    }
};

// Elements
const seasonSelect = document.getElementById('season-select');
const cropSelect = document.getElementById('crop-select');
const cropTitle = document.getElementById('crop-title');
const cropImage = document.getElementById('crop-image');
const priceDry = document.getElementById('price-dry');
const priceRainy = document.getElementById('price-rainy');

// Function to update the dashboard based on selected crop and season
function updateDashboard() {
    const selectedCrop = cropSelect.value;
    const selectedSeason = seasonSelect.value;

    console.log('Selected Crop:', selectedCrop);
    console.log('Selected Season:', selectedSeason);

    // Check if crop data exists for the selected crop
    if (!cropData[selectedCrop]) {
        console.error('Crop data not found for:', selectedCrop);
        return;
    }

    const cropInfo = cropData[selectedCrop];

    // Update crop title
    cropTitle.textContent = `${capitalizeFirstLetter(selectedCrop)} - Predicted Price`;

    // Update crop image
    cropImage.src = cropInfo[selectedSeason].image;
    cropImage.alt = selectedCrop;

    // Update price based on the selected season
    const selectedPrice = cropInfo[selectedSeason].price;
    if (selectedSeason === 'dry') {
        priceDry.textContent = selectedPrice + ' (Dry Season)';
        priceDry.style.display = 'block';
        priceRainy.style.display = 'none';
    } else {
        priceRainy.textContent = selectedPrice + ' (Rainy Season)';
        priceRainy.style.display = 'block';
        priceDry.style.display = 'none';
    }
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    seasonSelect.addEventListener('change', updateDashboard);
    cropSelect.addEventListener('change', updateDashboard);
    updateDashboard(); // Initialize the dashboard
});


// Render the chart
// Sample data for crops and prices across different regions in Nigeria
const regionData = {
    north: [
        { crop: 'Millet', price: '₦420000 - ₦550000 per ton' },
        { crop: 'Sorghum', price: '₦410000 - ₦450000 per ton' },
        { crop: 'Maize', price: '₦480000 - ₦560000 per ton' }
    ],
    south: [
        { crop: 'Yam', price: '₦380000 - ₦450000 per ton' },
        { crop: 'Cassava', price: '₦130000 - ₦150000 per ton' },
        { crop: 'Oil Palm', price: '₦1,200 - ₦1,700 per litre' }
    ],
    east: [
        { crop: 'Cocoyam', price: '₦280000 - ₦300000 per ton' },
        { crop: 'Rice', price: '₦150000 - ₦170000 per bag' },
        { crop: 'Plantain', price: '₦2000 - ₦5000 per bunch' }
    ],
    west: [
        { crop: 'Cocoa', price: '₦4500 - ₦7000 per kg' },
        { crop: 'Maize', price: '₦550000 - ₦600000 per ton' },
        { crop: 'Cassava', price: '₦530000 - ₦580000 per ton' }
    ]
};

// Elements
const regionDropdown = document.getElementById('regionDropdown');
const trendingPricesList = document.getElementById('trendingPricesList');

// Function to update the list based on the selected region
function updateTrendingPrices() {
    const selectedRegion = regionDropdown.value;
    const cropsInRegion = regionData[selectedRegion];

    // Clear the existing list
    trendingPricesList.innerHTML = '';

    // Populate the list with data for the selected region
    cropsInRegion.forEach(cropData => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cropData.crop}: ${cropData.price}`;
        trendingPricesList.appendChild(listItem);
    });
}

// Event listener to update the list when the region changes
regionDropdown.addEventListener('change', updateTrendingPrices);

// Initialize with the first region's data
updateTrendingPrices();


// Initialize the map
const map = L.map('mapContainer').setView([9.082, 8.6753], 5); // Center on Nigeria

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to update the map based on selected region
function updateMap() {
    const selectedRegion = document.getElementById('regionDropdown').value;
    let coordinates;

    // Set coordinates based on selected region
    switch (selectedRegion) {
        case 'north':
            coordinates = [10.0, 8.0]; // Example coordinates for North
            break;
        case 'south':
            coordinates = [7.0, 4.0]; // Example coordinates for South
            break;
        case 'east':
            coordinates = [5.5, 8.5]; // Example coordinates for East
            break;
        case 'west':
            coordinates = [8.0, 6.0]; // Example coordinates for West
            break;
        default:
            coordinates = [9.082, 8.6753]; // Default to center of Nigeria
    }

    // Move the map to the selected region
    map.setView(coordinates, 6);

    // Clear previous markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add marker for the selected region (optional)
    L.marker(coordinates).addTo(map).bindPopup(`Prices in ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}`);
}

// Initial map setup
updateMap(); // Call once to set initial view

