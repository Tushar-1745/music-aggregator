// import React from 'react';
// import Router from './router';
// import Navbar from './components/Navbar';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Router />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import Router from './router';
import Navbar from './components/Navbar';
import WelcomeModal from './components/WelcomeModal'; // ✅ Import it

const App = () => {
  return (
    <div>
      <Navbar />
      <WelcomeModal /> {/* ✅ Place it here so it shows on any route */}
      <Router />
    </div>
  );
};

export default App;
