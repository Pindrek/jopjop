import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TemperCity from './music/TemperCity.mp3';
import './main.css';

function Loop(num) {
    ++num;
    return num;
}

function Main() {
    const [click, setClick] = useState(false);
    const [view, setView] = useState(false);
    const [count, setCount] = useState(0);
    const [showText, setShowText] = useState("");

    const text = `All these moments prove that we've already been together for quite 
    a while and that we truly enjoy being together. I love you so much, 
    my sunshine. I'm really glad I met you back then. You're an incredible
    person, and I hope everything will continue to go well for us in the 
    future.
    ❤️`;

    const music = new Audio(TemperCity);
    music.currentTime = 42;
    music.volume = 0.00;

    const images = import.meta.glob("./image/*.jpg", {
        eager: true,
        import: "default",
    });

    useEffect(() => {
        if (!view) return;

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 29) {
                    clearInterval(interval);
                    return prev;
                }

                return prev + 1;
            });
        }, 250);

        return () => clearInterval(interval);
    }, [view]);

    useEffect(() => {
        if (count !== 29) return;
        let i = 0;
        const interval = setInterval(() => {
            setShowText(text.slice(0, i + 1));
            ++i;
            if (i >= text.length) clearInterval(interval)
        }, 70);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <>
            { !view &&
                <div className="container">
                    <button
                        className={`button${click ? 'Click' : ''}`}
                        onClick={() => {
                            setClick(true)
                            setTimeout(() => {
                                setView(true);
                                music.volume = 1;
                            }, 8700);
                            music.play();
                            const interval = setInterval(() => {
                                if (music.volume >= 0.15) {
                                    music.volume = 0.15;
                                    clearInterval(interval);
                                    return;
                                }
                                music.volume += 0.005;
                            }, 100);
                        }}
                    >JOP-JOP</button>
                    <p className={`when${click ? 'Click' : ''}`}>When we first met, I thought it wouldn't last long, but...</p>
                </div>
            }
            { view &&
                <>
                    {count <= 28 &&
                        <img className="photo" src={images[`./image/${count}.jpg`]} alt="❤️" />
                    }
                    {count > 28 &&
                        <p className="text">{showText}</p>
                    }
                </>
            }
        </>
    );
}

createRoot(document.getElementById("root")).render(<Main />);
