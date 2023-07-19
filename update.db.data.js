const Coin = require('./coin.model')
const PublicGoogleSheetsParser = require('public-google-sheets-parser')

async function updateDbData (){
    try 
    {
        let  coins = await Coin.find({})
        const spreadsheetId = '1vRPdWJskc_gGbtuGcG9e_ISCQ7hJBNu9vUW-bfvVU3k'
        const parser = new PublicGoogleSheetsParser()
        parser.parse(spreadsheetId).then(async(items) => {
            let updatedArray = coins.map(async(obj, indx) => {
                items.map(async(item) => {  
                    if (obj.name === item?.["Token"]) {
                        coins[indx].reddit_members= item?.["Social Media Reddit Members"];
                        coins[indx].twitter_followers= item?.["Social Media Twitter Followers"]
                        coins[indx].gitHub_stars= item?.["Social Media GitHub Stars"];
                        coins[indx].gitHub_followers= item?.["Social Media GitHub Followers"]
                        coins[indx].gitHub_contributors= item?.["Social Media GitHub Contributors"];
                        coins[indx].marketing_site= item?.["Marketing Відвідування сайту"];
                        coins[indx].watchlist_on_coinmarketcap= item?.["Marketing Вотч ліст на коінмаркеткеп"];
                        coins[indx].marketing_google= item?.["Marketing Маркетинг Пошук в Гуглі"];
                        coins[indx].marketing_youtube=  item?.["Marketing Маркетинг Пошук в ЮТ"];
                        await coins[indx].save()
                        // console.log("work");
                      return updatedArray;
    
                    }
                    return obj;
                }) 
            });
        });
        

    } catch (error) {
       console.log("error", error); 
    }
}

module.exports = updateDbData