import { listSessionNumbers, logoutSession } from '../utils/connector.js';

// ─── .depair (owner only) ───────────────────────────────────────────────────
export async function depair(message, client, isOwner) {
    const remoteJid = message.key.remoteJid;
    if (!isOwner) {
        return client.sendMessage(remoteJid, { text: '❌ Only owner can use this command.' }, { quoted: message });
    }

    const number = client.user.id.split(':')[0];
    await client.sendMessage(remoteJid, { text: '🔌 Disconnecting this session... the bot will need to be paired again from the website.' }, { quoted: message });
    await logoutSession(number);
}

// ─── .sessions (owner only) ─────────────────────────────────────────────────
export async function sessions(message, client, isOwner) {
    const remoteJid = message.key.remoteJid;
    if (!isOwner) {
        return client.sendMessage(remoteJid, { text: '❌ Only owner can use this command.' }, { quoted: message });
    }

    const list = listSessionNumbers();
    const text = list.length
        ? `📡 Connected sessions (${list.length}):\n` + list.map((n, i) => `${i + 1}. ${n}`).join('\n')
        : '📡 No sessions connected.';

    await client.sendMessage(remoteJid, { text }, { quoted: message });
}

export default { depair, sessions };
