const TelegramBot = require("node-telegram-bot-api")
const Debug = require("./helper")
const fs = require('fs')
require("dotenv").config()
const {TOKEN} = process.env




// let keyboard = [
//   [{
//     text: "Menyu",
//     calback_data: "Menyu"
//   },
//   {
//     text: "Savat",
//     calback_data: "Savat"
//   }],

//   [{
//     text: "Kafe Lokatsiyasi",
//     calback_data: "Kafe Lokatsiyasi"
//   },
//   {
//     text: "Buyurtma haqida",
//     calback_data: "Buyurtma haqida"
//   }],

//   [{
//     text: "Fikr Bildirish",
//     calback_data: "Fikr Bildirish"
//   },
//   {
//     text: "Kontaktlar",
//     calback_data: "Kontaktlar"
//   }],
//   [{
//     text: "Sozlamalar",
//     calback_data: "Sozlamalar"
//   }]
// ]






const bot  = new TelegramBot(TOKEN, {
  polling: true,
  polling_interval: 3000
})

let Url = 'https://celebrated-torte-184681.netlify.app/'

let Menyu = [
  [
    {
      text: "Musobaqada ishtirok etish ",
    },
  ],
  [
    {
      text: "Coin yig'ish 🪙",
    },
    {
      text: "Sovg'alar 🎁",
    }
  ]
]


// bot.onText(/\/start/, msg => {
//   const { id } = msg.chat
//       bot.sendMessage(id, "Quyidagilardan birini tanlang 👇🏻", {
//         reply_markup: {
//           keyboard: [
//             [{
//               text:"Taomlar",
//               web_app: {
//                 url: Url
//               }
//             },
//           {
//             text: "Ichimliklar",
//             web_app: {
//               url: Url
//             }
//           }],
//           ]
//         }
//       })
// })

// https://t.me/my_telegram_bot?start=321321546

bot.onText(/\/start (.+)/, (msg, [source, match]) => {
  const { id } = msg.chat
  const InvitorUser = match
  
  const hello = `
 <b>Assalomu alaykum ${msg.from.first_name} Give Away Shoumizda ishtirok etish uchun kanallarni hammasiga obuna bo'ling !💥</b>
  `

  bot.sendMessage(id, hello, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [ 
      //   [{
      //     text: "Kanal 1",
      //     url: "t.me/manguuzbank",
      //   },
      //   {
      //     text: "Kanal 2",
      //     url: "t.me/+G287NeQYX8UzNjky"
      //   },
      // ],
      [
        {
          text: "Kanal 1",
          url: "t.me/SoffHub"
        }
      ],
      [{
        text: "Obunani Tekshirish ✅",
        callback_data: "Check"
      }],
      ]
    }
  })
})

bot.onText(/\/start/, async (msg, [source, match]) => {
  const { id } = msg.chat

  const hello = `
<b>Assalomu alaykum ${msg.from.first_name} Give Away Shoumizda ishtirok etish uchun kanallarni hammasiga obuna bo'ling !💥</b>
  `
  
  const isMember = await checkMembership(id)


  if (isMember) {
    bot.sendMessage(id, "Telefon raqamingizni yuboring" , {
      reply_markup: {
        keyboard: [
          [{
              text: "📞 Raqamni Yuborish ",
              request_contact: true
          }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      }
    })
  }else {
    bot.sendMessage(id, hello, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [ 
        //   [{
        //     text: "Kanal 1",
        //     url: "t.me/manguuzbank",
        //   },
        //   {
        //     text: "Kanal 2",
        //     url: "t.me/+G287NeQYX8UzNjky"
        //   },
        // ],
        [
          {
            text: "Kanal 1",
            url: "t.me/SoffHub"
          }
        ],
        [{
          text: "Obunani Tekshirish ✅",
          callback_data: "Check",
        }],
        ]
      }
    })
  }

 

})

bot.on("callback_query", async query => {
  // console.log(query.message.reply_markup.inline_keyboard);
  const UserID = query.message.chat.id
  const ChannelList = query.message.reply_markup.inline_keyboard
  const isMember = await checkMembership(UserID, ChannelList)
  const message = query.message;

  if (isMember) {
    bot.deleteMessage(message.chat.id, message.message_id);
    bot.sendMessage(UserID, "Telefon raqamingizni yuboring" , {
            reply_markup: {
              keyboard: [
                [{
                    text: "📞 Raqamni Yuborish ",
                    request_contact: true
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
            }
          })
          
  }else {
      bot.answerCallbackQuery({
        callback_query_id: query.id,
        text: "Hamma kanallarga obuna boling !!!",
        show_alert: true
      }) // alert 
  }
})


async function checkMembership(userId, ChannelList) {
  try {
    // let arr = []
    // ChannelList.map(item => {
    //     item.filter( async res => {
    //     if (res.url) {
    //       arr.push(res.url.slice(12,))
    //     }
    //   })
    // })
    // console.log(arr);

  //  let response = arr.filter(async url => {
  // })
  const response = await bot.getChatMember("@soffhub", userId);
  return response.status === 'member' || response.status === "creator" || response.status === "administrator" || false
  } catch (error) {
    return error
      // console.error('Kanal azoligi tekshirishda xatolik yuz berdi:', error);
      // return false; // Xato sodir bo'lsa, kanalga azo bo'lmagan deb qaytaramiz
  }
}

bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;

  const Text = `
<b>Menyu</b>
  `

  bot.sendMessage(chatId, Text, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: Menyu,
      resize_keyboard: true,
      one_time_keyboard: false,
    }
  });
});






bot.on("message", msg => {
//   const { id } = msg.chat

//   const markdown = `
//     *salom ${msg.chat.first_name} 
// adminga murojat qiling 🤨 @online_xakker*
//   ` // *salom* so'zi bold bolib ketad __qale__ sozi italic
//   bot.sendMessage(id, markdown, {
//     parse_mode: "Markdown" // bu parse mode berilishi shart
//   })
})



// const admin = `
//     [Admin](http://t.me/online_xakker)
//     `

//     bot.sendMessage(id, admin, {
//       parse_mode:"Markdown",
//       disable_web_page_preview: true
//     }) // link tashlanganda pasidagi infoni ochirib beradi


// bot.onText(/\/photo/, msg => {
//   const { id } = msg.chat
//   // send(id)
//   bot.getUpdates()
  
//   .then(res => {
//     bot.sendMessage(id, JSON.stringify(res))
//   })  
//   .catch(err =>{
//       bot.sendMessage(id, JSON.stringify(err.message))
//   })
// })

// bot.onText(/\/random/, msg => {
//   const { id } = msg.chat
//   let randomNumbers = [];
//   for (let i = 0; i < 40; i++) {
//     let num = Math.floor(Math.random() * 90) + 10;
//     randomNumbers.push(num);
//   }
//   let formattedNumbers = randomNumbers.join('/');
//   bot.sendMessage(id, formattedNumbers)
// })





// bot.onText(/\/pay/, msg => { //to'lov tizimi
//   const id  = msg.chat.id
//   bot.sendInvoice(
//     id,
//     'Pizza combo 3',
//     'Ramazon oyi uchun ajoyib turdagi combo',
//     'pizza',
//     '398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065',
//     'UZS',
//     [
//       { label: 'Zakaz berish', amount: 1000000 },
//     ],
//     {
//       photo_url: "./I'm.jpg",
//       need_phone_number: true,
//       is_flexible: true,
//     },
//   )
// })










// function salom() {
//   const min = 200;
//   const max = 700;
//   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

//   return `https://picsum.photos/500/${randomNumber}`
// }

// bot.onText(/\/pic/, msg => {
//   const {id} = msg.chat
//   bot.sendPhoto(id, salom(), { // rasm yuborish
//    caption: "rasmni  iplosi", // izoh
//    // has_spoiler:true, // hira qilib yuborish
//    protect_content:true, // yuborish va yuklashni taqiqlaydi
//  })
// })  



// bot.on("message", msg => {
//   const { id } = msg.chat

//   bot.sendMessage(id, 'inline keyboard', {
//     reply_markup: {
//       inline_keyboard: [ // shaffof button select kabi ishlaydi
//         [{
//           text: "Google",
//           url: "google.com"
//         }],
//         [
//           {
//             text: "forward", // nomi
//             callback_data:"forward"  // valuesi
//           },
//           {
//           text: "reply",
//           callback_data: "reply"
//         }]
//       ]
//     }
//   })
// })


// bot.on("callback_query", query => {
//   bot.answerCallbackQuery(query.id, `${query.data}`) // alert 
// })



// bot.on("message", msg => {
//   const { id } = msg.chat
//     bot.sendMessage(id, "menyu " , {
//       reply_markup: {
//         keyboard: [ // buttonlar yaratish
//           [{
//             text: "Joylashuvni yuborish",
//             request_location:true
//           }],
//           [{
//             text: "Kontaktni ulashish",
//             request_contact:true,
//           }]
//         ],
//         // one_time_keyboard:true // buttonlar avto yopish
//       }
//     })
// })






// bot.on("message", msg => {
//     const { id } = msg.chat

//     const admin = `
//     [Admin](http://t.me/online_xakker)
//     `

//     bot.sendMessage(id, admin, {
//       parse_mode:"Markdown",
//       disable_web_page_preview: true
//     }) // link tashlanganda pasidagi infoni ochirib beradi
//   })







// bot.onText(/\/start/, msg => { // /start commandasi bosilganda nimadur ishlashi
//   const { id } = msg.chat
//   bot.sendMessage(id,"salom")
// })




// bot.on("message", msg => {
//   const { id } = msg.chat

// //   const markdown = `
// //     *salom ${msg.chat.first_name} 
// // adminga murojat qiling 🤨 @online_xakker*
// //   ` // *salom* so'zi bold bolib ketad __qale__ sozi italic
//   // bot.sendMessage(id, markdown, {
//   //   parse_mode: "Markdown" // bu parse mode berilishi shart
//   // })
// })


// bot.on("message", (msg) =>  {
//   // msg.text  user yuborgan habar

//   const { id } = msg.chat // user Id aynan qaysi userligini bilish uchun
//   bot.sendMessage(id, Debug(msg))
// })
