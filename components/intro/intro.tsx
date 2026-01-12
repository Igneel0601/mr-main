'use client';

import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './intro.module.scss';
import AnimatedWords from '@/components/AnimatedWords';
import { GLOBAL_ANIM_DELAY } from '@/exports/animationConfig';
import { lines, STAGGER, WORD_DURATION } from '@/components/AnimatedWords';
import { getThreshold, getFadeDistance } from '@/exports/export';



export default function Intro() {


    // derive total words and compute when the last word finishes (seconds)
    const words = lines.flatMap((l) => l.split(' ').filter(Boolean));
    const totalWords = words.length;
    const lastWordStart = (totalWords - 1) * STAGGER;
    const lastWordFinish = lastWordStart + WORD_DURATION;
    const splineFadeDelay = +(lastWordFinish + 0.12).toFixed(2); // small buffer
    const threshold = getThreshold();
    const fadeDistance = getFadeDistance();


    // Drive scale and fade from Framer Motion's `useScroll` hook (viewport scroll)
    const { scrollY } = useScroll();
    // Threshold (pixels) at which scale should reach 2.


    const scale = useTransform(scrollY, [0, threshold], [1, 2]);
    // Keep opacity = 1 until we pass threshold, then fade to 0 across fadeDistance.
    const opacity = useTransform(scrollY, [0, threshold, threshold + fadeDistance], [1, 1, 0]);

    // No manual listener needed; `scrollY` updates automatically for the viewport.

    return (
        <div className={styles.indexWrapper}>

            <div className={styles.container}>

                <AnimatedWords />

                <motion.div
                    className={styles.splineWrapper}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: GLOBAL_ANIM_DELAY + splineFadeDelay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    style={{ scale, opacity, transformOrigin: 'center 35%' }}
                >
                    <Spline
                        scene="https://prod.spline.design/MgluQXrL5N7glBkd/scene.splinecode"
                        className={styles.splineScene}
                    />
                </motion.div>

            </div>
        </div>
    );
}
