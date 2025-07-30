import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";
import gsap from "gsap";

const NavBar = () => {
    useGSAP(() => {
        const navLinks = gsap.utils.toArray("#link-list li");
        gsap.from(navLinks, {
            x: 100,
            y: -100,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.2,
        });
        gsap.from("#logo", {
            x: -100,
            y: -100,
            duration: 2,
            ease: "power2.inOut",
        });

        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top",
                scrub:true,
            },
        });

        navTween.fromTo(
            "nav",
            { backgroundColor: "transparent" },
            {
                backgroundColor: "#00000050",
                duration: 1,
                ease: "power1.inOut",
            }
        );
    });

    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2" id="logo">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>
                <ul id="link-list">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}> {link.title} </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
