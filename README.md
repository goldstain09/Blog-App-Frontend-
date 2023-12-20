Project Name - "BLOG APP"

Frontend (ReactJS):

Description:
The frontend of the blogging application is built using React, providing an intuitive and user-friendly interface for bloggers. Users can seamlessly create and manage their blogger accounts, personalize profiles by updating profile pictures, names, and biographies. The application supports account security features such as changing passwords and a forget password functionality.

Bloggers can compose engaging posts, each with the flexibility to include images, relevant tags, category assignments, captions, and a captivating title with detailed paragraphs. The platform fosters social interaction by enabling users to like, follow, and comment on blog posts. The search functionality empowers bloggers to discover content based on categories, tags, or specific bloggers.

The frontend ensures a dynamic and responsive experience, allowing users to edit and modify their blog posts with ease. The application seamlessly integrates with Firebase Storage for image storage, providing a visually appealing environment for bloggers to express themselves and connect with a wider audience.

Installation & Usage Steps:
cd Blog_app_Frontend
npm install
npm start

but before this you need to start backend server OR
create build by using "npm run build", and set it in backend's /View;

Folder Structure:
└── /src
├── /components- Contains reusable React components and their corresponding SCSS files.
| ├──/SCSS- Holds SCSS files for styling.
| | ├──Component1.scss
| | ├──Component2.scss
| | └── ...
│ ├── Component1.jsx
│ ├── Component2.jsx
│ └── ...
├── /media- Stores main images and logos used in the application.
│ ├── image1.jpg
│ ├── image2.png
│ └── ...
├── /pages- Holds components specific to each route/page along with their SCSS files.
| ├──/SCSS- Holds SCSS files for styling.
| | ├──Page1.scss
| | ├──Page2.scss
| | └── ...
│ ├── Page1.jsx
│ ├── Page2.jsx
│ └── ...
├── /redux- Manages state using Redux and Redux Saga.
│ ├── /actions- Contains Redux action creators.
│ ├── /constants- Defines action types and constants.
│ ├── /reducers- Implements Redux reducers.
│ ├── /sagas- Manages Redux Sagas for asynchronous actions.
│ ├── /services- Contains service files for API interactions.
│ └── store.js- Configures the Redux store.
├── /utils- Includes utility file, such as the Firebase configuration file.
│ └── firebaseConfig.js
├── index.js- Main entry point for React application.
└── router.js- Manages all routes within application.

Technologies used (Frontend)

- React
- React-Redux
- Redux Saga {Toolkit}
- React Router Dom
- Axios
- SCSS
- Firebase Storage

Dependencies:
"axios": "^1.6.0",
"firebase": "^10.6.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-redux": "^8.1.3",
"react-router-dom": "^6.17.0",
"react-scripts": "5.0.1",
"react-spinners": "^0.13.8",
"redux": "^4.2.1",
"redux-saga": "^1.2.3",
"sass": "^1.69.5"
