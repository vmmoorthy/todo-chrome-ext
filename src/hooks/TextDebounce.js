// textInput debounce hook
export const useTextInput = (cb) => {
    let debounceTimer = 0;
    function debounce(val) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => cb(val), 600);
    }
    return debounce
}