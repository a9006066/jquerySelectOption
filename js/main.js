


(() => {
    //   const reguestUrl = "http://od.moi.gov.tw/od/data/api/EA28418E-8956-4790-BAF4-C2D3988266CC?$format=json";
    //   const header = { "Access-Control-Allow-Origin" : '*', "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}

    let select, searchBtn, datas, saveBtn, deleteBtn, storageBtn, datasTemp, dbStorage, dbjoson, radioBtn;
    myStorage = window.localStorage;

    select = $("#select");
    searchBtn = $("#serachBtn");
    saveBtn = $("#saveBtn");
    deleteBtn = $("#deleteBtn")
    storageBtn = $("#loardBtn");
    radioBtn = $('input:radio[name="radio1"]');
    checkBoxBtn = $('input[type=checkbox]');

    var tabs = $("#tabs").tabs();

    //調閱儲存資料
    dbjoson = localStorage.getItem("dbStorage");
    dbStorage = dbjoson ? JSON.parse(dbjoson) : [];

    //取得下拉選單
    getOption();

    //產生下拉選單
    // $.ajax({
    //     type:"GET",
    //     url: reguestUrl,
    //     dataType: "json",
    //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //     success: response => {
    //         if(Array.isArray(response)){
    //             datas = response.slice(1,response.length);
    //             console.log(JSON.stringify(datas));
    //             select.prepend($("<option></option>").attr("value",'全部單位').text('全部單位'));
    //                 for(let i = 0 ; i < datas.length ; i++){
    //                    select.append($("<option></option>").attr("value",datas[i].unit).text(datas[i].unit));
    //                 }
    //         }  
    //     },
    //     error:()=>{
    //       console.error("無清單資料")
    //     }
    // });
    

    //取得清單
    function getOption() {
        $.get("docs/doc/data.json", (response) => {
            datas = response;
            select.prepend($("<option></option>").attr("value", '全部單位').text('全部單位'));
            for (let i = 0; i < datas.length; i++) {
                select.append($("<option></option>").attr("value", datas[i].unit).text(datas[i].unit));
            }
        }); 
    }

    //產生表格
    function forlist(datas, doc) {
        if (datas instanceof Array) {
            doc.append("<tr><th width='7%'>單位</th><th width='20%'>電話</th><th width='10%'>傳真</th><th width='15%'>地址</th></tr>")
            for (let i = 0; i < datas.length; i++) {
                doc.append("<tr><td><a href='" + datas[i].website + "' target='_blank'>" + datas[i].unit + "</a></td><td>"
                    + datas[i].telephon + "</td><td>" + datas[i].fax + "</td><td>" + datas[i].address + + "</td><td></tr>")
                // doc.append($("<tr></tr>").append($("<td></td>").append($("<a></a>").attr("href",datas[i].website).attr("target","_blank").text(datas[i].unit))))
            }
            //bgcolor
            $("#items tr:even").css("background-color", "#BBFFEE")
            doc.sortable();
        }
    }

    //查詢
    searchBtn.on('click', () => {
        cleanDom();
        let selectCity = $('select[name="city1"]').val();
        index = select.find(":selected").index();
        if (index > 0) {
            datasTemp = [datas[index - 1]];
            forlist(datasTemp, $("#items"));
        } else {
            datasTemp = datas;
            forlist(datas, $("#items"));
        }
    })

    //儲存
    saveBtn.on('click', () => {
        if (Array.isArray(datasTemp) && datasTemp.length > 0)
            for (var i = 0; i < datasTemp.length; i++)
                dbStorage.push(datasTemp[i]);
        else alert('請先查詢!!')
        localStorage.setItem('dbStorage', JSON.stringify(dbStorage));
    });

    //刪除紀錄
    deleteBtn.on('click', () => {
        dbStorage = [];
        localStorage.removeItem('dbStorage')
    });

    //調閱檔案
    storageBtn.on('click', () => {
        cleanDom();
        if (dbStorage.length > 0) {
            forlist(dbStorage, $("#savedItems"));
        } else {
            $("#message").append($("<p>無儲存記錄!!</p>").css("color", 'red'));
        }
    });

    //儲存
    window.onunload = () => {
        localStorage.setItem('dbStorage', JSON.stringify(dbStorage));
    }

    //清除表單
    function cleanDom() {
        $("#message").empty();
        $("#savedItems").empty();
        $("#items").empty();
    }

    //radio
    radioBtn.on("change", () => {
        let v = $('input:radio:checked[name="radio1"]').val();
        console.log(v);
    });
    //checkbox
    checkBoxBtn.on("change", () => {
        let boxs = new Array();
        boxs = $("input:checkbox:checked[name='no1']").each((i, _this) => {
            boxs[i] = _this.value;
        })

    });




})();







