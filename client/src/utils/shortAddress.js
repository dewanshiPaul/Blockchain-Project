export const shortAddress = (address) => (
    `${address.slice(0,7)}......${address.slice(address.length-4)}`
)