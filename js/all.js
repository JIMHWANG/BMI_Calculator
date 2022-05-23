function UpdateList(e) {
    var LocalStorageRecord = localStorage.getItem("DataSet");
    var ParseLocalStorageRecord = JSON.parse(LocalStorageRecord);
    var mainContent = document.querySelector(".mainContent");
    var mainContentStr = "<h2>BMI 紀錄</h2>";
    var ColorbarColor;

    if (ParseLocalStorageRecord == null) { return };
    Object.keys(ParseLocalStorageRecord).forEach(function (key) {
        switch (true) {
            case (ParseLocalStorageRecord[key].BMIJudgement == "過輕"):
                ColorbarColor = "#31BAF9";
                break;
            case (ParseLocalStorageRecord[key].BMIJudgement == "過重"):
                ColorbarColor = "#FF982D";
                break;
            case (ParseLocalStorageRecord[key].BMIJudgement == "理想"):
                ColorbarColor = "#86D73F";
                break;
            default:
                ColorbarColor = "#86D73F";
        }
        if (key <= 9) {
            mainContentStr += '<div data-num=' + key + ' class="BMIRecord"><div class="colorbar" style="background: ' + ColorbarColor + ';"></div><div class="historyRecord"><p><em>' + ParseLocalStorageRecord[key].BMIJudgement + '</em></p><p>BMI<em>' + ParseLocalStorageRecord[key].BMIValue + '</em></p><p>weight<em>' + ParseLocalStorageRecord[key].Weight + 'kg</em ></p ><p>height<em>' + ParseLocalStorageRecord[key].Height + 'cm</em></p><p>' + ParseLocalStorageRecord[key].Date + '</p></div ></div>';
        } else {
            delete ParseLocalStorageRecord[key];
        }
    })
    mainContent.innerHTML = mainContentStr;
}

function addRecord(e) {
    var BMIValue = (WeightInput.value / ((HeightInput.value / 100) * (HeightInput.value / 100))).toFixed(2);
    var BMIJudgement;
    var AddDate = new Date();
    var DateStr = (AddDate.getMonth() + 1) + "-" + AddDate.getDate() + "-" + AddDate.getFullYear();
    var AddAryStr;
    var Addobj = {};
    AddAry = JSON.parse(localStorage.getItem("DataSet"));
    if (AddAry == null) { AddAry = []; }
    switch (true) {
        case (BMIValue <= 18.5):
            BMIJudgement = "過輕";
            break;
        case (BMIValue >= 25):
            BMIJudgement = "過重";
            break;
        default:
            BMIJudgement = "正常";
    }

    Addobj = {
        "BMIJudgement": BMIJudgement,
        "BMIValue": BMIValue,
        "Height": HeightInput.value,
        "Weight": WeightInput.value,
        "Date": DateStr
    }
    AddAry.unshift(Addobj);
    AddAryStr = JSON.stringify(AddAry);
    localStorage.setItem("DataSet", AddAryStr);
    UpdateList();
}

var AddAry = [];

var getLocalStorageList = localStorage.getItem('ItemList');
var getLocalStorageListAry = JSON.parse(getLocalStorageList);

var HeightInput = document.querySelector('.heightInput input');
var WeightInput = document.querySelector('.kgInput input');

var ResultButton = document.querySelector('.BMIResultButton button');
ResultButton.addEventListener('click', addRecord, false);

UpdateList();

