import { useEffect, useRef, useState } from "react";


type IScrollLoadIn = {
    threshold?: number;
};

export function useScrollLoadIn({ threshold = 0.8 }: IScrollLoadIn) {

    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);


    useEffect(() => {

        const element = elementRef.current;



        if (!element) {
            console.log("No element found for intersection observer.");

            return;
        }


        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                console.log("Element is visible:", entry.isIntersecting);
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );


        observer.observe(element);

        console.log("Intersection observer set up for element:", element);

        return () => {
            observer?.disconnect();
            if (elementRef.current) {
                observer?.unobserve(elementRef.current);
            }
        };
    }, [threshold]);






    return {
        elementRef,
        isVisible,
    }
}