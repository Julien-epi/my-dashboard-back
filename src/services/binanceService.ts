import axios from 'axios';
import crypto from 'crypto';

const BASE_URL = 'https://api.binance.com';

const generateSignature = (queryData: string, secret: string) => {
    return crypto.createHmac('sha256', secret).update(queryData).digest('hex');
};

export const getStakingHistory = async (product: string = "L_DEFI", txnType: string = "SUBSCRIPTION") => {
    const timestamp = Date.now();
    console.log("🚀 ~ file: binanceService.ts:12 ~ getStakingHistory ~ timestamp:", timestamp)
    const query = `product=${product}&txnType=${txnType}&timestamp=${timestamp}`;
    const signature = generateSignature(query, process.env.BINANCE_SECRET_KEY || '');

    const headers = {
        'X-MBX-APIKEY': process.env.BINANCE_API_KEY
    };

    const endpoint = `/sapi/v1/staking/stakingRecord?${query}&signature=${signature}`;

    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, { headers });
        console.log("🚀 ~ file: binanceService.ts:24 ~ getStakingHistory ~ response:", response)
        return response.data;  
    } catch (error) {
        console.error('Error fetching Binance staking history:', error);
        throw new Error("Error fetching Binance staking history");
    }
};

