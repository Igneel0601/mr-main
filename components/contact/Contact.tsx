"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./contact.module.scss";

const CONTACT_EMAIL = "dummy@mail.com";
const CONTACT_PHONE = "+91 99999 00000";
const DETAILS_MAX_HEIGHT_PX = 220;

const ACTIVE_TEXT_COLOR = "rgba(15, 23, 42, 0.92)";
const INACTIVE_TEXT_COLOR = "#8775F5";

const INTERESTS = [
  "Branding",
  "Web / App Design",
  "Web Development",
  "Illustration",
  "Copywriting",
  "Graphic Design",
  "3D Design & Animation",
  "Motion Design & Video",
] as const;

export default function Contact() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  const selectedList = useMemo(() => Array.from(selected.values()), [selected]);

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side behavior for now.
    // If you want, I can wire this to an API route or a service later.
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Interests: ${selectedList.join(", ") || "(none)"}`,
      "",
      details,
    ];

    const subject = encodeURIComponent("New project inquiry");
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const autosizeDetails = () => {
    const el = detailsRef.current;
    if (!el) return;

    // Reset to measure correctly, then set to content height (capped).
    el.style.height = "auto";
    const nextHeight = Math.min(el.scrollHeight, DETAILS_MAX_HEIGHT_PX);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > DETAILS_MAX_HEIGHT_PX ? "auto" : "hidden";
  };

  const setDetailsColor = (color: string) => {
    const el = detailsRef.current;
    if (!el) return;
    el.style.color = color;
  };

  const onDetailsInput = () => {
    autosizeDetails();
    setDetailsColor(ACTIVE_TEXT_COLOR);
  };

  const onDetailsBlur = () => {
    setDetailsColor(INACTIVE_TEXT_COLOR);
  };

  const onDetailsFocus = () => {
    // When user starts interacting again, go back to black.
    setDetailsColor(ACTIVE_TEXT_COLOR);
  };

  const setInlineColor = (el: HTMLInputElement | null, color: string) => {
    if (!el) return;
    el.style.color = color;
  };

  const autosizeInline = (
    el: HTMLInputElement | null,
    opts: {
      minCh: number;
      maxCh: number;
      extraCh?: number;
    }
  ) => {
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches) {
      el.style.width = "100%";
      return;
    }
    const extraCh = opts.extraCh ?? 1;
    const valueLen = el.value?.length ?? 0;
    const placeholderLen = el.placeholder?.length ?? 0;
    const contentLen = Math.max(valueLen, placeholderLen);
    const effectiveMaxCh = Math.max(opts.maxCh, placeholderLen + extraCh);
    const nextCh = Math.min(effectiveMaxCh, Math.max(opts.minCh, contentLen + extraCh));
    el.style.width = `${nextCh}ch`;
  };

  useEffect(() => {
    autosizeDetails();

    // Run after paint so browser autofill has a chance to populate values.
    const syncAll = () => {
      autosizeInline(nameRef.current, { minCh: 8, maxCh: 18, extraCh: 1 });
      autosizeInline(phoneRef.current, { minCh: 8, maxCh: 16, extraCh: 1 });
      autosizeDetails();
    };

    requestAnimationFrame(syncAll);
    window.addEventListener("resize", syncAll);

    // If browser autofills values, show them in the "done" (purple) state.
    requestAnimationFrame(() => {
      if (nameRef.current?.value) setInlineColor(nameRef.current, INACTIVE_TEXT_COLOR);
      if (emailRef.current?.value) setInlineColor(emailRef.current, INACTIVE_TEXT_COLOR);
      if (phoneRef.current?.value) setInlineColor(phoneRef.current, INACTIVE_TEXT_COLOR);
      if (detailsRef.current?.value) setDetailsColor(INACTIVE_TEXT_COLOR);
    });

    return () => {
      window.removeEventListener("resize", syncAll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button
          type="button"
          aria-label="Close"
          className={styles.close}
          onClick={() => router.back()}
        >
          ×
        </button>

        <div className={styles.topRow}>
          <a className={`${styles.topLink} no-scale`} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className={`${styles.topLink} no-scale`} href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>
            {CONTACT_PHONE}
          </a>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.lead}>
            <p className={styles.leadLine}>
              Hello! My name is{" "}
              <input
                name="name"
                ref={nameRef}
                className={`${styles.inlineInput} ${styles.nameInput}`}
                placeholder="your full name"
                autoComplete="name"
                onInput={() => {
                  autosizeInline(nameRef.current, { minCh: 8, maxCh: 18, extraCh: 1 });
                  setInlineColor(nameRef.current, ACTIVE_TEXT_COLOR);
                }}
                onFocus={() => setInlineColor(nameRef.current, ACTIVE_TEXT_COLOR)}
                onBlur={() => setInlineColor(nameRef.current, INACTIVE_TEXT_COLOR)}
              />{" "}
              and I want to discuss a potential project.
            </p>
            <p className={styles.leadLine}>
              You can email me at{" "}
              <input
                name="email"
                type="email"
                ref={emailRef}
                className={`${styles.inlineInput} ${styles.emailInput}`}
                placeholder="your@email.com"
                autoComplete="email"
                onInput={() => {
                  setInlineColor(emailRef.current, ACTIVE_TEXT_COLOR);
                }}
                onFocus={() => setInlineColor(emailRef.current, ACTIVE_TEXT_COLOR)}
                onBlur={() => setInlineColor(emailRef.current, INACTIVE_TEXT_COLOR)}
              />{" "}
              or reach me on{" "}
              <input
                name="phone"
                ref={phoneRef}
                className={`${styles.inlineInput} ${styles.phoneInput}`}
                placeholder="your phone #"
                autoComplete="tel"
                onInput={() => {
                  autosizeInline(phoneRef.current, { minCh: 8, maxCh: 16, extraCh: 1 });
                  setInlineColor(phoneRef.current, ACTIVE_TEXT_COLOR);
                }}
                onFocus={() => setInlineColor(phoneRef.current, ACTIVE_TEXT_COLOR)}
                onBlur={() => setInlineColor(phoneRef.current, INACTIVE_TEXT_COLOR)}
              />
              . Here are some details about my project:
            </p>
          </div>

          <textarea
            name="details"
            ref={detailsRef}
            className={styles.textarea}
            placeholder="My project is about..."
            rows={1}
            onInput={onDetailsInput}
            onFocus={onDetailsFocus}
            onBlur={onDetailsBlur}
          />

          <div className={styles.sectionTitle}>I&apos;m interested in (select one or more)</div>

          <div className={styles.chips}>
            {INTERESTS.map((label) => {
              const isActive = selected.has(label);
              return (
                <button
                  key={label}
                  type="button"
                  className={`${styles.chip} ${isActive ? styles.chipActive : ""} no-hover`}
                  onClick={() => toggle(label)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
