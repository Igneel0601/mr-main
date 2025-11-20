"use client";

import Spline from '@splinetool/react-spline/next';
import { useSpring, useSprings, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './styles.module.scss';

function Intro() {

    const lines = ["MINIMAL. IMPACTFUL.", "DIGITAL EXPERIENCES"];

    // animation timing constants (keep in sync with CSS)
    const STAGGER = 0.5; // seconds between words
    const WORD_DURATION = 0.6; // word animation duration

    // derive total words and compute when the last word finishes
    const words = lines.flatMap((l) => l.split(' ').filter(Boolean));
    const totalWords = words.length;
    const lastWordStart = (totalWords - 1) * STAGGER;
    const lastWordFinish = lastWordStart + WORD_DURATION;
    const splineFadeDelay = +(lastWordFinish + 0.12).toFixed(2); // small buffer

    let count = 0; // cumulative word index for stagger

    const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: splineFadeDelay * 1000 });


    return (
        <div className={styles.container}>
            <div className={styles.introWords}>

                {lines.map((line, lineIndex) => (
                    <div key={lineIndex} className={styles.line}>
                        {line.split(' ').map((word, wi) => {
                            const delay = count * 0.5;
                            const key = `${lineIndex}-${wi}`;
                            count += 1;
                            return (
                                <span
                                    key={key}
                                    className={styles.word}
                                    style={{ animationDelay: `${delay}s` }}
                                >
                                    {word + '\u00A0'}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <animated.div
                className={styles.splineWrapper}
                style={props}
            >
                <Spline
                    scene="https://prod.spline.design/MgluQXrL5N7glBkd/scene.splinecode"
                    style={{ width: '100%', height: '100%', transform: 'translate(15%, 10%) translateY(0)' }}
                />
            </animated.div>

        </div>
    );
}

export default Intro
