# UI-Shopify Automation Playground

UI-Shopify is a specialized React Native application designed exclusively for automation testing. This playground app simulates a full-fledged e-commerce platform, providing a rich set of screens and functionalities to facilitate the development and testing of automation scripts.

## Purpose

The primary purpose of UI-Shopify is to serve as a sandbox for automation purposes. It offers a variety of UI elements and interactions that are common in e-commerce applications, making it an ideal candidate for testing automation frameworks and tools.

## App Features

-   **Home Screen**: Showcases products and categories, designed to test both horizontal and vertical scrolling.
-   **Product Display Screen**: Allows testing of sorting and filtering UI components.
-   **Product Detail Screen**: Provides a detailed view for automation of transactional operations.
-   **Cart Screen**: Simulates cart management functionalities.
-   **Explore Screen**: Implements search capabilities and product exploration.
-   **Track Order Screen**: Emulates order tracking interfaces.
-   **Thank You Screen**: Confirms successful mock transactions.
-   **Profile Screen**: Manages register and login navigation's.
-   **Registration Screen**: Tests user onboarding flow.
-   **Login Screen**: Simulates user authentication.
-   **OTP Screen**: For automation of one-time password verification.
-   **Forgot Password Screen**: Tests password reset flows.
-   **Loading Screen**: Can be used to test loading states.
-   **Error Modal**: To ensure modals appear correctly upon errors.
-   **Success Modal**: To confirm the success states are handled properly.

## UI-Shopify Automation Flows

UI-Shopify includes a number of user flow simulations that are essential for comprehensive automation testing. Below are the animated GIFs demonstrating each key flow within the application.

<table>
  <tr>
    <th>Registration Flow</th>
    <th>Error Toast Flow</th>
    <th>Forgotten Password Flow</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/register-flow.gif" width="200" height="350">
    </td>
    <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/error-modal-flow.gif" width="200" height="350">
    </td>
        <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/forgotten-password-flow.gif" width="200" height="350">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th>Filtering Flow</th>
    <th>Cart Manipulation Flow</th>
    <th>Web view Flow</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/filtering-flow.gif" width="200" height="350">
    </td>
    <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/cart-manipulation-flow.gif" width="200" height="350">
    </td>
        <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/web-view.gif" width="200" height="350">
    </td>
  </tr>
</table>

Many more flows...

## Data Privacy and Storage with AsyncStorage

UI-Shopify is committed to ensuring user privacy and providing a reliable automation testing environment. To achieve this, we use React Native's AsyncStorage, a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app. Here's how it operates:

### Data Storage:

-   **Android**: AsyncStorage data is saved in plain text files within the app's sandboxed file system. Each file represents a storage entry for a key-value pair.
-   **iOS**: AsyncStorage leverages native iOS libraries to store data in a serialized format within the app's sandboxed file system.

### Deletion Criteria in Automation Context:

-   **Manual Deletion**: Data stored within AsyncStorage can be programmatically deleted to test various app states and workflows. This is crucial for automation testing, as it allows simulating scenarios such as user logout, cart modifications, and resetting the app to a default state.
-   **App Uninstallation**: Upon uninstallation of the app, AsyncStorage is completely cleared. This behavior can be leveraged in automation to ensure a clean slate for each test run, which is especially useful when testing installation and onboarding processes.

-   **App Updates**: Developers have the option to clear AsyncStorage during app updates. This can be used in automation tests to verify that app upgrades do not adversely affect user data or app functionality, ensuring backward compatibility and data integrity.

These deletion mechanisms ensure that each automated test can be conducted in a controlled environment with the ability to reset to a known state, an essential factor for consistent and reliable test results.

## Preconfigured App States for Automation

Upon installation, the AsyncStorage is initially empty. However, we have automated the seeding process so that when the app is first launched, it will programmatically populate the AsyncStorage with the default user credentials and a sample order. This simulates a post-registration state, allowing immediate access to the app's full functionality.

#### Default Account Details:

-   **Email**: `ulshopify@ultralesson.com`
-   **Password**: `12345`

<table>
  <tr>
    <th>Cart Manipulation Flow</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/Ultralesson/ul-shopify/blob/gif-videos/videos/dummy-email.gif" width="200" height="350">
    </td>
   
  </tr>
</table>

#### Advantages of Preconfiguration:

-   **Speed**: Eliminates the need for account creation in every test cycle, accelerating the testing process.
-   **Consistency**: Provides a consistent starting point for tests, ensuring that all testers are working with the same baseline.
-   **Focus**: Allows testers to concentrate on more complex user interactions and flows without the overhead of preliminary setup.

#### Preloaded OTP for Verification:

Similarly, for the OTP verification flow:

-   **Dummy OTP**: `0000`
-   This preloaded OTP can be used to test the OTP verification process, ensuring that testers can simulate and automate the verification flow seamlessly.

Absolutely, I'll craft a section for the README that outlines how to add locators for seamless automation in React Native.

---

## Adding Locators for Automation Testing

In UI-Shopify, ensuring a seamless automation experience is paramount. To facilitate this, we employ specific attributes in our React Native components that serve as locators for automation tools. These locators are critical for identifying UI elements during testing.

Note: However, if you encounter components missing these locators, we encourage contributions to enhance our automation capabilities.

### Locator Attributes

When defining React Native components, use the following locator attributes:

-   `testID`: Used by automated test frameworks to locate the element.
-   `nativeID`: Utilized internally by React Native for native operations.
-   `accessibilityLabel`: Assists screen readers and can be used by test frameworks to locate elements.

Here's an example of how to apply these locators to a `<Text>` component:

```jsx
<Text
    testID="txt-browse-and-buy"
    nativeID="txt-browse-and-buy"
    accessibilityLabel="txt-browse-and-buy"
    ...other properties
>
    Browse & Buy!
</Text>
```

### Naming Conventions for Locators

To maintain consistency and readability, we follow a specific naming convention for locator strings. Prefixes should describe the type of element, making it intuitive for testers to understand what they are interacting with:

-   `txt`: Prefix for text elements.
-   `btn`: Prefix for button elements.
-   `img`: Prefix for image elements.
-   `chk`: Prefix for checkbox elements.

-   `inp`: Input fields, including text, number, email, etc.
-   `lbl`: Labels that are not interactive but may need to be identified.
-   `swt`: Switch elements, for toggles between two states.
-   `sldr`: Slider elements, for range selections.
-   `modal`: Modal windows.
-   `tab`: Tab elements in a tab bar or navigation.
-   `icon`: Iconographic elements.
-   `link`: Text elements that navigate to other screens or external resources.

### Applying Locator Conventions

When implementing these locators, ensure they are unique within the screen and, if possible, within the app to avoid clashes. Use meaningful suffixes that reflect the element's purpose or the text it displays.

Sure, let's add a section to the README about the bundle identifier and package name for both Android and iOS platforms:

---

## Bundle Identifier and Package Name

In UI-Shopify, the bundle identifier for iOS and the package name for Android are set to: `com.ultralesson.ulshopify`

## Testing with UI-Shopify

This app is designed to work seamlessly with automation tools. The locators for each element have been meticulously added to facilitate easy identification and interaction within your test scripts.

## Contributing

While UI-Shopify is primarily for testing automation, contributions are welcome. If you have suggestions to enhance the testing experience, please share them.
