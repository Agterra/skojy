const wss = new WebSocket('ws://localhost:8081')

wss.onopen = (event) => {
    alert("Connected to websocket server")
}

wss.onmessage = async (event) => {
    console.log(decodeMessage(event.data))
}

function clickedOnSubmit() {
    const playerName = document.getElementById("player_name_input").value
    const player = {
        name: playerName || "anon"
    }
    sendMessage(JSON.stringify(player))
}

async function decodeMessage(binary) {
    const blob = await binary.data.arrayBuffer()
    const decoder = new TextDecoder("utf-8")
    console.log(decoder.decode(blob))
}

function sendMessage(message) {
    const encoder = new TextEncoder()
    wss.send(encoder.encode(message))
}