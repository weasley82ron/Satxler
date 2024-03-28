const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: true,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix;

        const ANTINUKE = new MessageButton()
            .setEmoji('<:Satxler_antinuke:1181289584483643433>')
            .setCustomId('antinuke')
            .setStyle('DANGER'); 
            const MOD = new MessageButton()
            .setEmoji('<:Satxler_moderator:1181290384576491561>')
            .setCustomId('mod')
            .setStyle('DANGER'); 
            const INFO = new MessageButton()
            .setEmoji('<:Satxler_utility:1181291761667149886>')
            .setCustomId('info')
            .setStyle('DANGER'); 
            const WELCOME = new MessageButton()
            .setEmoji('<:Satxler_autorole:1181290290238210158>')
            .setCustomId('welcomer')
            .setStyle('DANGER'); 
            const VOICE = new MessageButton()
            .setEmoji('<:Satxler_mic:1181294198046072994>')
            .setCustomId('voice')
            .setStyle('DANGER'); 
            const CUSTOM = new MessageButton()
            .setEmoji('<:Customrole:1199024011045253140>')
            .setCustomId('customrole')
            .setStyle('DANGER'); 
            const LOGS = new MessageButton()
            .setEmoji('<:logs:1200416495461732353>')
            .setCustomId('logging')
            .setStyle('DANGER'); 
            const AUTOMOD = new MessageButton()
            .setEmoji('<:Satxler_Automod:1205791245473943553>')
            .setCustomId('automod')
            .setStyle('DANGER'); 
            const ALL = new MessageButton()
            .setLabel('All Commands')
            .setCustomId('all')
            .setStyle('SUCCESS'); 
        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);
        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder(`❯ ${client.user.username} Get Started!`)
                .addOptions([
                  {
                      label: ' AntiNuke',
                      description: 'Get All AntiNuke Command List',
                      value: 'first',
                      emoji: '<:Satxler_antinuke:1181289584483643433>'
                  },
                  {
                      label: ' Moderation',
                      description: 'Get All Moderation Command List',
                      value: 'second',
                      emoji: '<:Satxler_moderator:1181290384576491561>'
                  },
                  {
                      label: 'Utility',
                      description: 'Get All Utility Command List',
                      value: 'third',
                      emoji: '<:Satxler_utility:1181291761667149886>'
                  },
                  {
                      label: 'Welcomer',
                      description: 'Get All Welcomer Command List',
                      value: 'fourth',
                      emoji: '<:Satxler_autorole:1181290290238210158>'
                  },
                  {
                      label: 'Voice',
                      description: 'Get All Voice Command List',
                      value: 'fifth',
                      emoji: '<:Satxler_mic:1181294198046072994>'
                  },
                  {
                      label: 'Customrole',
                      description: 'Get All Customrole Command List',
                      value: 'six',
                      emoji: '<:Customrole:1199024011045253140>'
                  },
                  {
                      label: 'Logger',
                      description: 'Get All Logger Command List',
                      value: 'seven',
                      emoji: '<:logs:1200416495461732353>'
                  },
                  {
                      label: 'Automod',
                      description: 'Get All Automod Command List',
                      value: 'eight',
                      emoji: '<:Satxler_Automod:1205791245473943553>'
                  }
              ])
        );

        const embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(client.user.displayAvatarURL({ dynamic : true}))
            .setDescription(
                `<:satx_dot:1222728929396396114> Prefix for this server \`${prefix}\`\n<:satx_dot:1222728929396396114>  Total Commands: \`${client.commands.size}\`**\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/zB6qdkETXr )**\nType \`${prefix}antinuke enable\` to get started up!`
            )
            .addField(
                'Command Category',
                `**<:Satxler_antinuke:1181289584483643433> \`:\` AntiNuke\n<:Satxler_moderator:1181290384576491561>  \`:\` Moderation\n<:Satxler_utility:1181291761667149886> \`:\` Utility\n<:Satxler_autorole:1181290290238210158> \`:\` Welcomer\n<:Satxler_mic:1181294198046072994> \`:\` Voice**\n<:Customrole:1199024011045253140> \`:\` **Customrole**\n<:logs:1200416495461732353> \`:\` **Logger**\n<:Satxler_Automod:1205791245473943553> \`:\` **Automod**\n\n\`Choose A Category To Get All Commands List\``
            );

        const helpMessage = await message.channel.send({ embeds: [embed], components: [row, row2 ,row3] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user && i.isButton(),
            time: 60000
        });
        collector.on('collect', async (i) => {
            if (i.user.id !== message.author.id)
                return i.reply({
                    content: `Only ${message.author} Can Use This Intraction`,
                    ephemeral: true
                });
            if (i.isButton()) {
                if (i.customId == 'antinuke') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'security')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                            `**<:Satxler_antinuke:1181289584483643433> Antinuke \`[${_commands.length}]\`**`,
                            _commands.sort().join(', ')
                        )

                    ANTINUKE.setDisabled(true);
                    MOD.setDisabled(false);
                    INFO.setDisabled(false);
                    WELCOME.setDisabled(false);
                    VOICE.setDisabled(false);
                    CUSTOM.setDisabled(false);
                    LOGS.setDisabled(false);
                    AUTOMOD.setDisabled(false);
                    ALL.setDisabled(false);
                    const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);
                    const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
                    if (helpMessage)
                    return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                } if (i.customId == 'mod') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                                `**<:Satxler_moderator:1181290384576491561> Moderation \`[${_commands.length}]\`**`,
                                _commands.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(true);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);

                    if (helpMessage)
                    return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                } if (i.customId == 'info') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                                `**<:Satxler_utility:1181291761667149886> Utility \`[${_commands.length}]\`**`,
                                _commands.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(true);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);


                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);    
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
             
                   if (helpMessage)
                   return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                } if (i.customId == 'welcomer') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                                `**<:Satxler_autorole:1181290290238210158> Welcomer \`[${_commands.length}]\`**`,
                                _commands.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(true);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]); 
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
         
                      if (helpMessage)
                      return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                } if (i.customId == 'voice') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'voice')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                                `**<:Satxler_mic:1181294198046072994> Voice \`[${_commands.length}]\`**`,
                                _commands.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(true);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);


                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);  
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
     
                     if (helpMessage)
                     return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                } if (i.customId == 'customrole') {
        
                    i.deferUpdate(); 

                    const em = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setThumbnail(i.guild.iconURL({ dynamic: true }))
                        .setColor(client.color)
                    let cmd = [];
                    client.commands
                        .filter((x) => x.category && x.category === 'customrole')
                        .forEach((x) => {
                            cmd.push(`\`${x.name}\``);
                            if (x.subcommand.length) {
                                x.subcommand.forEach((y) => {
                                    cmd.push(`\`${x.name} ${y}\``);
                                });
                            }
                        });
                
                    em.addField(`**<:Customrole:1199024011045253140> Customrole \`[${cmd.length}]\`**`, cmd.sort().join(', '));                

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(true);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);       
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);

                     if (helpMessage)
                     return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                }  if (i.customId == 'logging') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })

                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        _commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``)
                            em.addField(
                                `**<:logs:1200416495461732353> Logging  \`[${_commands.length}]\`**`,
                                _commands.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(true);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(false);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);  
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
     
                     if (helpMessage)
                     return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                }  if (i.customId == 'automod') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    let _commands
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        em.setThumbnail(
                            i.guild.iconURL({
                                dynamic: true
                            })
                        )
                        em.setColor(client.color)
                        let cmd = []
                        client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .forEach((x) => {
                                cmd.push(`\`${x.name}\``)
                                if (x.subcommand.length) {
                                    x.subcommand.forEach((y) => {
                                        cmd.push(`\`${x.name} ${y}\``)
                                    })
                                }
                            })
                            em.addField(
                            `**<:Satxler_Automod:1205791245473943553> Automod \`[${cmd.length}]\`**`,
                            cmd.sort().join(', ')
                        )

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(true);
                        ALL.setDisabled(false);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);  
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
     
                     if (helpMessage)
                     return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                 } if (i.customId == 'all') {
                    i.deferUpdate();
        
                    const em = new MessageEmbed()
                    em.setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        
                        em.setThumbnail(client.user.displayAvatarURL({ dynamic : true}))

                        em.setColor(client.color)
                        _commands = client.commands
                        .filter((x) => x.category && x.category === 'security')
                        .map((x) => `\`${x.name}\``)
                        em.addField(
                        `**<:Satxler_antinuke:1181289584483643433> Antinuke \`[${_commands.length}]\`**`,
                        _commands.sort().join(', ')
                    )
                    _commands = client.commands
                        .filter((x) => x.category && x.category === 'mod')
                        .map((x) => `\`${x.name}\``)
                        em.addField(
                            `**<:Satxler_moderator:1181290384576491561> Moderation \`[${_commands.length}]\`**`,
                            _commands.sort().join(', ')
                    )
                    _commands = client.commands
                    .filter((x) => x.category && x.category === 'info')
                    .map((x) => `\`${x.name}\``)
                    em.addField(
                        `**<:Satxler_utility:1181291761667149886> Utility \`[${_commands.length}]\`**`,
                        _commands.sort().join(', ')
                )                       
                 _commands = client.commands
                .filter((x) => x.category && x.category === 'welcomer')
                .map((x) => `\`${x.name}\``)
                em.addField(
                    `**<:Satxler_autorole:1181290290238210158> Welcomer \`[${_commands.length}]\`**`,
                    _commands.sort().join(', ')
            )
            _commands = client.commands
            .filter((x) => x.category && x.category === 'voice')
            .map((x) => `\`${x.name}\``)
            em.addField(
                `**<:Satxler_mic:1181294198046072994> Voice \`[${_commands.length}]\`**`,
                _commands.sort().join(', ')
        )
        let cmd = [];
        client.commands
            .filter((x) => x.category && x.category === 'customrole')
            .forEach((x) => {
                cmd.push(`\`${x.name}\``);
                if (x.subcommand.length) {
                    x.subcommand.forEach((y) => {
                        cmd.push(`\`${x.name} ${y}\``);
                    });
                }
            });
    
        em.addField(`**<:Customrole:1199024011045253140> Customrole \`[${cmd.length}]\`**`, cmd.sort().join(', '));

        _commands = client.commands
        .filter((x) => x.category && x.category === 'logging')
        .map((x) => `\`${x.name}\``)
        em.addField(
            `**<:logs:1200416495461732353> Logging  \`[${_commands.length}]\`**`,
            _commands.sort().join(', ')
    ) 
    let cmdd = [];

     client.commands
    .filter((x) => x.category && x.category === 'automod')
     .forEach((x) => {
        cmdd.push(`\`${x.name}\``)
        if (x.subcommand.length) {
            x.subcommand.forEach((a) => {
                cmdd.push(`\`${x.name} ${a}\``)
            })
        }
    })
    em.addField(
    `**<:Satxler_Automod:1205791245473943553> Automod \`[${cmdd.length}]\`**`,
    cmdd.sort().join(', ')
)

                        ANTINUKE.setDisabled(false);
                        MOD.setDisabled(false);
                        INFO.setDisabled(false);
                        WELCOME.setDisabled(false);
                        VOICE.setDisabled(false);
                        CUSTOM.setDisabled(false);
                        LOGS.setDisabled(false);
                        AUTOMOD.setDisabled(false);
                        ALL.setDisabled(true);

                        const row2 = new MessageActionRow().addComponents([ANTINUKE,MOD,INFO,WELCOME,VOICE]);  
                        const row3 = new MessageActionRow().addComponents([CUSTOM,LOGS,AUTOMOD,ALL]);
     
                     if (helpMessage)
                     return helpMessage.edit({ embeds: [em], components: [row, row2,row3] });

                }

            }
        })
        collector.on('end', collected => {
            if (collected.size === 0) {
                ANTINUKE.setDisabled(true);
                MOD.setDisabled(true);
                INFO.setDisabled(true);
                WELCOME.setDisabled(true);
                VOICE.setDisabled(true);
                CUSTOM.setDisabled(true);
                LOGS.setDisabled(true);
                AUTOMOD.setDisabled(true);
                ALL.setDisabled(true);
                const row2 = new MessageActionRow().addComponents([ANTINUKE, MOD, INFO, WELCOME, VOICE]);  
                const row3 = new MessageActionRow().addComponents([CUSTOM, LOGS, AUTOMOD, ALL]);
                if (helpMessage) {
                    return helpMessage.edit({ components: [row, row2, row3] });
                }
            }
        });
        
        
     }
    }

