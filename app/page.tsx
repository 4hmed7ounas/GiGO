import Chatbot from "./chatbot/page";
import { Hero } from "./components/home/hero";

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <Hero />
      <Chatbot/>
    </div>
  );
}
