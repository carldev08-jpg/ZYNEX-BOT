import configManager from '../utils/manageConfigs.js'
import { BOT_NAME, OWNER_NAME, WA_CHANNEL } from '../config.js'
import fs from 'fs'
import path from 'path'

export async function info(message, client) {
    const remoteJid = message.key.remoteJid

    const number = client.user.id.split(':')[0]
    const prefix = configManager.config.users[number]?.prefix || '.'

    const uptimeSeconds = Math.floor(process.uptime())
    const upH = Math.floor(uptimeSeconds / 3600)
    const upM = Math.floor((uptimeSeconds % 3600) / 60)
    const upS = uptimeSeconds % 60
    const runtime = `${upH}h ${upM}m ${upS}s`

    const botMode = configManager.config.botMode || 'public'
    const modeLabel =
        botMode.charAt(0).toUpperCase() + botMode.slice(1)

    const t = `
*╭┈───〔 ${BOT_NAME} 〕┈───⊷*
*├✦ Owner:* ${OWNER_NAME}
*├✦ Commands:* 73
*├✦ Runtime:* ${runtime}
*├✦ Prefix:* ${prefix}
*├✦ Mode:* ${modeLabel}
*├✦ Version:* 1.0.0
*╰───────────────────⊷*

『 🧸 Menu 』
╭───────────────────⊷
┋ ⬡ ${prefix}menu
┋ ⬡ ${prefix}alive
┋ ⬡ ${prefix}runtime
╰───────────────────⊷

『 🛠️ Tools 』
╭───────────────────⊷
┋ ⬡ ${prefix}ping
┋ ⬡ ${prefix}getid
┋ ⬡ ${prefix}sudo
┋ ⬡ ${prefix}tourl
┋ ⬡ ${prefix}owner
┋ ⬡ ${prefix}fancy
┋ ⬡ ${prefix}update
┋ ⬡ ${prefix}device
┋ ⬡ ${prefix}delsudo
┋ ⬡ ${prefix}getsudo
┋ ⬡ ${prefix}depair
┋ ⬡ ${prefix}sessions
╰───────────────────⊷

『 ⚙️ Config 』
╭───────────────────⊷
┋ ⬡ ${prefix}online
┋ ⬡ ${prefix}welcome
┋ ⬡ ${prefix}autotype
┋ ⬡ ${prefix}autoreact
┋ ⬡ ${prefix}setprefix
┋ ⬡ ${prefix}getconfig
┋ ⬡ ${prefix}statuslike
┋ ⬡ ${prefix}autorecord
┋ ⬡ ${prefix}private
┋ ⬡ ${prefix}public
╰───────────────────⊷

『 👥 Group 』
╭───────────────────⊷
┋ ⬡ ${prefix}bye
┋ ⬡ ${prefix}kick
┋ ⬡ ${prefix}purge
┋ ⬡ ${prefix}mute
┋ ⬡ ${prefix}unmute
┋ ⬡ ${prefix}promote
┋ ⬡ ${prefix}demote
┋ ⬡ ${prefix}gclink
┋ ⬡ ${prefix}antilink
┋ ⬡ ${prefix}kickall
┋ ⬡ ${prefix}promoteall
┋ ⬡ ${prefix}demoteall
╰───────────────────⊷

『 🎥 Media 』
╭───────────────────⊷
┋ ⬡ ${prefix}vv
┋ ⬡ ${prefix}take
┋ ⬡ ${prefix}save
┋ ⬡ ${prefix}photo
┋ ⬡ ${prefix}setpp
┋ ⬡ ${prefix}grtpp
┋ ⬡ ${prefix}toaudio
┋ ⬡ ${prefix}sticker
┋ ⬡ ${prefix}logo
┋ ⬡ ${prefix}aigen
┋ ⬡ ${prefix}telegram
╰───────────────────⊷

『 🔍 Search 』
╭───────────────────⊷
┋ ⬡ ${prefix}ask <question>
┋ ⬡ ${prefix}wiki-en <topic>
┋ ⬡ ${prefix}wiki-fr <topic>
╰───────────────────⊷

『 📥 Download 』
╭───────────────────⊷
┋ ⬡ ${prefix}img
┋ ⬡ ${prefix}play
┋ ⬡ ${prefix}tiktok
┋ ⬡ ${prefix}ig
┋ ⬡ ${prefix}apk
┋ ⬡ ${prefix}song
┋ ⬡ ${prefix}video
┋ ⬡ ${prefix}fb
┋ ⬡ ${prefix}dl-xdown <url>
╰───────────────────⊷

『 🆕 New 』
╭───────────────────⊷
┋ ⬡ ${prefix}jid
┋ ⬡ ${prefix}groupinfo
┋ ⬡ ${prefix}admins
┋ ⬡ ${prefix}members
┋ ⬡ ${prefix}botinfo
┋ ⬡ ${prefix}calc
┋ ⬡ ${prefix}quote
┋ ⬡ ${prefix}help
╰───────────────────⊷

『 🏷️ Tags 』
╭───────────────────⊷
┋ ⬡ ${prefix}tag
┋ ⬡ ${prefix}tagadmin
┋ ⬡ ${prefix}tagall
┋ ⬡ ${prefix}settag
┋ ⬡ ${prefix}response
╰───────────────────⊷

${WA_CHANNEL ? `『 📢 CHANNEL 』\n${WA_CHANNEL}\n` : ''}

*⟪ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 ${OWNER_NAME} ⟫*
`;

    await client.sendMessage(remoteJid, {
        image: fs.readFileSync(
            path.join(process.cwd(), 'menu.jpg')
        ),
        caption: t,
        quoted: message
    })

    await client.sendMessage(remoteJid, {
        audio: { url: 'menu.mp3' },
        mimetype: 'audio/mpeg',
        ptt: false,
        quoted: message
    })
}

export default info
