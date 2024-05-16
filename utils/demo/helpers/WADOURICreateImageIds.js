const sopInstanceUIDs = [];

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

numbers.forEach(i => {
  console.log(i)
  sopInstanceUIDs.push([`1.2.840.113619.2.404.3.1689058051.333.1685695404.347.${i}`])
})

export default function wadoURICreateImageIds() {
  const seriesUID =
    '1.2.840.113619.2.404.3.1689058051.333.1685695404.345';
  const studyUID =
    '1.2.840.113619.2.404.3.1689058051.333.1685695404.112';
    const wadoURIRoot = `http://172.16.204.218:3002/dicomweb/wado-uri?requestType=WADO&studyUID=${studyUID}&seriesUID=${seriesUID}&contentType=application%2Fdicom`;


//   const seriesUID =
//   '1.2.840.113619.2.416.285692355280127750734032766514155976728';
// const studyUID =
//   '1.2.840.113619.2.416.269390171184875493113210222117008147937';
//   const wadoURIRoot = `http://localhost:5985/?requestType=WADO&studyUID=${studyUID}&seriesUID=${seriesUID}&contentType=application%2Fdicom`;

  const imageIds = sopInstanceUIDs.map((uid) => {
    return `wadouri:${wadoURIRoot}&objectUID=${uid}`;
  });

  console.log(imageIds)

  return imageIds;
}
