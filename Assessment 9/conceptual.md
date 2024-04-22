### Conceptual Exercise

- What is the purpose of the React Router?
   React Router enables navigational components in React applications, allowing you to manage and handle multiple views at different paths. It makes it easy to implement dynamic routing in a web application, without the page needing to reload.

- What is a single page application?
   A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from the server. This approach results in a smoother user experience and reduced page load times.

- What are some differences between client side and server side routing?
   In client-side routing, the routing happens within the browser without the need for an initial request to the server after the application is loaded. In contrast, server-side routing involves the server in every route change, which reloads the webpage and can result in slower transitions and more data transfer.

- What are two ways of handling redirects with React Router? When would you use each?
   Two ways to handle redirects in React Router are using the `<Redirect>` component and programmatically using `history.push()` or `history.replace()`. Use `<Redirect>` when you want to redirect from a specific route declaratively. Use `history.push()` or `history.replace()` when you need to redirect after some logic has been executed, like after a form submission.

- What are two different ways to handle page-not-found user experiences using React Router?
   Two ways to handle a page-not-found experience in React Router are to use a `<Route>` with `path="*"` or `path="/404"` that renders a specific "Not Found" component, and using conditional rendering inside a component based on the `location` to show a not found message if no other routes are matched.

- How do you grab URL parameters from within a component using React Router?
   To grab URL parameters in a component using React Router, you can use the `useParams` hook, which returns an object of key/value pairs of URL parameters. For example, `const { id } = useParams()` would give you the parameter `id` from the URL.

- What is context in React? When would you use it?
   Context in React provides a way to pass data through the component tree without having to pass props down manually at every level. It's used when some data needs to be accessible by many components at different nesting levels, such as theming or user authentication status.

- Describe some differences between class-based components and function components in React.
   Class components allow you to use more complex features such as state management and lifecycle methods, whereas function components are simpler and used for components that can be expressed as a function of their props. With the introduction of Hooks, function components can now also use state and other React features, making them more powerful.

- What are some of the problems that hooks were designed to solve?
   Hooks were introduced to solve issues such as complex logic reuse between components, bulky class components, and confusion around `this` in JavaScript. They allow for using state and other React features in functional components, making it easier to share logic across components without the need for higher-order components or render props.