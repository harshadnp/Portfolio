import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- All sub-components remain the same ---

const StatusBadge = memo(() => (
    <div
      className="inline-block animate-float lg:mx-0"
      data-aos="zoom-in"
      data-aos-delay="400"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative px-3 sm:px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
            <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-cyan-400" />
            Ready to Innovate
          </span>
        </div>
      </div>
    </div>
  ));
  
  const MainTitle = memo(() => (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
      <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 blur-2xl opacity-20"></span>
          <span className="relative bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Engineering
          </span>
        </span>
        <br />
        <span className="relative inline-block mt-2">
          <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-20"></span>
          <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Student
          </span>
        </span>
      </h1>
    </div>
  ));
  
  const CTAButton = memo(({ href, text, icon: Icon }) => (
    <a href={href}>
      <button className="group relative w-[160px]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
        <div className="relative h-11 bg-slate-800 backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
          <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
              {text}
            </span>
            <Icon
              className={`w-4 h-4 text-gray-200 ${
                text === "Contact"
                  ? "group-hover:translate-x-1"
                  : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
            />
          </span>
        </div>
      </button>
    </a>
  ));
  
  const SocialLink = memo(({ icon: Icon, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="group relative p-3">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative rounded-xl bg-slate-800/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </div>
      </button>
    </a>
  ));

// Constants remain the same
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Electronics & Telecom Student", "Tech Enthusiast"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Harshadp19" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/harshad-patil-tech" },
  { icon: Instagram, link: "https://www.instagram.com/harshadp.19?igsh=aHQ0ODhtOTVlZ2gz" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Hooks remain the same
  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
    const handleResize = () => AOS.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
        isHovering ? "scale-110 rotate-1" : "scale-100"
    }`,
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 min-h-screen">
          {/* UPDATED: Main layout now uses a robust CSS Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center min-h-screen gap-12 lg:gap-20">
            
            {/* --- Left Column (Text Content) --- */}
            <div
              className="space-y-8 text-center lg:text-left"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <StatusBadge />
              <MainTitle />

              {/* Typing Effect */}
              <div
                className="h-8 flex items-center justify-center lg:justify-start"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <span className="text-xl md:text-2xl text-gray-300 font-light">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-cyan-400 to-blue-500 ml-1 animate-pulse"></span>
              </div>

              {/* Description */}
              <p
                className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                Building Smart Tech Solutions that Bridge Innovation and Reality.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-row gap-4 w-full justify-center lg:justify-start"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <CTAButton
                  href="#Portofolio"
                  text="Projects"
                  icon={ExternalLink}
                />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </div>

              {/* Social Links */}
              <div
                className="flex gap-4 justify-center lg:justify-start pt-4"
                data-aos="fade-up"
                data-aos-delay="1400"
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </div>
            </div>

            {/* --- UPDATED: Right Column (Lottie Animation) --- */}
            <div
              className="w-full h-full relative flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="400"
            >
                {/* This container constrains the animation and prevents overflow bugs */}
                <div className="relative w-[500px] h-[500px] max-w-full max-h-full">
                    <div
                    className={`absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl transition-all duration-700 ease-in-out ${
                        isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                    }`}
                    ></div>
                    <div
                    className={`relative z-10 w-full h-full opacity-90 transform transition-transform duration-500 ${
                        isHovering ? "scale-105" : "scale-100"
                    }`}
                    >
                    <DotLottieReact {...lottieOptions} />
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);

