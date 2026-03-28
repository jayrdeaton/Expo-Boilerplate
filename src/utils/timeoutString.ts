export const timeoutString = (s: number) => (!s ? 'Never' : s === 60 ? '1 Minute' : s === 180 ? '3 Minutes' : s === 300 ? '5 Minutes' : `${s} Seconds`)

export default timeoutString
