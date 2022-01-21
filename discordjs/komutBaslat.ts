import { Client } from 'discord.js'
import fs from 'fs'
import Files from './file'
import veri from '../database/veriler'

export default (client: Client) => {
    const commands = {} as {
        [key: string]: any
    }
    const komutBaslat = Files('./komutlar', '.ts')
    console.log(komutBaslat)

    for (const command of komutBaslat) {
        let commandFile = require(command)
        if(commandFile.default) commandFile = commandFile.default

        const split = command.replace(/\\/g, '/').split('/')
        const commandName = split[split.length - 1].replace('.ts', '')
        commands[commandName.toLowerCase()] = commandFile
    }

    console.log(commands)

    client.on('messageCreate', (message) => {
        if(message.author.bot || !message.content.startsWith(veri.prefix)) return;
        const args = message.content.slice(1).split(/ +/)
        const commandName = args.shift()!.toLowerCase()
        if(!commands[commandName]) return;
        try {
            commands[commandName].callback(message, ...args)
        } catch (error) {
            console.log(error)
        }
    })
}