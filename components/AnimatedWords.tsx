import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './styles.module.scss';
import { threshold, fadeDistance } from './Index';

export const lines = ["MINIMAL. IMPACTFUL.", "DIGITAL EXPERIENCES"];
// animation timing constants (seconds)
export const STAGGER = 0.5; // seconds between words
export const WORD_DURATION = 0.6;
function AnimatedWords() {
    const { scrollY } = useScroll();

    const vh = typeof window !== "undefined" ? window.innerHeight : 0;

    const fadeStart = vh * 2; // 20vh
    const fadeEnd   = vh * 3; // 40vh


    let count = 0; // cumulative word index for stagger
    // Keep opacity = 1 until we pass threshold, then fade to 0 across fadeDistance.
    const opacity = useTransform(scrollY, [0, threshold + fadeDistance + 200, threshold + fadeDistance + 200 + 200], [1, 1, 0]);
    const scale = useTransform(scrollY, [threshold + fadeDistance, threshold + fadeDistance + 200], [1, 2]);
    return (

        <motion.div
            className={styles.introWords}
            transition={{ delay: 2, duration: 0.6 }}
            style={{ scale, opacity, transformOrigin: 'center center' }}
        >

            {lines.map((line, lineIndex) => (
                <div key={lineIndex} className={styles.line}>
                    {line.split(' ').map((word, wi) => {
                        const idx = count;
                        const key = `${lineIndex}-${wi}`;
                        count += 1;
                        return (
                            <motion.span
                                key={key}
                                className={styles.word}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * STAGGER, duration: WORD_DURATION, ease: 'easeOut' }}
                            >
                                {word + '\u00A0'}
                            </motion.span>
                        );
                    })}
                </div>
            ))}
        </motion.div>
    )
}

export default AnimatedWords