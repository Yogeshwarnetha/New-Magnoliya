"use client";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css"; // make sure this file exists

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const onContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const onSelectStart = (e: Event) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable)
            ) {
                return;
            }
            e.preventDefault();
        };

        const onCopyCut = (e: ClipboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable)
            ) {
                return;
            }
            e.preventDefault();
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

            if (
                (ctrlKey && e.key.toLowerCase() === "u") || // view source
                (ctrlKey && e.key.toLowerCase() === "s") || // save
                (ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // devtools
                (ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") || // devtools element
                e.key === "F12" || // devtools
                (ctrlKey && e.key.toLowerCase() === "p") || // print
                (ctrlKey &&
                    e.key.toLowerCase() === "c" &&
                    !["INPUT", "TEXTAREA"].includes(
                        (e.target as HTMLElement)?.tagName || ""
                    )) // copy globally
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", onContextMenu);
        document.addEventListener("selectstart", onSelectStart);
        document.addEventListener("copy", onCopyCut);
        document.addEventListener("cut", onCopyCut);
        document.addEventListener("paste", onCopyCut);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("contextmenu", onContextMenu);
            document.removeEventListener("selectstart", onSelectStart);
            document.removeEventListener("copy", onCopyCut);
            document.removeEventListener("cut", onCopyCut);
            document.removeEventListener("paste", onCopyCut);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
