window.SURVEY_SCHEMA = {
  "layerName": "空き家調査_R8推定空き家",
  "legends": {
    "0": {
      "name": "空き家調査_新規対象",
      "fillColor": "#000000",
      "fillOpacity": 1.0,
      "strokeColor": "#000000",
      "strokeWidth": 1,
      "pointColor": "#000000"
    },
    "3": {
      "name": "空き家",
      "fillColor": "#004cff",
      "fillOpacity": 0.8,
      "strokeColor": "#004cff",
      "strokeWidth": 8,
      "pointColor": "#004cff"
    },
    "4": {
      "name": "空き家ではない",
      "fillColor": "#c8ff00",
      "fillOpacity": 0.7,
      "strokeColor": "#d4ff00",
      "strokeWidth": 8,
      "pointColor": "#c8ff00"
    },
    "5": {
      "name": "判断できない",
      "fillColor": "#fb24ff",
      "fillOpacity": 0.7,
      "strokeColor": "#fb24ff",
      "strokeWidth": 8,
      "pointColor": "#fb24ff"
    },
    "6": {
      "name": "未判定",
      "fillColor": "#ff4000",
      "fillOpacity": 0.7,
      "strokeColor": "#ff0000",
      "strokeWidth": 8,
      "pointColor": "#ff4000"
    }
  },
  "fields": [
    {
      "order": 0,
      "col": "調査id",
      "label": "調査id",
      "type": 2,
      "section": "1. 基本・判定情報",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 1,
      "col": "空家判定",
      "label": "空家判定",
      "type": 5,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "空き家",
          "code": "3",
          "score": null
        },
        {
          "label": "空き家ではない",
          "code": "4",
          "score": null
        },
        {
          "label": "判断できない",
          "code": "5",
          "score": null
        },
        {
          "label": "未判定",
          "code": "6",
          "score": null
        }
      ]
    },
    {
      "order": 2,
      "col": "総合判定",
      "label": "総合判定",
      "type": 5,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未判定",
          "code": "-1",
          "score": null
        },
        {
          "label": "特定空家等対象物件として選定",
          "code": "特定空家等対象物件として選定",
          "score": null
        },
        {
          "label": "管理不全空家等対象物件として選定",
          "code": "管理不全空家等対象物件として選定",
          "score": null
        },
        {
          "label": "経過観察(適正管理を促す)",
          "code": "経過観察(適正管理を促す)",
          "score": null
        },
        {
          "label": "対応不要",
          "code": "対応不要",
          "score": null
        }
      ]
    },
    {
      "order": 3,
      "col": "担当部署",
      "label": "担当部署",
      "type": 3,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "未選択",
          "score": null
        },
        {
          "label": "ICTソリューション部",
          "code": "ICTソリューション部",
          "score": null
        },
        {
          "label": "用地調査部",
          "code": "用地調査部",
          "score": null
        },
        {
          "label": "河川・砂防部",
          "code": "河川・砂防部",
          "score": null
        },
        {
          "label": "環境保全部",
          "code": "環境保全部",
          "score": null
        }
      ]
    },
    {
      "order": 4,
      "col": "調査予定日付",
      "label": "調査予定日付",
      "type": 11,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 5,
      "col": "所在地住所",
      "label": "所在地住所",
      "type": 1,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 6,
      "col": "大字区分",
      "label": "大字区分",
      "type": 1,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 7,
      "col": "住居表示",
      "label": "住居表示",
      "type": 1,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 8,
      "col": "空家の期間",
      "label": "空家の期間",
      "type": 1,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 9,
      "col": "公営住宅等",
      "label": "公営住宅等",
      "type": 14,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 10,
      "col": "調査日付",
      "label": "調査日付",
      "type": 11,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 11,
      "col": "調査時間",
      "label": "調査時間",
      "type": 15,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 12,
      "col": "調査員",
      "label": "調査員",
      "type": 1,
      "section": "1. 基本・判定情報",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 13,
      "col": "調査対象物件の有無",
      "label": "調査対象物件の有無",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 14,
      "col": "対象物件なしの場合の状態",
      "label": "対象物件なしの場合の状態",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "調査対象物件の有無",
        "values": [
          "なし"
        ]
      },
      "options": []
    },
    {
      "order": 15,
      "col": "調査実施可否",
      "label": "調査実施可否",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "可",
          "code": "可",
          "score": null
        },
        {
          "label": "否",
          "code": "否",
          "score": null
        }
      ]
    },
    {
      "order": 16,
      "col": "不可の場合の理由",
      "label": "不可の場合の理由",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "調査実施可否",
        "values": [
          "否"
        ]
      },
      "options": []
    },
    {
      "order": 17,
      "col": "その他不可理由",
      "label": "その他不可理由",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "調査実施可否",
        "values": [
          "否"
        ]
      },
      "options": []
    },
    {
      "order": 18,
      "col": "建物の用途",
      "label": "建物の用途",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "専用住宅",
          "code": "専用住宅",
          "score": null
        },
        {
          "label": "併用住宅",
          "code": "併用住宅",
          "score": null
        },
        {
          "label": "長屋建て・共同住宅",
          "code": "長屋建て_共同住宅",
          "score": null
        },
        {
          "label": "その他",
          "code": "その他",
          "score": null
        }
      ]
    },
    {
      "order": 19,
      "col": "その他建物用途",
      "label": "その他建物用途",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "建物の用途",
        "values": [
          "その他"
        ]
      },
      "options": []
    },
    {
      "order": 20,
      "col": "居住状態のチェック",
      "label": "居住状態のチェック",
      "type": 14,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 21,
      "col": "居住状態理由",
      "label": "居住状態理由",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 22,
      "col": "その他居住状態",
      "label": "その他居住状態",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 23,
      "col": "売り貸し看板",
      "label": "売り貸し看板",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 24,
      "col": "表札_看板",
      "label": "表札_看板",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "あるが判読できない",
          "code": "あるが判読できない",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 25,
      "col": "ありの場合の名称",
      "label": "ありの場合の名称",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "表札_看板",
        "values": [
          "あり"
        ]
      },
      "options": []
    },
    {
      "order": 26,
      "col": "郵便受けの状況",
      "label": "郵便受けの状況",
      "type": 5,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 27,
      "col": "郵便受けありの場合",
      "label": "郵便受けありの場合",
      "type": 1,
      "section": "2. 調査可否・建物用途・居住サイン",
      "readonly": false,
      "condition": {
        "field": "郵便受けの状況",
        "values": [
          "あり"
        ]
      },
      "options": []
    },
    {
      "order": 28,
      "col": "門扉の状況",
      "label": "門扉の状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 29,
      "col": "門扉ありの場合",
      "label": "門扉ありの場合",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "門扉の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "損傷あり",
          "code": "損傷あり",
          "score": null
        },
        {
          "label": "倒壊又は恐れがある",
          "code": "倒壊又は恐れがある",
          "score": null
        }
      ]
    },
    {
      "order": 30,
      "col": "第三者影響_門扉",
      "label": "第三者影響_門扉",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "門扉の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 31,
      "col": "門扉から玄関までの状況",
      "label": "門扉から玄関までの状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "やや草木が繁茂",
          "code": "やや草木が繁茂",
          "score": null
        },
        {
          "label": "草木が繁茂",
          "code": "草木が繁茂",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        },
        {
          "label": "その他",
          "code": "その他",
          "score": null
        }
      ]
    },
    {
      "order": 32,
      "col": "その他_門扉から玄関までの状況",
      "label": "その他_門扉から玄関までの状況",
      "type": 1,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "門扉から玄関までの状況",
        "values": [
          "その他"
        ]
      },
      "options": []
    },
    {
      "order": 33,
      "col": "第三者影響_門扉から玄関",
      "label": "第三者影響_門扉から玄関",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 34,
      "col": "電気メーターの状況",
      "label": "電気メーターの状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 35,
      "col": "電気メーターありの場合",
      "label": "電気メーターありの場合",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "電気メーターの状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "停止",
          "code": "停止",
          "score": null
        },
        {
          "label": "遠くて確認できない",
          "code": "遠くて確認できない",
          "score": null
        },
        {
          "label": "稼動",
          "code": "稼動",
          "score": null
        },
        {
          "label": "微動",
          "code": "微動",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 36,
      "col": "ガスボンベ_メーターの状況",
      "label": "ガスボンベ_メーターの状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "なし（都市ガス地域 閉栓）",
          "code": "なし_都市ガス地域_閉栓",
          "score": null
        },
        {
          "label": "あり（都市ガス地域 開栓）",
          "code": "あり_都市ガス地域_開栓",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 37,
      "col": "雨戸の状況",
      "label": "雨戸の状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "なし(その他)",
          "code": "なし_その他",
          "score": null
        },
        {
          "label": "一部閉まっている",
          "code": "一部閉まっている",
          "score": null
        },
        {
          "label": "完全に閉まっている",
          "code": "完全に閉まっている",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 38,
      "col": "なし_その他内容",
      "label": "なし_その他内容",
      "type": 1,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "雨戸の状況",
        "values": [
          "なし_その他"
        ]
      },
      "options": []
    },
    {
      "order": 39,
      "col": "窓ガラスの状況",
      "label": "窓ガラスの状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "一部破損",
          "code": "一部破損",
          "score": null
        },
        {
          "label": "大部分が破損",
          "code": "大部分が破損",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 40,
      "col": "第三者影響_窓ガラス",
      "label": "第三者影響_窓ガラス",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 41,
      "col": "カーテンの状況",
      "label": "カーテンの状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 42,
      "col": "空き家の可能性",
      "label": "空き家の可能性",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "判定結果",
          "code": "判定結果",
          "score": null
        }
      ]
    },
    {
      "order": 43,
      "col": "接面道路の幅員",
      "label": "接面道路の幅員",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "4m以上あり",
          "code": "4m以上あり",
          "score": null
        },
        {
          "label": "4m未満（2m以上）",
          "code": "4m未満（2m以上）",
          "score": null
        },
        {
          "label": "2m未満",
          "code": "2m未満",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 44,
      "col": "接面道路の傾斜状況",
      "label": "接面道路の傾斜状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "平坦～緩傾斜",
          "code": "平坦～緩傾斜",
          "score": null
        },
        {
          "label": "急傾斜（10°程度以上あり）",
          "code": "急傾斜（10°程度以上あり）",
          "score": null
        },
        {
          "label": "階段あり",
          "code": "階段あり",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 45,
      "col": "接面道路との高低差",
      "label": "接面道路との高低差",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "等高",
          "code": "等高",
          "score": null
        },
        {
          "label": "敷地の方が高い（1.5m以上高い）",
          "code": "敷地の方が高い（1.5m以上高い）",
          "score": null
        },
        {
          "label": "敷地の方が低い（10cm以上低い）",
          "code": "敷地の方が低い（10cm以上低い）",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 46,
      "col": "間口の状況",
      "label": "間口の状況",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "やや狭い（2m～4m程度）",
          "code": "やや狭い（2m～4m程度）",
          "score": null
        },
        {
          "label": "狭い（2m未満）",
          "code": "狭い（2m未満）",
          "score": null
        },
        {
          "label": "広い（4m以上確保）",
          "code": "広い（4m以上確保）",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 47,
      "col": "駐車スペース",
      "label": "駐車スペース",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 48,
      "col": "駐車スペースありの場合",
      "label": "駐車スペースありの場合",
      "type": 5,
      "section": "3. 敷地・外構・接面道路",
      "readonly": false,
      "condition": {
        "field": "駐車スペース",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "1台分",
          "code": "1台分",
          "score": null
        },
        {
          "label": "2台分以上",
          "code": "2台分以上",
          "score": null
        }
      ]
    },
    {
      "order": 49,
      "col": "塀の状況",
      "label": "塀の状況",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 50,
      "col": "門_塀_屋外階段等_傾斜",
      "label": "門_塀_屋外階段等_傾斜",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "塀の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい傾斜が認められる",
          "code": "著しい傾斜が認められる",
          "score": 50
        },
        {
          "label": "傾斜が認められる",
          "code": "傾斜が認められる",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 51,
      "col": "門_塀_屋外階段等_構造部材の破損等",
      "label": "門_塀_屋外階段等_構造部材の破損等",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "塀の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい破損等が認められる",
          "code": "著しい破損等が認められる",
          "score": 50
        },
        {
          "label": "破損等が認められる",
          "code": "破損等が認められる",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 52,
      "col": "第三者影響_塀",
      "label": "第三者影響_塀",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "塀の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 53,
      "col": "擁壁の状況",
      "label": "擁壁の状況",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 54,
      "col": "擁壁_一部の崩壊又は土砂の流出",
      "label": "擁壁_一部の崩壊又は土砂の流出",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "擁壁の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しく認められる",
          "code": "著しく認められる",
          "score": 100
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 50
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 55,
      "col": "擁壁_ひび割れ等の部材の劣化_水のしみ出し又は変状",
      "label": "擁壁_ひび割れ等の部材の劣化_水のしみ出し又は変状",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "擁壁の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "傾斜し、かつ折損が認められる",
          "code": "傾斜し、かつ折損が認められる",
          "score": 50
        },
        {
          "label": "全体に傾斜、ひび割れが認められる",
          "code": "全体に傾斜、ひび割れが認められる",
          "score": 25
        },
        {
          "label": "一部にひび割れが認められる",
          "code": "一部にひび割れが認められる",
          "score": 10
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 56,
      "col": "擁壁_排水不良",
      "label": "擁壁_排水不良",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "擁壁の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 57,
      "col": "第三者影響_擁壁",
      "label": "第三者影響_擁壁",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "擁壁の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 58,
      "col": "庭木の状況",
      "label": "庭木の状況",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 59,
      "col": "庭木ありの場合",
      "label": "庭木ありの場合",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "敷地からはみ出している",
          "code": "敷地からはみ出している",
          "score": null
        }
      ]
    },
    {
      "order": 60,
      "col": "立木_傾斜",
      "label": "立木_傾斜",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "倒壊のおそれがあるほどの著しい傾斜が認められる",
          "code": "倒壊のおそれがあるほどの著しい傾斜が認められる",
          "score": 50
        },
        {
          "label": "傾斜が認められ伐採や補強等がなされていない",
          "code": "傾斜が認められ伐採や補強等がなされていない",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 61,
      "col": "立木_幹の腐朽",
      "label": "立木_幹の腐朽",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "倒壊のおそれがあるほどの著しい腐朽が認められる",
          "code": "倒壊のおそれがあるほどの著しい腐朽が認められる",
          "score": 50
        },
        {
          "label": "腐朽が認められ伐採や補強等がなされていない",
          "code": "腐朽が認められ伐採や補強等がなされていない",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 62,
      "col": "立木_大枝の脱落",
      "label": "立木_大枝の脱落",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 63,
      "col": "立木_大枝の飛散",
      "label": "立木_大枝の飛散",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 20
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 64,
      "col": "立木_上部の大枝の折れ又は腐朽",
      "label": "立木_上部の大枝の折れ又は腐朽",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい状態が認められる",
          "code": "著しい状態が認められる",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 65,
      "col": "立木_大枝の折れ又は腐朽",
      "label": "立木_大枝の折れ又は腐朽",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい状態が認められる",
          "code": "著しい状態が認められる",
          "score": 20
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 10
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 66,
      "col": "第三者影響_庭木",
      "label": "第三者影響_庭木",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "庭木の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 67,
      "col": "ゴミの堆積状況",
      "label": "ゴミの堆積状況",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 68,
      "col": "ゴミありの場合",
      "label": "ゴミありの場合",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "ゴミの堆積状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "一部堆積あり",
          "code": "一部堆積あり",
          "score": null
        },
        {
          "label": "大量に堆積あり",
          "code": "大量に堆積あり",
          "score": null
        }
      ]
    },
    {
      "order": 69,
      "col": "第三者影響_ゴミ堆積",
      "label": "第三者影響_ゴミ堆積",
      "type": 5,
      "section": "4. 塀・擁壁・庭木・ゴミ堆積",
      "readonly": false,
      "condition": {
        "field": "ゴミの堆積状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        }
      ]
    },
    {
      "order": 70,
      "col": "建築物_傾斜",
      "label": "建築物_傾斜",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "傾斜が著しく倒壊の危険がある（1/20以上）",
          "code": "傾斜が著しく倒壊の危険がある（1/20以上）",
          "score": 100
        },
        {
          "label": "傾斜が認められる（1/60以上1/20未満）",
          "code": "傾斜が認められる（1/60以上1/20未満）",
          "score": 50
        },
        {
          "label": "傾斜が認められる（1/60未満）",
          "code": "傾斜が認められる（1/60未満）",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 71,
      "col": "第三者影響_建物傾き",
      "label": "第三者影響_建物傾き",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 72,
      "col": "建築物_構造部材の破損等",
      "label": "建築物_構造部材の破損等",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "破損等が著しく倒壊の危険がある",
          "code": "破損等が著しく倒壊の危険がある",
          "score": 100
        },
        {
          "label": "破損等が認められ、大修理が必要なもの",
          "code": "破損等が認められ、大修理が必要なもの",
          "score": 50
        },
        {
          "label": "破損等が認められ、小修理が必要なもの",
          "code": "破損等が認められ、小修理が必要なもの",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 73,
      "col": "第三者影響_基礎_土台",
      "label": "第三者影響_基礎_土台",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 74,
      "col": "建築物_屋根全体の変形又は外装材の剥落若しくは脱落",
      "label": "建築物_屋根全体の変形又は外装材の剥落若しくは脱落",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "変形又は剥落が著しく倒壊の危険がある",
          "code": "変形又は剥落が著しく倒壊の危険がある",
          "score": 100
        },
        {
          "label": "変形又は剥落があり、壁や屋根に室内まで貫通する穴を生じているもの",
          "code": "変形又は剥落があり、壁や屋根に室内まで貫通する穴を生じているもの",
          "score": 50
        },
        {
          "label": "変形又は剥落があり、下地が露出している",
          "code": "変形又は剥落があり、下地が露出している",
          "score": 25
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 75,
      "col": "第三者影響_屋根",
      "label": "第三者影響_屋根",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 76,
      "col": "外壁の状況",
      "label": "外壁の状況",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "一部破損",
          "code": "一部破損",
          "score": null
        },
        {
          "label": "腐敗または剥離あり",
          "code": "腐敗または剥離あり",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 77,
      "col": "第三者影響_外壁",
      "label": "第三者影響_外壁",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 78,
      "col": "樋の状況",
      "label": "樋の状況",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 79,
      "col": "樋ありの場合",
      "label": "樋ありの場合",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "樋の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "正常",
          "code": "正常",
          "score": null
        },
        {
          "label": "一部破損",
          "code": "一部破損",
          "score": null
        },
        {
          "label": "大部分が破損",
          "code": "大部分が破損",
          "score": null
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 80,
      "col": "第三者影響_樋",
      "label": "第三者影響_樋",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "樋の状況",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 81,
      "col": "他破損箇所",
      "label": "他破損箇所",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        },
        {
          "label": "公道から確認不可",
          "code": "公道から確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 82,
      "col": "他破損箇所ありの場合",
      "label": "他破損箇所ありの場合",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "軒先",
          "code": "軒先",
          "score": null
        },
        {
          "label": "雨戸",
          "code": "雨戸",
          "score": null
        },
        {
          "label": "アンテナ",
          "code": "アンテナ",
          "score": null
        },
        {
          "label": "物置",
          "code": "物置",
          "score": null
        },
        {
          "label": "ベランダ",
          "code": "ベランダ",
          "score": null
        },
        {
          "label": "カーポート",
          "code": "カーポート",
          "score": null
        },
        {
          "label": "屋外階段",
          "code": "屋外階段",
          "score": null
        },
        {
          "label": "看板",
          "code": "看板",
          "score": null
        },
        {
          "label": "その他",
          "code": "その他",
          "score": null
        }
      ]
    },
    {
      "order": 83,
      "col": "外装材等_剥落又は脱落",
      "label": "外装材等_剥落又は脱落",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 20
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 84,
      "col": "外装材等_破損_腐朽等",
      "label": "外装材等_破損_腐朽等",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい状態が認められる",
          "code": "著しい状態が認められる",
          "score": 20
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 10
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 85,
      "col": "軒_バルコニーその他の突出物_脱落",
      "label": "軒_バルコニーその他の突出物_脱落",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 20
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 86,
      "col": "軒_バルコニーその他の突出物_傾き又は破損_腐朽等",
      "label": "軒_バルコニーその他の突出物_傾き又は破損_腐朽等",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい状態が認められる",
          "code": "著しい状態が認められる",
          "score": 20
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 10
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 87,
      "col": "屋根ふき材_外装材_看板_雨樋等_剥落又は脱落",
      "label": "屋根ふき材_外装材_看板_雨樋等_剥落又は脱落",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 20
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 88,
      "col": "屋根ふき材_外装材_看板_雨樋等_破損_腐朽等",
      "label": "屋根ふき材_外装材_看板_雨樋等_破損_腐朽等",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "著しい状態が認められる",
          "code": "著しい状態が認められる",
          "score": 20
        },
        {
          "label": "認められる",
          "code": "認められる",
          "score": 10
        },
        {
          "label": "正常",
          "code": "正常",
          "score": 0
        },
        {
          "label": "確認不可",
          "code": "確認不可",
          "score": null
        }
      ]
    },
    {
      "order": 89,
      "col": "その他破損箇所",
      "label": "その他破損箇所",
      "type": 1,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": {
        "field": "他破損箇所",
        "values": [
          "あり"
        ]
      },
      "options": []
    },
    {
      "order": 90,
      "col": "第三者影響",
      "label": "第三者影響",
      "type": 5,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "あり",
          "code": "あり",
          "score": null
        },
        {
          "label": "なし",
          "code": "なし",
          "score": null
        }
      ]
    },
    {
      "order": 91,
      "col": "備考",
      "label": "備考",
      "type": 1,
      "section": "5. 建築物本体・劣化判定",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 92,
      "col": "影響_被害_危険性_建築物は密集した市街地にある",
      "label": "影響_被害_危険性_建築物は密集した市街地にある",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 93,
      "col": "影響_被害_危険性_敷地が狭い",
      "label": "影響_被害_危険性_敷地が狭い",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 94,
      "col": "影響_被害_危険性_接道は交通量や人の往来が多い",
      "label": "影響_被害_危険性_接道は交通量や人の往来が多い",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 95,
      "col": "影響_被害_危険性_自然災害により倒壊等の被害発生の可能性がある",
      "label": "影響_被害_危険性_自然災害により倒壊等の被害発生の可能性がある",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 96,
      "col": "影響_被害_危険性_衛生上有害な状態にある",
      "label": "影響_被害_危険性_衛生上有害な状態にある",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 97,
      "col": "影響_被害_危険性_景観を著しく損なっている",
      "label": "影響_被害_危険性_景観を著しく損なっている",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 98,
      "col": "影響_被害_危険性_周辺の生活環境の保全に影響がある",
      "label": "影響_被害_危険性_周辺の生活環境の保全に影響がある",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 99,
      "col": "影響_被害_危険性_上記以外の要因で第三者の財産に危害を与える可能性がある",
      "label": "影響_被害_危険性_上記以外の要因で第三者の財産に危害を与える可能性がある",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 100,
      "col": "管理状況_適正に管理する意思がない",
      "label": "管理状況_適正に管理する意思がない",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 101,
      "col": "管理状況_適正な管理の依頼を繰り返し受けているものの管理を適正に行っていない",
      "label": "管理状況_適正な管理の依頼を繰り返し受けているものの管理を適正に行っていない",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 102,
      "col": "管理状況_適正な管理を行うまでに時間を要した",
      "label": "管理状況_適正な管理を行うまでに時間を要した",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 103,
      "col": "管理状況_上記以外の要因で管理を適正に行っていない",
      "label": "管理状況_上記以外の要因で管理を適正に行っていない",
      "type": 14,
      "section": "6. 影響・被害・危険性 / 管理状況",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 104,
      "col": "不良度評点",
      "label": "不良度評点",
      "type": 1,
      "section": "7. 評点・ランク・写真",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 105,
      "col": "不良度ランク",
      "label": "不良度ランク",
      "type": 5,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "A",
          "code": "A",
          "score": null
        },
        {
          "label": "B",
          "code": "B",
          "score": null
        },
        {
          "label": "C1",
          "code": "C1",
          "score": null
        },
        {
          "label": "C2",
          "code": "C2",
          "score": null
        }
      ]
    },
    {
      "order": 106,
      "col": "総合評点",
      "label": "総合評点",
      "type": 1,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 107,
      "col": "市場性ランク",
      "label": "市場性ランク",
      "type": 5,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "A",
          "code": "A",
          "score": null
        },
        {
          "label": "B",
          "code": "B",
          "score": null
        },
        {
          "label": "C",
          "code": "C",
          "score": null
        },
        {
          "label": "D",
          "code": "D",
          "score": null
        }
      ]
    },
    {
      "order": 108,
      "col": "危険度ランク",
      "label": "危険度ランク",
      "type": 5,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "a",
          "code": "a",
          "score": null
        },
        {
          "label": "b",
          "code": "b",
          "score": null
        },
        {
          "label": "c",
          "code": "c",
          "score": null
        },
        {
          "label": "d",
          "code": "d",
          "score": null
        }
      ]
    },
    {
      "order": 109,
      "col": "影響_被害_危険性該当数",
      "label": "影響_被害_危険性該当数",
      "type": 1,
      "section": "7. 評点・ランク・写真",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 110,
      "col": "影響_被害_危険性ランク",
      "label": "影響_被害_危険性ランク",
      "type": 5,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "A",
          "code": "A",
          "score": null
        },
        {
          "label": "B",
          "code": "B",
          "score": null
        },
        {
          "label": "C",
          "code": "C",
          "score": null
        }
      ]
    },
    {
      "order": 111,
      "col": "管理状況該当数",
      "label": "管理状況該当数",
      "type": 1,
      "section": "7. 評点・ランク・写真",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 112,
      "col": "管理状況判定結果",
      "label": "管理状況判定結果",
      "type": 5,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": [
        {
          "label": "未選択",
          "code": "-1",
          "score": null
        },
        {
          "label": "〇",
          "code": "〇",
          "score": null
        },
        {
          "label": "×",
          "code": "×",
          "score": null
        }
      ]
    },
    {
      "order": 113,
      "col": "画像ID",
      "label": "画像ID",
      "type": 4,
      "section": "7. 評点・ランク・写真",
      "readonly": false,
      "condition": null,
      "options": []
    },
    {
      "order": 114,
      "col": "水道使用有無",
      "label": "水道使用有無",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 115,
      "col": "建物用途",
      "label": "建物用途",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 116,
      "col": "所有者氏名・名称",
      "label": "所有者氏名・名称",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 117,
      "col": "所有者住所",
      "label": "所有者住所",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 118,
      "col": "家屋_用途",
      "label": "家屋_用途",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 119,
      "col": "家屋_所有者氏名",
      "label": "家屋_所有者氏名",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 120,
      "col": "家屋_所有者住所",
      "label": "家屋_所有者住所",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 121,
      "col": "家屋_所在地",
      "label": "家屋_所在地",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 122,
      "col": "水道閉栓_使用者氏名",
      "label": "水道閉栓_使用者氏名",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 123,
      "col": "水道閉栓_住所",
      "label": "水道閉栓_住所",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 124,
      "col": "水道閉栓_契約日",
      "label": "水道閉栓_契約日",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 125,
      "col": "水道閉栓_開栓日",
      "label": "水道閉栓_開栓日",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 126,
      "col": "水道閉栓_閉栓日",
      "label": "水道閉栓_閉栓日",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 127,
      "col": "水道閉栓_上水用途名",
      "label": "水道閉栓_上水用途名",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 128,
      "col": "水道再契約_住所",
      "label": "水道再契約_住所",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 129,
      "col": "水道再契約_使用者氏名",
      "label": "水道再契約_使用者氏名",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 130,
      "col": "水道再契約_上水用途名",
      "label": "水道再契約_上水用途名",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 131,
      "col": "水道再契約_開栓日",
      "label": "水道再契約_開栓日",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    },
    {
      "order": 132,
      "col": "水道再契約_契約日",
      "label": "水道再契約_契約日",
      "type": 1,
      "section": "事前台帳・水道情報（参照用）",
      "readonly": true,
      "condition": null,
      "options": []
    }
  ]
};
window.SAMPLE_GEOJSON = {
  "type": "FeatureCollection",
  "name": "koriyama_sample_houses",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "調査id": "KRY-0001",
        "空家判定": "6",
        "総合判定": "-1",
        "所在地住所": "福島県郡山市朝日一丁目23-7",
        "大字区分": "朝日一丁目",
        "住居表示": "23-7",
        "水道使用有無": "閉栓中",
        "建物用途": "専用住宅",
        "所有者氏名・名称": "郡山 太郎（サンプル）",
        "所有者住所": "福島県郡山市桑野一丁目1-1",
        "水道閉栓_閉栓日": "2024-08-15",
        "水道閉栓_上水用途名": "家事用"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              140.3594,
              37.4003
            ],
            [
              140.3597,
              37.4003
            ],
            [
              140.3597,
              37.4005
            ],
            [
              140.3594,
              37.4005
            ],
            [
              140.3594,
              37.4003
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "調査id": "KRY-0002",
        "空家判定": "3",
        "総合判定": "-1",
        "所在地住所": "福島県郡山市朝日一丁目24-2",
        "大字区分": "朝日一丁目",
        "住居表示": "24-2",
        "水道使用有無": "閉栓中",
        "建物用途": "専用住宅",
        "所有者氏名・名称": "安積 花子（サンプル）",
        "所有者住所": "東京都新宿区西新宿2-8-1",
        "水道閉栓_閉栓日": "2023-11-02",
        "水道閉栓_上水用途名": "家事用"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              140.36,
              37.4006
            ],
            [
              140.3603,
              37.4006
            ],
            [
              140.3603,
              37.4008
            ],
            [
              140.36,
              37.4008
            ],
            [
              140.36,
              37.4006
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "調査id": "KRY-0003",
        "空家判定": "4",
        "総合判定": "対応不要",
        "所在地住所": "福島県郡山市朝日一丁目22-10",
        "大字区分": "朝日一丁目",
        "住居表示": "22-10",
        "水道使用有無": "使用中",
        "建物用途": "併用住宅",
        "所有者氏名・名称": "開成 一郎（サンプル）",
        "所有者住所": "福島県郡山市朝日一丁目22-10"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              140.3588,
              37.4
            ],
            [
              140.3591,
              37.4
            ],
            [
              140.3591,
              37.4002
            ],
            [
              140.3588,
              37.4002
            ],
            [
              140.3588,
              37.4
            ]
          ]
        ]
      }
    }
  ]
};
