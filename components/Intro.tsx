import Spline from '@splinetool/react-spline/next';

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

        return (
            <div className="min-h-screen relative flex flex-col items-center">
                <div className="pt-20 text-[118px] text-center leading-tight intro-words z-10 relative">
                {lines.map((line, lineIndex) => (
                    <div key={lineIndex} className="line">
                        {line.split(' ').map((word, wi) => {
                            const delay = count * 0.5;
                            const key = `${lineIndex}-${wi}`;
                            count += 1;
                            return (
                                <span
                                    key={key}
                                    className="word"
                                    style={{ animationDelay: `${delay}s`, marginRight: '0.6rem' }}
                                >
                                    {word + '\u00A0'}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
                <div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                        opacity: 0,
                        animation: `spline-fade 0.9s ease ${splineFadeDelay}s forwards`,
                    }}
                >
                    <Spline
                        scene="https://prod.spline.design/MgluQXrL5N7glBkd/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

        </div>
    );
}

export default Intro