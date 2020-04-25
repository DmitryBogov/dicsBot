var express = require('express');
var app = express();
var request = require('request')
const fs = require('fs');

const config = require('./config.json');
const lib = require('./lib');
const Discord = require('discord.js');

const q_postfix = config.quite_postfix;
const m_postfix = config.mem_postfix;

const token = config.token;
const prefix = config.prefix;
const memDowloadTime = config.memDowloadTime;
const client = new Discord.Client();

var qutes =[];
var quotes = fs.readFileSync('quote.txt').toString().split("\n");

function randQuote(q) {
  return q[Math.floor(Math.random() * (quotes.length - 0)) + 0] ;
}




client.login(token);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
  if (msg.content === 'ping') {
      msg.reply('pong');

  }
  if (msg.content === prefix + "help") {

      msg.channel.send("!mem - пришлю мем \n!c - пришлю цитату");

  }


  if (msg.content === prefix + q_postfix) {
    msg.reply(randQuote(quotes));
  }

  if (msg.content === prefix + m_postfix) {
   var link = ''
   request('http://joyreactor.cc/random', (err, response, body) => {
    link = lib.parsJoyReact(body);
   });

    setTimeout(function () {
        //msg.reply(link) Отправка с ссылкой
        var attachment = new Discord.MessageAttachment(link);
        msg.channel.send(attachment); // отправка без текста сообщения
       console.log(link);
    }, memDowloadTime);
  }

});




app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
