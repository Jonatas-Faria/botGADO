const Discord = require("discord.js");
const Sequelize = require('sequelize');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();

bot.login(token);

var adj = [
    "lindo(a)",
    "horroroso(a)",
    "estranho(a)",
    "princeso(a)",
    "gado(a) master",
    "namorado(a) do adm",
    "bobo(a) da corte",
    "crackudo(a)",
    "maloka",
    "e-girl",
    "cachorrinho(a) do adm"
];

var adjr = [
    "lindo(a) ♥",
    "cheiroso(a) ♥",
    "bonita(a) ♥",
    "princeso(a) ♥",
    "um amor ♥",
    "filho(a) de pastor ♥",
    "fã da marvel ♥",
    "belo(a) ♥",
    "incrível ♥",
    "perfeito(a) ♥",
    "deuso(a) ♥"
];

var vod = [
    " você será desafiado!",
    " nos conte uma verdade."
]

bot.on('message', msg => {
    if(msg.content === `${prefix}gado`){
        msg.reply(" é um gado");
    }
})

bot.on('message', msg => {
    min = Math.ceil(0);
    max = Math.floor(adj.length - 1);
    num = Math.floor(Math.random() * (max - min + 1)) + min;

    if(msg.author.username === "eu r"){
        msg.reply(" você é: " + adjr[num]);
    }

    if(msg.content === `${prefix}adj` && msg.author.username != "eu r"){
        msg.reply(" você é: " + adj[num]);
    }
   
})

bot.on('message', msg => {
    
    min = Math.ceil(0);
    max = Math.floor(vod.length - 1);
    num = Math.floor(Math.random() * (max - min + 1)) + min;

    if(msg.content === `${prefix}vod`){    
        msg.reply(vod[num]);   
    }
})

bot.on('message', msg => {

    if(msg.content === `${prefix}ajuda`){    
        msg.channel.send(
            "!ajuda = ajuda uai\n"            +
            "!vod = verdade ou desafio\n"   +
            "!adj = adjetivo sorteado"          
        );   
    }
})

bot.on('message', msg => {
    if (msg.content === `${prefix}user-info`) {
        msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////

const PREFIX = '?';

//config
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});



//tabela
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: Sequelize.INTEGER,
	coins: Sequelize.DOUBLE,
    level: Sequelize.INTEGER,
	username: Sequelize.STRING,
    beers: Sequelize.INTEGER,
    flowers: Sequelize.INTEGER,
    counter: Sequelize.INTEGER,
    counterTransferFlo: Sequelize.INTEGER,
    counterTransferCer: Sequelize.INTEGER,
    gadStars: Sequelize.INTEGER
});

bot.once('ready', () => {
	User.sync();
});

bot.on('message', async message => {

    const userId = message.author.id;
    const user = await User.findOne({ where: { userId: userId} });

   

        if (message.content.startsWith(PREFIX)) {
            const input = message.content.slice(PREFIX.length).trim().split(' ');
            const command = input.shift();
            const commandArgs = input.join(' ');
    
    
            if (command === 'registrar') {
                const userId = message.author.id;
                const user = await User.findOne({ where: { userId: userId} });
                ///addtag
                //const splitArgs = commandArgs.split(' ');
                //const tagName = splitArgs.shift();
                //const tagDescription = splitArgs.join(' ');
                if(user){
                    message.reply(" certeza que eu ja te vi aqui... 🤔 🙃 🧐")
                }else{
    
                    try {
    
                        const user = await User.create({
                            userId: message.author.id,
                            coins: 100,
                            flowers: 0,
                            beers: 0,
                            level: 0,
                            gadStars: 0,
                            username: message.author.username,
                        });
                        return message.reply(` você foi cadastrado(a). 👍`);
        
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return message.reply(' Algo deu errado, você já está cadastrado.');
                        }
                        return message.reply(' Algo deu errado desculpe pelo transtorno meretíssimo(a).');
                    }
    
                }
                
                
                
    
            } else if (command === 'status') {

                if(user){



                    const card = new Discord.MessageEmbed();
                    card.setColor('#8925cb');
                    card.setTitle(' ― ― ― ― ― — — — ' +
                                '\nSeu extrato de Gado(a)\n' 
                                
                                );
                    
                    const userId = message.author.id;
        
                    const user = await User.findOne({ where: { userId: userId} });
        
                    message.author.username
        
                    card.setAuthor(message.author.username + " 🏷️ - id: " + user.get('id'), message.author.avatarURL());
        
                    var level = "";

                    const gadStarsList = [
                        "☆☆☆☆☆",
                        "⭐☆☆☆☆",
                        "⭐⭐☆☆☆",
                        "⭐⭐⭐☆☆",
                        "⭐⭐⭐⭐☆",
                        "⭐⭐⭐⭐⭐",
                        "🤘",
                        "🤘🤘",
                        "🤘🤘🤘",
                        "🐂"
                    ]
                    
        
                    ///buscarTag
                    //const userName = commandArgs;
                    
        
                    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
                    
                    if (user) {
                        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                        //tag.increment('usage_count');
                        card.addFields(
                            {name: "― ― ― ― ― — — — — \nCoins", value: "💸: " + user.get('coins').toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})},
                            {name: "― ― ― ― ― — — — — \nFlores", value: "💐: " + user.get('flowers')},
                            {name: "― ― ― ― ― — — — — \nCervejas", value: "🍺: " + user.get('beers')},
                        );
        
                        level = user.get('level').toString();

                        var gadStars = gadStarsList[user.get('gadStars')];
        
                        card.setFooter(
                            "level: " + level + "\n" + 
                            "gadStars: " + gadStars
                        );
        
                        return message.channel.send(card);
                    }
                    return message.reply(` Algo deu errado na busca aqui perdoa nóis.`);




                }else{
                    message.reply(' nunca te vi por aqui. Cadastre-se\n\n?registrar');
                }
    
                
    
    
            }else if(command === "buy"){

                if(user){

                const splitArgs = commandArgs.split(' ');
                const product = splitArgs.shift();
                const userId = message.author.id;
    
                const user = await User.findOne({ where: { userId: userId} });
                const coins = user.get('coins');
                const flowers = user.get('flowers');
                const beers = user.get('beers');
    
                if(product === "f"){
                    if(coins < 100){
                        message.reply(" você não tem dinheiro suficiente 😥.\n-> Flores custam R$ 100,00\n-> Você tem: " + coins.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
                    }else{
                        const coinsChanges = await User.update({ coins: coins - 100 }, { where: { userId: userId } });
                        const flowersChanges = await User.update({ flowers: flowers + 1 }, { where: { userId: userId } });
                        if (coinsChanges > 0 && flowersChanges > 0) {
                            return message.reply(` você comprou uma flor! 💐`);
                        }
                        return message.reply(` não foi possível fazer a compra da flor. 😥`);
                    }
                }else if(product === "c"){
                    if(coins < 50){
                        message.reply(" você não tem dinheiro suficiente 😥.\n-> Cervejas custam R$ 50,00\n-> Você tem: " + coins.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
                    }else{
                        const coinsChanges = await User.update({ coins: coins - 50 }, { where: { userId: userId } });
                        const flowersChanges = await User.update({ beers: beers + 1 }, { where: { userId: userId } });
                        if (coinsChanges > 0 && flowersChanges > 0) {
                            return message.reply(` você comprou uma cerveja! 🍺`);
                        }
                        return message.reply(` não foi possível fazer a compra da cerveja. 😥`);
                    }
                }


                }else{
                    message.reply(' nunca te vi por aqui. Cadastre-se\n\n?registrar');
                }

            }else if(command === "transfer"){


                if(user){
                const splitArgs = commandArgs.split(' ');
                const userTransfer = splitArgs.shift().parseInt;
                const itemTransfer = splitArgs.join(' ');
                const userId = message.author.id;
    
                const user = await User.findOne({ where: { userId: userId} });
    
                const coins = user.get('coins');
                const flowers = user.get('flowers');
                const gadStars = user.get('gadStars');
                const beers = user.get('beers');
    
                if(userTransfer == undefined){
                    message.reply(" esse usuário não existe 😥.");
                }else{
    
                    if(itemTransfer === "f"){
    
                        if(flowers < 1){
                            message.reply(" você não tem flores suficiente 😥.");
                        }else{
                            const flowersChanges = await User.update({ flowers: flowers - 1 }, { where: { userId: userId } });
                            const flowersTransfer = await User.update({ flowers: flowers + 1 }, { where: { id: userTransfer } });
                            if (flowersTransfer > 0 && flowersChanges > 0) {

                                const counterTransfer = user.get('counterTransferFlo');
                                const addCounter = await User.update({ counterTransferFlo: counterTransfer + 1 }, { where: { userId: userId } });

                                if(counterTransfer == 5){
                                    const resetCounter = await User.update({ counterTransferFlo: 0 }, { where: { userId: userId } });
                                    if(user.get('gadStars') < 9){
                                        const addGadStars = await User.update({ gadStars: gadStars + 1 }, { where: { userId: userId } });
                                    }
                                }
                                
                                return message.reply(` deu uma flor! 💐`);
                            }
                            return message.reply(` não foi possível fazer a transferência da flor. 😥`);
                        }
        
                    }else if(itemTransfer === "c"){
        
                        if(beers < 1){
                            message.reply(" você não tem cervejas suficiente 😥.");
                        }else{
                            const beersChanges = await User.update({ beers: beers - 1 }, { where: { userId: userId } });
                            const beersTransfer = await User.update({ beers: beers + 1 }, { where: { id: userTransfer } });
                            if (beersTransfer > 0 && beersChanges > 0) {

                                const counterTransfer = user.get('counterTransferCer');
                                const addCounter = await User.update({ counterTransferCer: counterTransfer + 1 }, { where: { userId: userId } });

                                if(counterTransfer == 5){
                                    const resetCounter = await User.update({ counterTransferCer: 0 }, { where: { userId: userId } });
                                    if(user.get('gadStars') > 0){
                                        const remGadStars = await User.update({ gadStars: gadStars - 1 }, { where: { userId: userId } });
                                    }
                                }

                                return message.reply(` deu uma cerveja! 🍺`);
                            }
                            return message.reply(` não foi possível fazer a transferência da cerveja. 😥`);
                        }
                    }
    
                }
    
                }else{
                    message.reply(' nunca te vi por aqui. Cadastre-se\n\n?registrar');
                }
    
            }

    

    
	
        
        /*else if (command === 'edittag') {
			
            ///editar tag
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagDescription = splitArgs.join(' ');
            
            // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
            const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(`Tag ${tagName} was edited.`);
            }
            return message.reply(`Could not find a tag with name ${tagName}.`);


		} else if (command === 'taginfo') {
			

            ///exibir de uma tag especif
            const tagName = commandArgs;

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Tags.findOne({ where: { name: tagName } });
            if (tag) {
                return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
            }
            return message.reply(`Could not find tag: ${tagName}`);


		} else if (command === 'showtags') {

            ///listando tooodas as tags
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
            return message.channel.send(`List of tags: ${tagString}`);


		} else if (command === 'removetag') {
        
            ///excluindo 1 tag
            const tagName = commandArgs;
            // equivalent to: DELETE from tags WHERE name = ?;
            const rowCount = await Tags.destroy({ where: { name: tagName } });
            if (!rowCount) return message.reply('That tag did not exist.');
            
            return message.reply('Tag deleted.');

		}*/
	}else{

        const userId = message.author.id;

        
        const user = await User.findOne({ where: { userId: userId} });
        if(user){

            const coins = user.get('coins');
            const counter = user.get('counter');
            const level = user.get('level');

            const addCounter = await User.update({ counter: counter + 1 }, { where: { userId: userId } });

            if(counter == 10){
                const resetCounter = await User.update({ counter: 0 }, { where: { userId: userId } });
                const addCoins = await User.update({ coins: coins + 5 + (level * (coins * .20))}, { where: { userId: userId } });
                const addLevel = await User.update({ level: level + 1 }, { where: { userId: userId } });
            }

        }
        
    }
});


//
//User
//IdUser
//level
//coins - initial = 100
//flowers = 100 coins | initial= 0
//beer = 50 coins | initial = 0
//ganha coins ao mandar mensagens
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//