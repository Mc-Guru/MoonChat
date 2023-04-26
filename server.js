const WebSocket = require("ws");

// Créer le serveur WebSocket
const server = new WebSocket.Server({ port: 8080 });

// Stocker les clients connectés
const clients = new Set();

// Écouter les connexions de clients
server.on("connection", (client) => {
  console.log("Client connecté");

  // Ajouter le client à la liste des clients connectés
  clients.add(client);

  // Écouter les messages envoyés par le client
  client.on("message", (message) => {
    console.log("Message reçu: " + message);

    // Diffuser le message à tous les clients connectés
    clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  });

  // Écouter la déconnexion du client
  client.on("close", () => {
    console.log("Client déconnecté");

    // Retirer le client de la liste des clients connectés
    clients.delete(client);
  });
});

console.log("Serveur démarré sur le port 8080");
