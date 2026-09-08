import axios from 'axios';

async function fetchFromSiputzx(kind, url) {
    const apiUrl = `https://api.siputzx.my.id/api/d/${kind}?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, {
        timeout: 20000,
        headers: { accept: '*/*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        validateStatus: s => s >= 200 && s < 500
    });
    if (!response.data) throw new Error(`${kind} API returned no data`);
    return response.data;
}

// ─── .tiktok <link> ─────────────────────────────────────────────────────────
export async function tiktok(message, client, input) {
    const remoteJid = message.key.remoteJid;

    if (!input) {
        return client.sendMessage(remoteJid, {
            text: '❌ Send a TikTok video link.\nEx: .tiktok https://vt.tiktok.com/...'
        }, { quoted: message });
    }

    if (!input.includes('tiktok.com')) {
        return client.sendMessage(remoteJid, { text: 'That is not a TikTok link.' }, { quoted: message });
    }

    try {
        const data = await fetchFromSiputzx('tiktok', input);
        const videoUrl = data?.data?.play || data?.data?.url || data?.data?.video;

        if (!videoUrl) {
            return client.sendMessage(remoteJid, { text: '❌ Could not get that TikTok video. It may be private or removed.' }, { quoted: message });
        }

        await client.sendMessage(remoteJid, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `*${data?.data?.title || 'TikTok video'}*\n\n> *Powered by: KAIRO ZYNEX*`
        }, { quoted: message });

    } catch (err) {
        console.error('TikTok error:', err);
        await client.sendMessage(remoteJid, { text: `❌ Error: ${err.message}` }, { quoted: message });
    }
}

// ─── .instagram / .ig <link> ────────────────────────────────────────────────
export async function instagram(message, client, input) {
    const remoteJid = message.key.remoteJid;

    if (!input) {
        return client.sendMessage(remoteJid, {
            text: '❌ Send an Instagram post/reel link.\nEx: .ig https://www.instagram.com/reel/...'
        }, { quoted: message });
    }

    if (!input.includes('instagram.com')) {
        return client.sendMessage(remoteJid, { text: 'That is not an Instagram link.' }, { quoted: message });
    }

    try {
        const data = await fetchFromSiputzx('igdl', input);
        const items = data?.data;
        const media = Array.isArray(items) ? items[0] : items;
        const mediaUrl = media?.url || media?.video || media?.download;

        if (!mediaUrl) {
            return client.sendMessage(remoteJid, { text: '❌ Could not get that Instagram media. It may be private or removed.' }, { quoted: message });
        }

        await client.sendMessage(remoteJid, {
            video: { url: mediaUrl },
            mimetype: 'video/mp4',
            caption: '> *Powered by: KAIRO ZYNEX*'
        }, { quoted: message });

    } catch (err) {
        console.error('Instagram error:', err);
        await client.sendMessage(remoteJid, { text: `❌ Error: ${err.message}` }, { quoted: message });
    }
}

export default { tiktok, instagram };
