import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    useGSAP(() => {
        const titleSplit = new SplitText(".title", { type: "chars , words" });
        const subTitleSplit = new SplitText(".subtitle", { type: "lines" });

        titleSplit.chars.forEach((char) => char.classList.add("text-gradient"));
        gsap.from(titleSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });
        gsap.from(subTitleSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: 500 }, 0)
            .to(".left-leaf", { y: -350 }, 0);

        const startVal = isMobile ? "top 50%" : "center 60%";
        const endVal = isMobile ? "120% tops" : "bottom top";

        const videoTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startVal,
                end: endVal,
                scrub: true,
                pin: true,
            },
        })
        videoRef.current.onloadedmetadata = () => {
            videoTimeLine.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        };
        
    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />
                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool.Crisp.Classic</p>
                            <p className="subtitle">
                                Sip the Spirit <br />
                                of Summer
                            </p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium
                                ingredients, creative flair, and timeless
                                recipes — designed to delight your senses.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    );
};

export default Hero;
