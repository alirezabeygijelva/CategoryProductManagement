Here’s a `README.md` file for your project: 

---

# CRUD Application with .NET 9 and React

This is a simple CRUD application that demonstrates a **One-to-Many relationship** between two entities: **Category** and **Product**. The application is built with the following technologies:

- **Back-End**: .NET 9
- **Front-End**: React 18.3.1 with TypeScript and Vite

## Features

1. **CRUD Operations**: 
   - Manage Categories and Products.
   - Products are associated with Categories in a one-to-many relationship.

2. **Cascading Deletes**:
   - Deleting a category will also delete all related products.

3. **Modern Front-End**: Built with React 18, TypeScript, and Vite for a fast and efficient development experience.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or later)
- **.NET SDK** (v9 or later)
- **npm** or **yarn** for managing dependencies

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/alirezabeygijelva/CategoryProductManagement.git
cd CategoryProductManagement
```

---

### Step 2: Run the Back-End API

1. Navigate to the API project directory:
   ```bash
   cd api
   ```

2. Restore dependencies (if not already restored):
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

4. Seed Datebase:
	```bash
	dotnet run --seed
	```

4. The API will start and should be accessible at `https://localhost:7223` (or another configured port).

---

### Step 3: Run the Front-End Application

1. Navigate to the front-end project directory:
   ```bash
   cd mstestproject-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port displayed in the terminal).

---

## API Endpoints

### Category Endpoints
- **OPEN API**: API ROOT URL is OPEN API Documentations.
---

## Front-End Structure

The front-end is built with React and Vite, and includes:

- **Category Management**: 
  - Add, edit, delete categories.
  - Display all categories in a list by custom order.

- **Product Management**: 
  - Add, edit, delete products within categories.
  - Display products for a selected category by custom order.

---

## Important Notes

1. **Cascading Deletes**:
   - Deleting a category will automatically delete all associated products. Handle this action with care.

2. **Vite Development Server**:
   - By default, Vite runs on `http://localhost:5173`. If you encounter issues, ensure the port is not blocked or in use.

3. **Environment Configuration**:
   - Ensure that the API URL in the front-end is correctly configured to match the back-end URL.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and use it for your projects.

---

## Contribution

Feel free to open issues or create pull requests if you want to contribute to the project.

---

## Acknowledgements

- [Microsoft .NET](https://dotnet.microsoft.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)

Enjoy this CRUD application! 🎉