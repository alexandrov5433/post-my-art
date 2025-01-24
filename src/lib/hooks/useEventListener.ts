import { useEffect, useRef } from "react";

type EventMap = HTMLElementEventMap & WindowEventMap & DocumentEventMap & MediaQueryListEventMap;

export const useEventListener = <K extends keyof EventMap> (
    targetElement: HTMLElement | Window | Document | MediaQueryList | null,
    eventType: K,
    eventListener: (event: EventMap[K]) => void
) => {
    const eventListenerReference = useRef(eventListener);

    useEffect(() => {
        eventListenerReference.current = eventListener;
    }, [eventListener]);


    useEffect(() => {
        if (targetElement === null) {
            return;
        }
        const _eventListener = (e: Event) => eventListenerReference.current(e as EventMap[K]);

        targetElement.addEventListener(eventType, _eventListener);

        return () => targetElement.removeEventListener(eventType, _eventListener);
    }, [targetElement, eventType]);
};