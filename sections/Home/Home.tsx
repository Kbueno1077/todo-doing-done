import Disclaimer from "./Disclaimer";
import Features from "./Features";
import Hero from "./Hero";
import Steps from "./Steps";

function Home() {
  return (
    <div className="flex flex-col">
      <main className="">
        <Hero />
        <Features />
        <Steps />
        <Disclaimer />
      </main>
    </div>
  );
}

export default Home;
