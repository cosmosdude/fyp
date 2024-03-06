
let postfix = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50].reverse()

// let name = process.argv[2]
// let h = process.argv[3]
// let s = process.argv[4]
let l = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95].reverse()

let colors = [
    { name: 'danger', h: 2, s: 100 },
    { name: 'neutral', h: 0, s: 0 },
    { name: 'primary', h: 226, s: 75 },
    { name: 'secondary', h: 252, s: 100 },
    { name: 'success', h: 130, s: 100 },
    { name: 'warning', h: 53, s: 100 },
]

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

for (const color of colors) {
    for (let i = 0; i < l.length; i++) {
        console.log(`'${color.name}-${postfix[i]}': '${hslToHex(color.h, color.s, l[i])}',`)
    }
    console.log();
}



