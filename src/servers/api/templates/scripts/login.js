function inputEvent(event) {
    const value = event.target.value
    const elem = document.getElementById('login_submit')
    if (!value || value.length === 0) {
        elem.disabled = true
    } else {
        elem.disabled = false
    }
}