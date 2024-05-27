module.exports={
    name: 'roll',
    description: 'lance un dès.',
    execute(message, args){
        

        if(!args[0]){
            result = Math.floor(Math.random() * 101)
            message.channel.send(result)
            return
        }else if((isNaN(args[0])) || (args[0] == 0)) {
            return message.channel.send("<:sah:871410452758941727>");
        }else{
            result = Math.floor(Math.random() * ++args)
            if(result===0){
                return message.reply("0 tu as perdu khey. <:sah:871410452758941727>");

            }else{
                message.channel.send(result);
                return
            }
            
        }
        
        
    }
}