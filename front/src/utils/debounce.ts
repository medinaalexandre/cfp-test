// @ts-ignore
const debounce = (callback: (...args) => void, time: number) => {
    let interval: number | undefined;
    return () => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = undefined;
            callback();
        }, time);
    };
};

export default debounce;
