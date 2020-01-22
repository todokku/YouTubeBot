const TelegramBot = require('node-telegram-bot-api');
const { YoutubeDataAPI } = require("youtube-v3-api")

if (!process.env.PRODUTION){
    require('dotenv').config()
}

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SEARCH_Q = process.env.QUERY

async function getTopVideos(api_key, query){
   let now = new Date();
   now.setDate(now.getDate()-1);
   const search_params = {order:'viewCount',
                          type:'video',
                          videoCategoryId:'27',
                          publishedAfter: now.toISOString(),
                          relevanceLanguage:'ru',
                          regionCode:'RU'
                        }
   let search_results = await api.searchAll(query,10,search_params);
   for (item of search_results.items) {
       let video_params = {}
       let video_result = await api.searchVideo(item.id.videoId);
   }
}

const api = new YoutubeDataAPI(YOUTUBE_API_KEY);
let now = new Date();
now.setDate(now.getDate()-1);
api.searchAll('программирование|IT|создать|DIY|Arduino|ESP8266|python|js|lua|игру',10, 
              {order:'viewCount',type:'video', videoCategoryId:'27',
              publishedAfter: now.toISOString(),
              relevanceLanguage:'ru', regionCode:'RU'}).then(
              ).then(
                 (r)=>console.log(r.items[0])
              ).catch(
                  (e)=> console.log(e)
              )





