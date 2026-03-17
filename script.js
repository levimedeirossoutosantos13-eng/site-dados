// CONFIGURAÇÃO DO FIREBASE (Cole a sua aqui)
const firebaseConfig = {
  apiKey: "AIzaSyCb0cgCiwckFOuUiW4uD0k_Sh5jNYPGWIc",
  authDomain: "siteorganizacao-77921.firebaseapp.com",
  databaseURL: "https://siteorganizacao-77921-default-rtdb.firebaseio.com",
  projectId: "siteorganizacao-77921",
  storageBucket: "siteorganizacao-77921.firebasestorage.app",
  messagingSenderId: "368947788532",
  appId: "1:368947788532:web:4acf4ceb45780cff957ca1",
  measurementId: "G-CXCPQVHPHJ"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Função para salvar dados
function saveData() {
    const name = document.getElementById('userName').value;
    const msg = document.getElementById('messageInput').value;

    if(name && msg) {
        database.ref('mensagens/').push({
            usuario: name,
            texto: msg,
            data: new Date().toLocaleString()
        });
        document.getElementById('messageInput').value = ''; // Limpa o campo
    } else {
        alert("Preencha seu nome e a mensagem!");
    }
}

// Função para listar as mensagens automaticamente para todos
database.ref('mensagens/').on('value', (snapshot) => {
    const list = document.getElementById('messagesList');
    list.innerHTML = ''; // Limpa a lista antes de atualizar
    
    snapshot.forEach((item) => {
        const val = item.val();
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `
            <strong>${val.usuario} <small>(${val.data})</small></strong>
            <pre>${val.texto}</pre>
        `;
        list.prepend(card); // Adiciona a mais nova no topo
    });
});