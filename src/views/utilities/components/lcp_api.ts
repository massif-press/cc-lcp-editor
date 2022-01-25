// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from 'axios'

const lcp_meta_key = process.env.VUE_APP_LCP_META_KEY

const headers = {
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    // 'Access-Control-Allow-Credentials': true,
    'x-api-key': lcp_meta_key,
  },
};

const api = axios.create({
  baseURL: 'https://ujgatmvzlg.execute-api.us-east-1.amazonaws.com/prod',
  ...headers
})

const getPack = (passcode: string) => {
  return api.get('/community-pack', {
    params: { passcode }
  })
}

const putPack = (payload: any) => {
  return api.put('/community-pack', { payload: payload })
}

const scan = () => {
  return api.get('/scan')
}

export {
  getPack,
  putPack,
  scan,
}
