export function uuidv4() {
    //1e7]+-1e3+-4e3+-8e3+-1e11 = 10000000-1000-4000-8000-100000000000
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}