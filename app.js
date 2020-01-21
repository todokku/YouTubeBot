const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')
if (!process.env.PRODUTION){
    require('dotenv').config()
}

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function getYoutubeStatistics(channel_id, api_key){
    try {
      const statistics_data= await axios.get('https://www.googleapis.com/youtube/v3/channels',{
                  params: {
                    part:'statistics',
                    id: channel_id,
                    key:api_key
                  }});
      return statistics_data.data
    } catch (e) {
        console.error(e)
    }
}

if (!TELEGRAM_API_KEY || !YOUTUBE_API_KEY || !CHANNEL_ID || !TELEGRAM_CHAT_ID){
    console.error("No api key. Check env");
} else {
    const bot = new TelegramBot(TELEGRAM_API_KEY);
    getYoutubeStatistics(CHANNEL_ID, YOUTUBE_API_KEY).then(
        (res) =>  bot.sendMessage(TELEGRAM_CHAT_ID, 
            `Подписчитков ${res.items[0].statistics.subscriberCount}, всего просмотров ${res.items[0].statistics.viewCount}`)
    ).catch(
        (e)=> console.error(e)
    )
}