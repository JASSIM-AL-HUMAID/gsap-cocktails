import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
    return (
        <main>
            <h1>hello gsap</h1>
        </main>
    );
};

export default App;
