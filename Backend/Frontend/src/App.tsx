/* eslint-disable */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import RichText from './components/RichText';

function App() {
  return (
    <div className="duration-500 scroll-smooth overflow-hidden">
      <Navbar move position="fixed" />
      <Hero />
      {/* <RichText/> */}
    </div>
  );
}

export default App;
