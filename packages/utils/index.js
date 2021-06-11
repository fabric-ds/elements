export function classes(defn) {
    const classes = [];
    for (const [key, value] of Object.entries(defn)) {
        if (value) classes.push(key);
    }
    return classes.join(' ');
}