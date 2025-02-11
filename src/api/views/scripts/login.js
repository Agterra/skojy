let currentUsername = ""

// Resets the default state value when reloading
document.getElementById('login_input').value = ""
document.getElementById('login_submit').disabled = true

function inputEvent(event) {
    const value = event.target.value
    currentUsername = value.trim()
    const submitButton = document.getElementById('login_submit')
    if (!currentUsername || currentUsername.length === 0) {
        submitButton.disabled = true
    } else {
        submitButton.disabled = false
    }
}

document.addEventListener('htmx:afterRequest', (event) => {
    const req = event.detail.xhr
    if (req.status === 200) {
        sendMessage({ action: "create_user", body: { username: currentUsername } })
    } else if (req.status >= 400 && req.status < 600) {
        alert(JSON.parse(req.response).error)
    }
})