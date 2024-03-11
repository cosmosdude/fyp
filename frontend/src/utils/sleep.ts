export default async function(time: number) {
    return new Promise((resolve) => {
        return setTimeout(resolve, time ?? 100)
    })
}