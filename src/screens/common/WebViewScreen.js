import { useNavigation } from "@react-navigation/native";
import React, { useDebugValue, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import {
    EXPLORE_SCREEN,
    HOME_SCREEN,
    LOADING_SCREEN,
    PRODUCT_DISPLAY_SCREEN,
    PRODUCT_SCREEN,
} from "../../../constants/screens";
import newArrivals from "../../../assets/data/new-arrivals.json";
import { extractKeyFromUrl, thumbnailImage, viewImage } from "../../../utilities/imageConstructors";

const productDetailsHTML = (products) => {
    return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background: #fff; }
        .header {
        background-color: #f8f8f8; 
        padding: 10px; 
        text-align: center; 
        position: relative; 
        font-size: 20px; 
        font-weight: bold;
        }
        .backButton { 
        position: absolute; 
        left: 10px; 
        top: 50%; 
        transform: translateY(-50%);
        font-size: 20px;
        }
        .search-bar { 
        width: calc(100% - 20px);
        padding: 10px; 
        margin: 10px; 
        border: 1px solid #ccc; 
        border-radius: 5px;
        }
        .product-grid { 
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-around; 
        padding: 5px;
        }
        .product-card { 
          display: flex; 
          align-items: center; 
        width: calc(100% - 10px); 
        margin: 5px; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 20px
        }
.product-image { 
          width: 100px;  /* Adjust to your preferred thumbnail width */
          height: 100px; /* Adjust to your preferred thumbnail height */
          object-fit: cover;
          border-radius: 20%; /* Makes the image rounded */
          margin-right: 10px; /* Adds spacing between image and text */
        }
        .product-info { 
        padding: 10px;
        font-size: 14px;
        }
        .product-name { 
        font-weight: bold;
        margin-bottom: 5px;
        }
        .product-price { 
        color: #62c1e5; 
        margin-top: 5px;
        }
        .product-rating { 
        color: #666; 
        margin-top: 5px;
        }
          .details-button { 
            font-weight: bold;
        background-color: #a0d9ef;
        color: white; 
        padding: 10px; 
        text-align: center; 
        display: block; 
        margin-top: 10px; 
        text-decoration: none; 
        border-radius: 5px; 
        border: 1px solid  #a0d9ef;
        cursor: pointer;
        }
        .suggestions .suggestion-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.suggestions .suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-image {
  width: 30px; /* or any size you want */
  height: 30px; /* or any size you want */
  border-radius: 15px; /* this will make it round */
  object-fit: cover;
  margin-right: 10px;
}

.suggestion-text {
  margin-left: 10px;
}

.search-button { 
     display: block;
     
    font-weight: bold;
  background-color: #62c1e5; /* Background color */
  color: white; /* Text color */
  padding: 10px 15px; /* Padding around text */
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline from text */
  cursor: pointer; /* Change mouse cursor to indicate clickability */
  font-size: 16px; /* Text size */
  margin-left: 10px; /* Margin on the left for spacing */
}
    </style>
      <script>

      var products = ${JSON.stringify(products)};

      function initiateSearch() {
          var input = document.getElementById('search-input').value.toLowerCase();
          var filtered = products.filter(function(product) {
            return product.name.toLowerCase().includes(input);
          });
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'initiateSearch', filteredProducts: filtered }));
        }
function resetState() {
  var searchInput = document.getElementById('search-input');
  var suggestionsList = document.getElementById('suggestions-list');
  if (searchInput) {
    searchInput.value = ''; // Clear the search input
  }
  if (suggestionsList) {
    suggestionsList.innerHTML = ''; // Clear the suggestions list
  }
  // Any other state reset you need
}

  
 function filterProducts() {
  var input = document.getElementById('search-input').value.toLowerCase();
  var suggestions = document.getElementById('suggestions-list');
  suggestions.innerHTML = '';

  if (!input) {
    return;
  }

  var filtered = products.filter(function(product) {
    return product.name.toLowerCase().includes(input);
  });

  filtered.forEach(function(product) {
    var li = document.createElement('li');
    li.className = "suggestion-item"; // Add a class for styling
    li.innerHTML = \`
      <img class="suggestion-image" src="\${product.image_url}" alt="\${product.name}" onerror="handleImageError(this)">
      <span class="suggestion-text">\${product.name}</span>
    \`;
    li.onclick = function() {
      selectProduct(product.product_id);
    };
    suggestions.appendChild(li);
  });
}
  function selectProduct(productId) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selectProduct', productId }));
  }
        function navigateToDetails(productId) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigateToDetails', productId }));
        }
        function search() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'search' }));
        }
        function goBack() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goBack' }));
        }
        function handleImageError(img) {
          img.onerror = null;
          img.src = this;
        }
      </script>
      </script>
    </head>
    <body onload="resetState()">
      <div class="header">
        <span class="backButton" onclick="goBack()">Back</span>
        UL-Shopify
      </div>
      <div class="search-container">
    <input type="search" class="search-bar" id="search-input" placeholder="Search for more!!" oninput="filterProducts()">
    <button class="search-button" onclick="initiateSearch()">Search</button>
    <ul id="suggestions-list" class="suggestions"></ul>
</div>
      <div class="product-grid">
        ${products
            .map(
                (product) => `
          <div class="product-card" key="${product.product_id}">
            <div class="product-image-container">
              <img class="product-image" src="${product.image_url}" alt="${product.name}">
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="product-description">${product.description}</div>
              <button class="details-button" onclick="navigateToDetails('${product.product_id}')">View Details</button>
            </div>
          </div>
        `
            )
            .join("")}
      </div>
    </body>
    </html>
    `;
};
export const WebviewScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([...newArrivals.products]);

    useEffect(() => {
        dispatch(hideTabBar());
        const _products = products.map((product) => {
            const imageKey = extractKeyFromUrl(product.image_url);
            const imageThumbnailURL = thumbnailImage(imageKey);
            product.image_url = imageThumbnailURL;
            return product;
        });
        setProducts(_products);
    }, []);

    // Function to handle messages from the WebView
    const onMessage = (event) => {
        const eventData = JSON.parse(event.nativeEvent.data);
        const product = products.find((product) => product.product_id === eventData.productId);

        switch (eventData.type) {
            case "navigateToDetails":
                product.image_url = viewImage(extractKeyFromUrl(product.image_url));
                navigation.navigate(LOADING_SCREEN, {
                    navigateTo: PRODUCT_SCREEN,
                    product,
                });
                return;
            case "goBack":
                dispatch(showTabBar());
                navigation.navigate(HOME_SCREEN);
                return;
            case "search":
                navigation.navigate(EXPLORE_SCREEN);
                return;
            case "selectProduct":
                const selectedProduct = products.find((p) => p.product_id === eventData.productId);
                selectedProduct.image_url = viewImage(extractKeyFromUrl(selectedProduct.image_url));
                navigation.navigate(PRODUCT_SCREEN, {
                    product: selectedProduct,
                });
                break;
            case "initiateSearch":
                const _filteredProducts = eventData.filteredProducts.map((product) => {
                    const imageKey = extractKeyFromUrl(product.image_url);
                    const imageThumbnailURL = viewImage(imageKey);
                    product.image_url = imageThumbnailURL;
                    return product;
                });
                navigation.navigate(LOADING_SCREEN, {
                    navigateTo: PRODUCT_DISPLAY_SCREEN,
                    products: _filteredProducts,
                    title: "Search Results",
                });
                break;
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <WebView
                source={{ html: productDetailsHTML(products) }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                onMessage={onMessage}
            />
        </SafeAreaView>
    );
};
