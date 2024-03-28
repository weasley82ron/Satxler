const wait = require('wait')
require('dotenv').config()
require('module-alias/register')
const path = require('path')
const Satxler = require(`./structures/Satxler.js`)
const client = new Satxler()
this.config = require(`${process.cwd()}/config.json`);
(async () => {
    await client.initializeMongoose()
    await client.initializedata()
    await wait(3000);
    (await client.loadEvents()) - (await client.loadlogs())
    await client.loadMain()
    await client.login(this.config.TOKEN)

})()
