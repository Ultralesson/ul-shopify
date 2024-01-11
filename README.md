# UI-Shopify Automation Playground

UI-Shopify is a specialized React Native application designed exclusively for automation testing. This playground app simulates a full-fledged e-commerce platform, providing a rich set of screens and functionalities to facilitate the development and testing of automation scripts.

## Purpose

The primary purpose of UI-Shopify is to serve as a sandbox for automation purposes. It offers a variety of UI elements and interactions that are common in e-commerce applications, making it an ideal candidate for testing automation frameworks and tools.

Absolutely, providing clear explanations on how AsyncStorage works and under what conditions the data is stored or deleted can be critical for users to understand the app's functionality, especially in the context of an automation testing environment. Here's the updated section for the README:

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

### Performance and Reliability:

-   AsyncStorage operates asynchronously, ensuring UI responsiveness and smooth performance during data operations.
-   Being independent of network connectivity, it allows for reliable testing of the app's functionalities without external dependencies.

### Security:

-   While AsyncStorage is not encrypted, it is sandboxed to the app, which means the data is not accessible to other apps or processes on the device.
-   For testing environments, this level of security is adequate as sensitive user data is not involved.

### Controlled Environment:

-   Storing data locally contributes to a controlled testing environment, providing a consistent state for automated tests to run deterministically.
-   This method eliminates variables such as network latency or third-party API reliability, which could affect the outcome of automation tests.

By utilizing AsyncStorage, UI-Shopify ensures that the automation testing environment is both secure and isolated, mirroring a realistic app behavior without the risks of handling real user data.

## Why React Native?

React Native was chosen as the framework for building UI-Shopify due to its cross-platform capabilities and its extensive ecosystem. React Native allows for:

-   Rapid development and iteration of UI components.
-   A single codebase for both iOS and Android platforms, ensuring uniform behavior across devices.
-   Access to a wide range of libraries and tools that are beneficial for automation testing.
-   The ability to integrate native modules, if needed, for more complex automation scenarios.

Certainly, I will craft the README section to reflect the preconfigured user data for automation purposes.

## Preconfigured App States for Automation

Upon installation, the AsyncStorage is initially empty. However, we have automated the seeding process so that when the app is first launched, it will programmatically populate the AsyncStorage with the default user credentials and a sample order. This simulates a post-registration state, allowing immediate access to the app's full functionality.

#### Default Account Details:

-   **Email**: `ulshopify@ultralesson.com`
-   **Password**: `12345`

#### Advantages of Preconfiguration:

-   **Speed**: Eliminates the need for account creation in every test cycle, accelerating the testing process.
-   **Consistency**: Provides a consistent starting point for tests, ensuring that all testers are working with the same baseline.
-   **Focus**: Allows testers to concentrate on more complex user interactions and flows without the overhead of preliminary setup.

#### Preloaded OTP for Verification:

Similarly, for the OTP verification flow:

-   **Dummy OTP**: `0000`
-   This preloaded OTP can be used to test the OTP verification process, ensuring that testers can simulate and automate the verification flow seamlessly.

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

## Testing with UI-Shopify

This app is designed to work seamlessly with automation tools. The locators for each element have been meticulously added to facilitate easy identification and interaction within your test scripts.

## Contributing

While UI-Shopify is primarily for testing automation, contributions are welcome. If you have suggestions to enhance the testing experience, please share them.

<img src="./videos/register-flow.gif" width="200" height="350">
