let express = require("express");
let axios = require("axios");

let app = express();
let = port = process.env.PORT || 8080;

app.use(express.static("public_html"));

app.listen(port, function () {
  console.log(`${port} server 시작 됨`);
});

// https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=vaAR8EEsvULJ%2BVngbDQLYQWlAJJhEn55j20aVKvSKORy9Nz62MTOaHkQNs6T3Zkg9rQ1SV8FAWwnSAMrCqI4tg%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10

// get으로 페이지 생성
// 해당 페이지로 접속 했을 때 어떤 데이터를 보낼 지도 결정
app.get("/pharmacy_list", (req, res) => {
  let response = null;
  try {
    let api = async () => {
      response = await axios.get(
        "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire",
        {
          params: {
            serviceKey:
              "vaAR8EEsvULJ%2BVngbDQLYQWlAJJhEn55j20aVKvSKORy9Nz62MTOaHkQNs6T3Zkg9rQ1SV8FAWwnSAMrCqI4tg%3D%3D",
            Q0: "서울특별시",
            Q1: "강남구",
            QT: "1",
            QN: "",
            QRD: "",
            pageNo: "1",
            numOfRows: "1000",
          },
        }
      );
    };
    api().then((response) => {
      // 보내는 내용일때 res
      res.setHeader("Access-Control-Allow-Origin", "*");
      //response에 속해있는 위에 결과물들을 json 형태로 전달해주는 것
      res.json(response.data.response.body);
    });
  } catch (e) {
    console.log(e);
  }

  return response;
});
