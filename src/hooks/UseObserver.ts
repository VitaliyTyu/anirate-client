import { useEffect, useRef } from "react";

export const useObserver = (ref: HTMLHeadingElement, canLoad: boolean, isLoading: boolean, callback: () => void) => {
    const observer = useRef();

    useEffect(() => {
        // if (isLoading) return;
        // if (observer.current) observer.current.disconnect();

        // var cb = function (entries, observer) {
        //     if (entries[0].isIntersecting && canLoad) {
        //         callback()
        //     }
        // };
        // observer.current = new IntersectionObserver(cb);
        // observer.current.observe(ref.current)
    }, [isLoading])
}