const wss = new WebSocket('ws://localhost:8081')

wss.onopen = (event) => {
    console.log("Successfully connected to websocket server")
}

wss.onmessage = async (event) => {
    const json = await decodeMessage(event)
    switch (json.action) {
        case 'unique_id':
            const id = getCookie("skojy_id")
            if (!id) {
                setCookie("skojy_id", json.body.id, 1)
            }
            break
    }
}

async function decodeMessage(binary) {
    const blob = await binary.data.arrayBuffer()
    const decoder = new TextDecoder("utf-8")
    return JSON.parse(decoder.decode(blob))
}

function sendMessage(message) {
    message.id = getCookie("skojy_id")
    const encoder = new TextEncoder()
    wss.send(encoder.encode(JSON.stringify(message)))
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Strict";
}