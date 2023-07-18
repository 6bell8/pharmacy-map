let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 8080;

app.use(express.static("public_html"));

app.listen(port, function () {
  console.log(`${port} server 시작 됨`);
});

// get으로 페이지 생성
// 해당 페이지로 접속 했을 때 어떤 데이터를 보낼 지도 결정
app.get("/pharmacy_list", (req, res) => {
  let api = async () => {
    let response = null;
    try {
      response = await axios.get(
        "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire",
        {
          params: {
            serviceKey:
              "vaAR8EEsvULJ+VngbDQLYQWlAJJhEn55j20aVKvSKORy9Nz62MTOaHkQNs6T3Zkg9rQ1SV8FAWwnSAMrCqI4tg==",
            Q0: req.query.Q0,
            Q1: req.query.Q1,
            QT: req.query.QT,
            QN: req.query.QN,
            QRD: req.query.QRD,
            pageNo: req.query.pageNo,
            numOfRows: req.query.numOfRows,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    return response;
  };
  api().then((response) => {
    // 보내는 내용일때 res
    res.setHeader("Access-Control-Allow-Origin", "*");
    //response에 속해있는 위에 결과물들을 json 형태로 전달해주는 것
    res.json(response.data.response.body);
  });
});
