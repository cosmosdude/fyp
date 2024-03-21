const runAsyncWithAborter = (
    fn: (aborter: AbortController) => Promise<unknown>, 
    onError: (error) => void | undefined
): AbortController => {
    let aborter = new AbortController()
    async function run() {
        try {
            await fn(aborter)
        } catch (error) { onError?.(error) }
    }
    run()

    return aborter
}

export default runAsyncWithAborter