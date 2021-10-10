const uniqueString = () => {
    const len = 9
    let randStr = ""
    for (let i = 0; i <= len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}

export default uniqueString