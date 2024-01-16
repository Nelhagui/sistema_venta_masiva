export function toCamelCase(str) {
    return str.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
}