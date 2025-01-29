const { default: axios } = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN; 
const USER_ID = process.env.USER_ID;
const bot = new Telegraf(BOT_TOKEN);

bot.telegram.setMyCommands([
{ command: 'start', description: 'Start the bot' },
]);

bot.start((ctx) => {
  ctx.reply(
    `<b>🏆 Welcome to WagerAI 🏆</b>\n\n` +
    `Expert sports betting insights powered by A.I Confidence.\n\n` +
    `Select what you would like to explore below.`
    , 
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {text: '🏈 NFL', callback_data: 'NFL'},
            {text: '⚽ Soccer', callback_data: 'Soccer'},
          ],
          [
            {text: '🏀 NBA', callback_data: 'NBA'},
            {text: '🏒 NHL', callback_data: 'NHL'},
          ],
          [
            {text: '⚾ MLB', callback_data: 'MLB'},
            {text: '🥊 UFC/MMA', callback_data: 'UFC/MMA'},
          ],
          [
            {text: '💡 MISC', callback_data: 'MISC'},
            {text: '👑 Premium', callback_data: 'Premium'},
          ]
        ]
      }
    }
  );
});
bot.action('start', (ctx) => {
  ctx.editMessageText(
    `<b>🏆 Welcome to WagerAI 🏆</b>\n\n` +
    `Expert sports betting insights powered by A.I Confidence.\n\n` +
    `Select what you would like to explore below.`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏈 NFL', callback_data: 'NFL' },
            { text: '⚽ Soccer', callback_data: 'Soccer' },
          ],
          [
            { text: '🏀 NBA', callback_data: 'NBA' },
            { text: '🏒 NHL', callback_data: 'NHL' },
          ],
          [
            { text: '⚾ MLB', callback_data: 'MLB' },
            { text: '🥊 UFC/MMA', callback_data: 'UFC/MMA' },
          ],
          [
            { text: '💡 MISC', callback_data: 'MISC' },
            { text: '👑 Premium', callback_data: 'Premium' },
          ]
        ]
      }
    }
  );
});

bot.action('NFL', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log('info :>> ', info.data);
    // await ctx.editMessageMedia({
    //   type:'photo',
    //   media:'blob:https://web.telegram.org/f10b0123-6a73-4f92-973e-2e20e56440eb',
    //   caption:'hello'
    // });
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a 🏈 NFL event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `NFL:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `🏈 NFL Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action('Soccer', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a ⚽ NFL event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `Soccer:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `⚽ NFL Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action('NBA', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a 🏀 NBA event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `NBA:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `🏀 NBA Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action('NHL', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/icehockey_nhl/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a 🏒 NHL event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `NHL:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `🏒 NHL Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action('MLB', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/baseball_mlb/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a ⚾ MLB event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `MLB:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `⚾ MLB Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action('UFC/MMA', async (ctx) => {
  try {
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    if(info.data.length != 0)
      await ctx.editMessageText(
        `Select a 🥊 UFC/MMA event to view predictions: \n`
        ,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              ...info.data.map((match, index) => {
                return [{
                  text: `${index + 1}. ${match.home_team.split(' ').at(-1)}  vs  ${match.away_team.split(' ').at(-1)} (${new Date(match.commence_time).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} EST)`,
                  callback_data: `UFC:${index + 1}`
                }];
              }),
              [
                {text: '⬅️ Back to Games', callback_data: 'start'},
                {text: '🧐 Prediction', callback_data: 'prediction'},
              ],
            ]
          }
        }
      )
    else await ctx.editMessageText(
      `🥊 UFC/MMA Games Upcoming Soon \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'start'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^NFL:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'NFL'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^Soccer:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'Soccer'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^NBA:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'NBA'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^NHL:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/icehockey_nhl/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'NHL'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^MLB:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/baseball_mlb/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'MLB'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.action(/^UFC:\d+$/, async (ctx) => {
  try {
    const index = ctx.callbackQuery.data.split(':')[1];
    const info = await axios.get('https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/events?apiKey=1caa56bfd18b0f4c1f6dd37a2a0b7bd2')
    // console.log(info.data[index - 1])
    await ctx.editMessageText(
      `🏆 ${info.data[index - 1].home_team} vs ${info.data[index - 1].away_team} \n`
      ,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {text: '⬅️ Back to Games', callback_data: 'UFC/MMA'},
              {text: '🧐 Prediction', callback_data: 'prediction'},
            ],
          ]
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})

bot.launch();

process.once('SIGINT', () => {
    bot.stop('SIGINT');
    console.log("Bot stopped.");
});
  
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    console.log("Bot stopped.");
});
