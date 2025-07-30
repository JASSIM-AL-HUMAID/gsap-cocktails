import { useState, useRef } from "react";
import { allCocktails } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef();
    const totalCocktails = allCocktails.length;

    useGSAP(() => {
        gsap.from("#title", { opacity: 0, duration: 1 });
        gsap.from(".cocktail img", {
            opacity: 0,
            xPercent: -100,
            duration: 1,
            ease: "power1.inOut",
        });
        gsap.from(".details h2", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut",
        });
        gsap.from(".details p", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut",
        });
    }, [currentIndex]);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#menu",
                start: "top 10%",
                pin: true,
                scrub: true,
            },
        })
            .to("#m-left-leaf", { y: -500 }, 0)
            .to("#m-right-leaf", { y: 700 }, 0);
    }, []);

    const getCocktailAt = (indexOffset) => {
        return allCocktails[
            (currentIndex + indexOffset + totalCocktails) % totalCocktails
        ];
    };
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    };
    return (
        <>
            <section id="menu" aria-labelledby="menu-heading">
                <img
                    src="/images/slider-left-leaf.png"
                    alt="left-leaf"
                    id="m-left-leaf"
                />
                <img
                    src="/images/slider-right-leaf.png"
                    alt="right-leaf"
                    id="m-right-leaf"
                />

                <h2 id="menu-heading" className="sr-only">
                    Cocktail Menu
                </h2>

                <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                    {allCocktails.map((cocktail, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <button
                                key={cocktail.id}
                                className={`${
                                    isActive
                                        ? "text-white border-white "
                                        : "text-white/50 border-white/50"
                                }`}
                                onClick={() => goToSlide(index)}
                            >
                                {cocktail.name}
                            </button>
                        );
                    })}
                </nav>

                <div className="content">
                    <div className="arrows">
                        <button
                            className="text-left"
                            onClick={() => goToSlide(currentIndex - 1)}
                        >
                            <span>{prevCocktail.name}</span>
                            <img
                                src="/images/right-arrow.png"
                                alt="right-arrow"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            className="text-right"
                            onClick={() => goToSlide(currentIndex + 1)}
                        >
                            <span>{nextCocktail.name}</span>
                            <img
                                src="/images/left-arrow.png"
                                alt="left-arrow"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="cocktail">
                        <img
                            src={currentCocktail.image}
                            alt="cocktail img"
                            className="object-contain"
                        />
                    </div>
                    <div className="recipe">
                        <div ref={contentRef} className="info">
                            <p>recipe for</p>
                            <p id="title">{currentCocktail.name}</p>
                        </div>
                        <div className="details">
                            <h2>{currentCocktail.title}</h2>
                            <p>{currentCocktail.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Menu;
