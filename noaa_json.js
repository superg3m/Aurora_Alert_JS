const https = require('https');

const url = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"

https.get(url, res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const entries = JSON.parse(Buffer.concat(data).toString());

    for(entry of entries) {
      console.log(`time: ${entry[0]}, kp_index: ${entry[1]}`);
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
}); 