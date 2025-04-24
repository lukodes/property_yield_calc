🧮 PropertyYieldCalc
PropertyYieldCalc is a web-based calculator built with Vue 3 and Tailwind CSS that helps users compare two financial strategies:

Buying a property through financing

Investing the rental savings instead

Users can input financing details (loan amount, monthly payment, property value, expected rent), and the app generates two comparison tables:

📈 Real estate wealth projection: Shows how much equity the user builds over time with property appreciation.

💹 Investment simulation: Projects how much they could accumulate by investing the difference between the mortgage and rent, including a configurable monthly return rate and vacancy period.

This tool aims to help users make informed decisions about whether to buy or invest.

## Installation and Setup

Follow these steps to install and set up the project:

### Prerequisites
- Ensure you have **Node.js** version **20 or higher** installed. You can download it from [Node.js Official Website](https://nodejs.org/).
- A package manager like **yarn**.

### Steps

1. **Clone the Repository**
  ```bash
  git clone https://github.com/lukodes/property_yield_calc.git
  cd property_yield_calc
  ```

2. **Install Dependencies**
  Run the following command to install the required dependencies:
  ```bash
  yarn install
  ```

3. **Start the Development Server**
  Use the following command to start the development server with Vite:
  ```bash
  yarn vite
  ```

4. **Access the Application**
  Open your browser and navigate to `http://localhost:5173` to view the application.

5. **Build for Production**
  For production builds, use:
  ```bash
  yarn vite build
  ```

### Additional Notes
- This project uses **Vue 3** and **Vite** for development.

Enjoy building with the Property Yield Calculator!