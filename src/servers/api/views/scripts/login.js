let currentUsername = ""

function inputEvent(event) {
    const value = event.target.value
    currentUsername = value
    const elem = document.getElementById('login_submit')
    if (!value || value.length === 0) {
        elem.disabled = true
    } else {
        elem.disabled = false
    }
}

document.addEventListener('load', (event) => {
    console.log('coucou')
})

document.addEventListener('htmx:afterRequest', (event) => {
    const status = event.detail.xhr.status
    if (status === 200) {
        sendMessage({ action: "create_user", body: { username: currentUsername } })
    } else {
        alert("Une erreur est survenue")
    }
})