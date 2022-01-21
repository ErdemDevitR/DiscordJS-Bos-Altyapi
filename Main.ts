import Discord, { Intents, Client} from 'discord.js'
import veri from './database/veriler'

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', () => {
    let komutlar = require('./discordjs/events/komutBaslat')
    if(komutlar.default) komutlar = komutlar.default

    komutlar(client)
})

client.login(veri.token)