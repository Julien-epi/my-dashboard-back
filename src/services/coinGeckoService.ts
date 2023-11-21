import axios from "axios";
import { Crypto } from "../interfaces/Crypto";

export const getCryptoPopulary = async (): Promise<Crypto[]> => {
  try {
    const response = await axios.get<Crypto[]>("https://api.coinpaprika.com/v1/tickers");
    const top10Cryptos = response.data.slice(0, 10);
    return top10Cryptos;
  } catch (error) {
    console.log("🚀 ~ file: coinPaprikaService.ts ~ getCryptoPopulary ~ error:", error)
    console.error("Une erreur s'est produite:", error);
    return [];
  }
};
