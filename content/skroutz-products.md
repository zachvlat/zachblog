---
title: "Skroutz Products"
date: "2025-06-19"
slug: "skroutz-products"
---

```javascript
(async function() {
    const products = []; // Array to store all product data
    let pageNum = 1; // Start at page 1

    while (true) {
        // Scrape data from the current page
        const listItems = document.querySelectorAll("li.cf");
        const pageProducts = Array.from(listItems, item => {
            // Locate the name using the correct selector
            const nameElement = item.querySelector("h2 > a");
            const name = nameElement ? nameElement.textContent.trim() : "Name not found";

            // Locate the price using the correct selector
            const priceElement = item.querySelector("div.price > div > a");
            const price = priceElement ? priceElement.textContent.trim() : "Price not found";

            return { name, price };
        });

        // Add the products from the current page to the main list
        products.push(...pageProducts);

        // Check if the next button exists
        const nextButton = document.querySelector("li > a[href*='page=" + (pageNum + 1) + "']");
        
        if (nextButton) {
            // If the next button exists, click it and wait for the page to load
            pageNum++;
            nextButton.click();
            
            // Wait for the page to load (a simple delay or using a more robust wait for elements to load)
            await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds for page load
        } else {
            // If the next button doesn't exist, we're on the last page
            break;
        }
    }

    // Convert the result to JSON
    const jsonData = JSON.stringify(products, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a link to download the Blob as a file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "products.json"; // You can customize the filename here
    document.body.appendChild(link); // Append the link to the document (necessary for some browsers)
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link after the download
})();
