
let postfix = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50].reverse()

let name = process.argv[2]
let h = process.argv[3]
let s = process.argv[4]
let l = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95].reverse()

for (let i = 0; i < l.length; i++) {
    console.log(`'${name}-${postfix[i]}': 'hsl(${h}, ${s}, ${l[i]})',`)
}