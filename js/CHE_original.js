/* 
はじめに、非公開設定の機体のプログラムが見られるような改変は控えてください
コミュニティにとって悪影響が出ると思うので、そのような改変は方針上許可できません
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    /* ---------- 定数の宣言 ---------- */
    // chip.type
    const CHIP_NOTHING                = -1,
          CHIP_RETURN                 =  0,
          THINK_NOP                   =  1,
          THINK_STOP                  =  2,
          THINK_WAIT                  =  3,
          THINK_GOSUB                 =  4,
          THINK_INPUT_COUNTER         =  5,
          THINK_CALCULATE_COUNTER     =  6,
          THINK_SUBMIT_COUNTER        =  7,
          THINK_RECEIVE_COUNTER       =  8,
          THINK_BUTTON                =  9,
          BRANCH_WEAPON_REMAIN        = 10,
          BRANCH_SEARCH_AREA          = 11,
          BRANCH_SEARCH_MACHINE       = 12,
          BRANCH_SEARCH_OBJECT        = 13,
          BRANCH_SEARCH_BULLET        = 14,
          BRANCH_MY_CONDITION         = 15,
          BRANCH_MY_MOVEMENT          = 16,
          BRANCH_RANDOM               = 17,
          BRANCH_TIME                 = 18,
          BRANCH_TARGET_POSITION      = 19,
          BRANCH_FROM_TARGET_POSITION = 20,
          BRANCH_TARGET_MOVEMENT      = 21,
          BRANCH_TARGET_CODE          = 22,
          BRANCH_BE_TARGETLOCKED      = 23,
          BRANCH_TARGET_WEAPON        = 24,
          BRANCH_RAY_TO_TARGET        = 25,
          BRANCH_COUNTER              = 26,
          BRANCH_BUTTON               = 27,
          BRANCH_ANALOGPAD            = 28,
          MOVE_STOP                   = 29,
          MOVE_MOVE                   = 30,
          MOVE_TURN                   = 31,
          MOVE_JUMP                   = 32,
          MOVE_FASTMOVE               = 33,
          MOVE_FASTTURN               = 34,
          MOVE_GRAPPLE                = 35,
          MOVE_BLOCK                  = 36,
          MOVE_SPECIAL                = 37,
          MOVE_SELECTION_SHOOT        = 38,
          MOVE_DIRECTION_SHOOT        = 39,
          MOVE_GUNSIGHT_COUNTER       = 40,
          MOVE_GUNSIGHT_LAUNCH        = 41,
          MOVE_GUNSIGHT_MOVE          = 42,
          MOVE_GUNSIGHT_SHOOT         = 43,
          INSTRUCT_SET_HEIGHT         = 44,
          INSTRUCT_LAUNCH_OPTION      = 45,
          INSTRUCT_TARGET_LOCK        = 46,
          INSTRUCT_TARGET_AUTOTURN    = 47,
          INSTRUCT_TARGET_PARTS       = 48,
          INSTRUCT_TARGET_COUNTER     = 49,
          INSTRUCT_TARGET_OFF         = 50,
          INSTRUCT_CAMERA_VIEW        = 51,
          INSTRUCT_ALERT              = 52;
    const chipExe2Che = {
      0:  CHIP_NOTHING,
      1:  CHIP_RETURN,
      11: THINK_NOP,
      12: THINK_STOP,
      13: THINK_WAIT,
      14: THINK_GOSUB,
      15: THINK_INPUT_COUNTER,
      16: THINK_CALCULATE_COUNTER,
      21: THINK_SUBMIT_COUNTER,
      22: THINK_RECEIVE_COUNTER,
      23: THINK_BUTTON,
      24: BRANCH_WEAPON_REMAIN,
      25: BRANCH_SEARCH_AREA,
      26: BRANCH_SEARCH_MACHINE,
      31: BRANCH_SEARCH_OBJECT,
      32: BRANCH_SEARCH_BULLET,
      33: BRANCH_MY_CONDITION,
      34: BRANCH_MY_MOVEMENT,
      35: BRANCH_RANDOM,
      36: BRANCH_TIME,
      41: BRANCH_TARGET_POSITION,
      42: BRANCH_FROM_TARGET_POSITION,
      43: BRANCH_TARGET_MOVEMENT,
      44: BRANCH_TARGET_CODE,
      45: BRANCH_BE_TARGETLOCKED,
      46: BRANCH_TARGET_WEAPON,
      51: BRANCH_RAY_TO_TARGET,
      52: BRANCH_COUNTER,
      53: BRANCH_BUTTON,
      54: BRANCH_ANALOGPAD,
      55: MOVE_STOP,
      56: MOVE_MOVE,
      61: MOVE_TURN,
      62: MOVE_JUMP,
      63: MOVE_FASTMOVE,
      64: MOVE_FASTTURN,
      65: MOVE_GRAPPLE,
      66: MOVE_BLOCK,
      71: MOVE_SPECIAL,
      72: MOVE_SELECTION_SHOOT,
      73: MOVE_DIRECTION_SHOOT,
      74: MOVE_GUNSIGHT_COUNTER,
      75: MOVE_GUNSIGHT_LAUNCH,
      76: MOVE_GUNSIGHT_MOVE,
      81: MOVE_GUNSIGHT_SHOOT,
      82: INSTRUCT_SET_HEIGHT,
      83: INSTRUCT_LAUNCH_OPTION,
      84: INSTRUCT_TARGET_LOCK,
      85: INSTRUCT_TARGET_AUTOTURN,
      86: INSTRUCT_TARGET_PARTS,
      91: INSTRUCT_TARGET_COUNTER,
      92: INSTRUCT_TARGET_OFF,
      93: INSTRUCT_CAMERA_VIEW,
      94: INSTRUCT_ALERT,
    };
    // 描画用
    const boxMarginLeft   = 36,
          boxMarginTop    = 36,
          boxMarginRight  = 44,
          boxMarginBottom = 44,
          boxWidth    = 80,
          boxHeight   = 80,
          chipMarginLeft  = 9,
          chipMarginTop   = 9,
          chipWidth   = 64,
          chipHeight  = 64,
          chipCenterX = 31,
          chipCenterY = 31;
    
    /* ---------- 変数の宣言 ---------- */
    let machineName = [
        'ブロックヘッド',
        'ネグローニ',
        'ジェイラー',
        'エッグノッグ',
        '綾影',
        'ラスティネール',
        'ノーランダー',
        'トリンカー',
        '月影',
        'セメタリーキーパー',
        'パークドッグ',
        'グラスホッパー',
        'アラクネー',
        '冥界',
        'ハデス',
        'チキンハンター',
        'トライポッド',
        'ダークコフィン',
        'マリアエレナ',
        'アヌビアス',
        'バッドドリーム',
        'ローケン',
        'バジリスク',
        'ホイリーコーン',
        'アングリフ',
        'フライド',
        'ロータス',
        'プリースト',
        'モッキンバード',
        'チャーイカ',
        'ターゲットドローン',
        'アグリオス',
        'ケイローン',
        'ニーズヘッグ',
        'アビスパ',
        'グレイブストーン',
        'ゲイザー'];
  
    let cpuName = ['TP-16', 'SP-36L', 'SP36-H', 'MP100L', 'MP100H', 'LP323L', 'LP323M', 'LP323H'];
    // cpuSize[cpuType][routine][x, y]
    let cpuSize = [[[ 4,  4], [0, 0], [0, 0]],
                   [[ 6,  6], [0, 0], [0, 0]],
                   [[ 6,  6], [0, 0], [0, 0]],
                   [[10, 10], [0, 0], [0, 0]],
                   [[10, 10], [0, 0], [0, 0]],
                   [[15, 15], [7, 7], [7, 7]],
                   [[15, 15], [7, 7], [7, 7]],
                   [[15, 15], [7, 7], [7, 7]]];
  
    /* ---------- オブジェクトの宣言 ---------- */
    /*
    Chip = {
      type,         チップの種類, -1:なし, 1:RETURN, 2～94:各種チップ
      dir1,         矢印1, 0～7:上/右上/右/右下/下/左下/左/左上
      dir2,         矢印2, 0～7:上/右上/右/右下/下/左下/左/左上
      actMode,      実行モード, 0:動作終了まで停止 1:通過
      param[11],    各種パラメータ
    }
    */
    function Chip() {
      this.param = new Array(11);
      this.init = function() {
        this.type = -1;
        this.dir1 = -1;
        this.dir2 = -1;
        this.actMode = 1;
        this.param = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      };
      this.init();
        
      this.setCheData = function(arrayBuffer) {
        let Uint8View = new Uint8Array(arrayBuffer, 0, 8);
        let Int8View = new Int8Array(arrayBuffer, 0, 8);
        let dv; // DataView
        let bv; // Uint8Viewのコピーを一時的に使う場合に使用
        
        // チップ情報の共通代入
        this.type = cheByte2ChipType(Uint8View[0]);
        this.dir2 = Uint8View[1] >> 4 & 0x7;
        this.dir1 = Uint8View[1] & 0x7;
        this.param[0] = Uint8View[2];
        this.param[1] = Uint8View[3];
        this.param[2] = Uint8View[4];
        this.param[3] = Uint8View[5];
        
        // チップごとの特殊代入
        switch (this.type) {
          case THINK_CALCULATE_COUNTER:
            this.param[0] = Uint8View[6] & 0xf; // カウンタ
            this.param[1] = Uint8View[7]; // 演算子
            this.param[2] = Uint8View[6] >> 4 & 0xf; // パラメータ
            dv = new DataView(arrayBuffer);
            this.param[3] = dv.getInt32(2, true); // 数値(littleEndian)
            break;
          case THINK_BUTTON:
            this.actMode = Uint8View[2];
            break;
          case BRANCH_WEAPON_REMAIN:
            this.param[0] = Uint8View[3] > 0 ? Uint8View[3] + 6 : Uint8View[4]; // 武装/オプション番号
            this.param[1] = Uint8View[2]; // 残数
            this.param[2] = Uint8View[5]; // 分岐条件
            break;
          case BRANCH_SEARCH_AREA:
            this.param2SearchRange(arrayBuffer);
            break;
          case BRANCH_SEARCH_MACHINE:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6] & 0xf; // 部隊属性
            this.param[6] = Uint8View[6] >> 4 & 0xf; // 機体種別
            this.param[7] = Uint8View[7] & 0xf; // 機体数
            this.param[8] = Uint8View[7] >> 4 & 0xf; // 分岐条件
            break;
          case BRANCH_SEARCH_OBJECT:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6]; // 高さ
            this.param[6] = Uint8View[7]; // 分岐条件
            break;
          case BRANCH_SEARCH_BULLET:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6]; // 発射物
            this.param[6] = Uint8View[7] & 0xf; // 弾数
            this.param[7] = Uint8View[7] >> 4 & 0xf; // 分岐条件
            break;
          case BRANCH_TIME:
            this.param[0] = Uint8View[4]; // 基準時間
            dv = new DataView(arrayBuffer);
            this.param[1] = dv.getInt16(2, true); // 秒数(littleEndian)
            this.param[2] = Uint8View[5]; // 分岐条件
            break;
          case BRANCH_TARGET_POSITION:
            this.param2SearchRange(arrayBuffer);
            break;
          case BRANCH_FROM_TARGET_POSITION:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6]; // 基準部位
            break;
          case BRANCH_TARGET_CODE:
            this.param[0] = (this.param[0] === 0xff ? 0 : this.param[0] + 1); // 機体コード
            break;
          case BRANCH_COUNTER:
            this.param[0] = Uint8View[6] & 0xf; // カウンタ
            this.param[1] = Uint8View[7]; // 分岐条件
            this.param[2] = Uint8View[6] >> 4 & 0xf; // パラメータ
            dv = new DataView(arrayBuffer);
            this.param[3] = dv.getInt32(2, true); // 数値(littleEndian)
            break;
          case BRANCH_BUTTON:
            // 判定ボタン
            bv = Uint8View[2];
            for(let i = 0; i < 8; i++) {
              this.param[i] = bv & 0x1;
              bv >>= 1;
            }
            bv = Uint8View[3];
            for(let i = 8; i < 10; i++) {
              this.param[i] = bv & 0x1;
              bv >>= 1;
            }
            // ボタン状態
            this.param[10] = Uint8View[4];
            break;
          case BRANCH_ANALOGPAD:
            bv = new Int8Array(arrayBuffer, 2, 6);
            this.param[1] = bv[1]; // アナログ値
            break;
          case MOVE_STOP:
            this.actMode = Uint8View[3];
            break;
          case MOVE_MOVE:
          case MOVE_TURN:
            dv = new DataView(arrayBuffer);
            this.param[1] = dv.getInt16(4, true); // 移動距離,旋回角度(littleEndian)
            this.actMode = Uint8View[3]; // 実行モード
            break;
          case MOVE_JUMP:
          case MOVE_FASTMOVE:
          case MOVE_FASTTURN:
          case MOVE_GRAPPLE:
            this.actMode = Uint8View[3];
            break;
          case MOVE_BLOCK:
            this.actMode = Uint8View[4];
            break;
          case MOVE_SPECIAL:
            this.actMode = Uint8View[3];
            break;
          case MOVE_SELECTION_SHOOT:
            this.param2SearchRange(arrayBuffer);
            bv = Uint8View[6] & 0x7;
            this.param[5] = bv; // (bv === 5 ? 0 : bv + 1); // 武装番号
            this.param[6] = Uint8View[6] >> 3 & 0x1f; // 発射数
            this.param[7] = Uint8View[7] & 0xf; // 射撃モード
            this.actMode = Uint8View[7] >> 4 & 0xf; // 実行モード
            break;
          case MOVE_DIRECTION_SHOOT:
            this.param[0] = Int8View[2]; // 方向指定
            this.param[1] = Int8View[3]; // 仰角指定
            this.actMode = Uint8View[6];
            break;
          case MOVE_GUNSIGHT_MOVE:
            dv = new DataView(arrayBuffer);
            this.param[0] = dv.getInt16(2, true); // 基準方向(littleEndian)
            this.param[1] = dv.getInt16(4, true); // 方位指定(littleEndian)
            this.param[2] = dv.getInt16(6, true); // 仰角指定(littleEndian)
            break;
          case MOVE_GUNSIGHT_SHOOT:
            this.actMode = Uint8View[5];
            break;
          case INSTRUCT_SET_HEIGHT:
            this.param[0] = Uint8View[3]; // タイプ
            this.param[1] = Uint8View[2]; // 高度指定
            break;
          case INSTRUCT_TARGET_LOCK:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6] & 0xf; // 優先順位
            this.param[6] = Uint8View[6] >> 4 & 0xf; // 部隊属性
            this.param[7] = Uint8View[7]; // 機体種別
            break;
          case INSTRUCT_TARGET_AUTOTURN:
            this.param2SearchRange(arrayBuffer);
            this.param[5] = Uint8View[6]; // 自動旋回
            break;
        }
      }
      
      function cheByte2ChipType(data) {
        data &= 0x3f;
        if(data === 0) { return -1; }
        if(data > 0 && data < 53) { return data; }
        if(data === 53) { return 0; }
        return -1;
      }
      
      // 探査範囲の変換
      this.param2SearchRange = function(arrayBuffer) {
        let Uint8View = new Uint8Array(arrayBuffer, 2, 6);
        let Int8View = new Int8Array(arrayBuffer, 2, 6);
        
        this.param[0] = Uint8View[0] & 0x1;
        if(this.param[0] === 0) {
          this.param[1] = Uint8View[3]; // 符号なし
          this.param[2] = Uint8View[1]; // 符号なし
          this.param[3] = Uint8View[2]; // 符号なし
          this.param[4] = Uint8View[0] >> 1 & 0x7f; // 符号なし
        } else {
          this.param[1] = Uint8View[1]; // 符号なし
          this.param[2] = Uint8View[0] >> 1 & 0x7f; // 符号なし
          this.param[3] = Int8View[2]; // 符号あり
          this.param[4] = Int8View[3]; // 符号あり
        }
      }
  
      this.setExeData = function(line) {
        let lineMatch = line.match(/(main|sub1|sub2)\s0\s(\d+)\s(\d+)\s0\s(\d+)\s(-1|[0-7])\s(-1|[0-7])\s(-?\d+)/);
        if(lineMatch) {
          this.type = chipExe2Che[lineMatch[4]];
          this.dir1 = Number(lineMatch[5]);
          this.dir2 = Number(lineMatch[6]);
          this.param[0] = Number(lineMatch[7]);
          
          line = line.slice(lineMatch[0].length);
          lineMatch = line.match(/^\s(-?\d+(?:\.\d)?)\s(-?\d+(?:\.\d)?)\s(-?\d+)\s(-?\d+)\s(-?\d+)\s(-?\d+)\s(-?\d+)\s(-?\d+)\s(-?\d+)\s(-?\d+)/);
          if(lineMatch) {
            let exeParams = new Array(11);
            exeParams[0] = this.param[0];
            for(let paramIdx = 1; paramIdx < 11; paramIdx++) {
              exeParams[paramIdx] = Number(lineMatch[paramIdx])
            }
            this.setParamsFromExeParams(exeParams);
          }
        }
      }
      
      /*
      EXE独自のパラメータ保存形式をCHE形式に変換
      主に1から始まるものを0から始まるように
      */
      this.setParamsFromExeParams = function(exeParams) {
        // 一旦そのまま代入
        for(let paramIdx = 0; paramIdx < 11; paramIdx++) {
          this.param[paramIdx] = exeParams[paramIdx];
        }
        
        // Array.indexOfを使った比較
        // 1～→0～に修正
        let testArray;
        testArray = [
          THINK_WAIT,
          THINK_GOSUB,
          THINK_INPUT_COUNTER,
          THINK_CALCULATE_COUNTER,
          THINK_SUBMIT_COUNTER,
          THINK_RECEIVE_COUNTER,
          BRANCH_WEAPON_REMAIN,
          BRANCH_MY_CONDITION,
          BRANCH_MY_MOVEMENT,
          BRANCH_TIME,
          BRANCH_TARGET_MOVEMENT,
          BRANCH_BE_TARGETLOCKED,
          BRANCH_TARGET_WEAPON,
          BRANCH_RAY_TO_TARGET,
          BRANCH_COUNTER,
          BRANCH_ANALOGPAD,
          MOVE_STOP,
          MOVE_MOVE,
          MOVE_TURN,
          MOVE_JUMP,
          MOVE_FASTMOVE,
          MOVE_FASTTURN,
          MOVE_GRAPPLE,
          MOVE_BLOCK,
          MOVE_SPECIAL,
          MOVE_GUNSIGHT_COUNTER,
          MOVE_GUNSIGHT_LAUNCH,
          MOVE_GUNSIGHT_MOVE,
          MOVE_GUNSIGHT_SHOOT,
          INSTRUCT_SET_HEIGHT,
          INSTRUCT_LAUNCH_OPTION,
          INSTRUCT_TARGET_PARTS,
          INSTRUCT_TARGET_COUNTER,
          INSTRUCT_CAMERA_VIEW,
          INSTRUCT_ALERT
        ];
        if(testArray.indexOf(this.type) >= 0) {
          exeParams[0] = exeParams[0] > 0 ? exeParams[0] - 1 : 0;
          this.param[0] = exeParams[0];
        }
        testArray = [
          THINK_INPUT_COUNTER,
          THINK_CALCULATE_COUNTER,
          THINK_SUBMIT_COUNTER,
          THINK_RECEIVE_COUNTER,
          BRANCH_TARGET_WEAPON,
          BRANCH_COUNTER,
          MOVE_GUNSIGHT_COUNTER,
          MOVE_GUNSIGHT_SHOOT,
          INSTRUCT_CAMERA_VIEW,
          INSTRUCT_ALERT
        ];
        if(testArray.indexOf(this.type) >= 0) {
          exeParams[1] = exeParams[1] > 0 ? exeParams[1] - 1 : 0;
          this.param[1] = exeParams[1];
        }
        testArray = [
          THINK_CALCULATE_COUNTER,
          BRANCH_TIME,
          BRANCH_COUNTER,
          BRANCH_ANALOGPAD,
          MOVE_DIRECTION_SHOOT,
          MOVE_GUNSIGHT_COUNTER
        ];
        if(testArray.indexOf(this.type) >= 0) {
          exeParams[2] = exeParams[2] > 0 ? exeParams[2] - 1 : 0;
          this.param[2] = exeParams[2];
        }
        
        switch (this.type) {
          case BRANCH_SEARCH_MACHINE:
            this.param[5] = exeParams[5] > 0 ? exeParams[5] - 1 : 0;
            this.param[6] = exeParams[6] > 0 ? exeParams[6] - 1 : 0;
            this.param[8] = exeParams[8] > 0 ? exeParams[8] - 1 : 0;
            this.param[9] = exeParams[9] > 0 ? exeParams[9] - 1 : 0;
            break;
          case BRANCH_SEARCH_OBJECT:
            this.param[6] = exeParams[6] > 0 ? exeParams[6] - 1 : 0;
            break;
          case BRANCH_SEARCH_BULLET:
            this.param[5] = exeParams[5] > 0 ? exeParams[5] - 1 : 0;
            this.param[7] = exeParams[7] > 0 ? exeParams[7] - 1 : 0;
            break;
          case BRANCH_FROM_TARGET_POSITION:
            this.param[5] = exeParams[5] > 0 ? exeParams[5] - 1 : 0;
            break;
          case BRANCH_BUTTON:
            for(let i = 0; i < 11; i++) {
              this.param[i] = exeParams[i] > 0 ? exeParams[i] - 1 : 0;
            }
            break;
          case MOVE_STOP:
            this.actMode = 0;
            break;
          case MOVE_MOVE:
          case MOVE_TURN:
          case MOVE_BLOCK:
            this.actMode = exeParams[2] - 1;
            break;
          case MOVE_JUMP:
          case MOVE_FASTMOVE:
          case MOVE_FASTTURN:
          case MOVE_GRAPPLE:
          case MOVE_SPECIAL:
            this.actMode = exeParams[1] - 1;
            break;
          case MOVE_SELECTION_SHOOT:
            this.param[5] = exeParams[5] > 0 ? exeParams[5] - 1 : 0;
            this.param[7] = exeParams[7] > 0 ? exeParams[7] - 1 : 0;
            this.actMode = exeParams[8] - 1;
            break;
          case MOVE_DIRECTION_SHOOT:
            this.actMode = exeParams[4] - 1;
            break;
          case MOVE_GUNSIGHT_SHOOT:
            this.actMode = exeParams[3] - 1;
            break;
          case INSTRUCT_TARGET_LOCK:
            this.param[5] = exeParams[5] > 0 ? exeParams[5] - 1 : 0;
            this.param[6] = exeParams[6] > 0 ? exeParams[6] - 1 : 0;
            this.param[7] = exeParams[7] > 0 ? exeParams[7] - 1 : 0;
            break;
          case INSTRUCT_TARGET_AUTOTURN:
            this.param[0] = 0;
            this.param[1] = exeParams[0] / 2;
            this.param[2] = exeParams[1] / 2;
            this.param[3] = exeParams[2];
            this.param[4] = exeParams[3];
            this.param[5] = exeParams[4] - 1;
            break;
        }
        
        // 分割された数値をひとまとめに
        testArray = [
          THINK_CALCULATE_COUNTER,
          BRANCH_COUNTER,
        ];
        if(testArray.indexOf(this.type) >= 0) {
          let tempNumber = exeParams[4] * 1000000 + exeParams[5] * 10000 + exeParams[6] * 100 + exeParams[7];
          this.param[3] = (exeParams[3] === 1 ? -1 * tempNumber : tempNumber);
        }
        
        // 探査範囲の変換
        testArray = [
          BRANCH_SEARCH_AREA,
          BRANCH_SEARCH_MACHINE,
          BRANCH_SEARCH_OBJECT,
          BRANCH_SEARCH_BULLET,
          BRANCH_TARGET_POSITION,
          BRANCH_FROM_TARGET_POSITION,
          MOVE_SELECTION_SHOOT,
          INSTRUCT_TARGET_LOCK,
        ];
        if(testArray.indexOf(this.type) >= 0) {
          this.param[0] = exeParams[0] > 0 ? exeParams[0] - 1 : 0;
          if(this.param[0] === 0) {
            this.param[1] = exeParams[1] / 2;
            this.param[2] = exeParams[2] / 2;
          }
        }
  
        // 角度指定の変換
        testArray = [
          MOVE_DIRECTION_SHOOT,
          MOVE_GUNSIGHT_MOVE
        ];
        if(testArray.indexOf(this.type) >= 0) {
          this.param[0] = exeParams[0] / 2;
          this.param[1] = exeParams[1] / 2;
        }
      }
    }
  
    /*
    Routine = {
      posX,           描画開始位置のx座標
      posY,           描画開始位置のy座標
      countX,         x方向のチップ数
      countY,         y方向のチップ数
      chips[15][15],  チップデータ - Chipの配列
    }
    */
    function Routine(countX, countY, startPos) {
      this.chips = new Array(15);
      for(let y = 0; y < this.chips.length; y++) {
        this.chips[y] = new Array(15);
        for(let x = 0; x < this.chips[y].length; x++) {
          this.chips[y][x] = new Chip();
        }
      }
      
      this.init = function(countX, countY, startPos) {
        this.countX = countX;
        this.countY = countY;
        this.startPos = startPos;
  
        for(let y = 0; y < 15; y++) {
          for(let x = 0; x < 15; x++) {
            this.chips[y][x].init();
          }
        }
      };
      this.init(countX, countY, startPos);
    }
  
    /*
    Machine = {
      name,             機体名
      secretary,        機密レベル true/false
      emblemSrc,        エンブレム画像
      machineType,      機体タイプ
      cpuType,          CPU
      snapshotSrc,      スナップショット画像
      counterName[8],   カウンタの名前
      routines[3],      ルーチンデータ(0:main, 1:sub1, 2:sub2)
    }
    */
    function Machine() {
      let counterNameDefault = ['CNT-A', 'CNT-B', 'CNT-C', 'CNT-D', 'CNT-E', 'CNT-F', 'CNT-G', 'CNT-H'];
      
      this.routines = new Array(3);
      this.routines[0] = new Routine(15, 15, 0);
      this.routines[1] = new Routine(7, 7, 0);
      this.routines[2] = new Routine(7, 7, 0);
      
      this.init = function() {
        this.name = "";
        this.secretary = false;
        this.emblemSrc = "";
        this.machineType = 0;
        this.cpuType = 8;
        this.snapshotSrc = ""; // スナップショット画像
        this.counterName = counterNameDefault;
        this.routines[0].init(15, 15, 0);
        this.routines[1].init(7, 7, 0);
        this.routines[2].init(7, 7, 0);
      };
      this.init();
      
      this.setCheData = function(arrayBuffer) {
        if(arrayBuffer.byteLength !== 0x1ec0) {
          console.log('readCheMachine - Don\'t match as OKE data.');
          return false;
        }
        
        this.secretary   = (new Uint8Array(arrayBuffer, 0x20, 1)[0] === 1);
        this.name        = arrayBuffer2Str(arrayBuffer, 0x04, 24);
        this.emblemSrc   = arrayBuffer2EmblemSrc(arrayBuffer, 0x30);
        this.snapshotSrc = arrayBuffer2SnapshotSrc(arrayBuffer, 0x2e0);
        
        let machineCpuType = new Uint8Array(arrayBuffer, 0x270, 4 * 25);
        this.machineType = machineCpuType[0];
        this.cpuType = machineCpuType[4 * 18];
        for(let routineIdx = 0; routineIdx < 3; routineIdx++) {
          this.routines[routineIdx].countX = cpuSize[this.cpuType][routineIdx][0];
          this.routines[routineIdx].countY = cpuSize[this.cpuType][routineIdx][1];
          this.routines[routineIdx].startPos = new Uint8Array(arrayBuffer, 0x1a04 + 4 * routineIdx, 1)[0];
        }
        // カウンタ名
        for(let counterIdx = 0; counterIdx < 8; counterIdx++) {
          let counterNameChars = new Uint8Array(arrayBuffer, 0x1a10 + 6 * counterIdx, 5);
          this.counterName[counterIdx] = "";
          for(let charIdx = 0; charIdx < 5; charIdx++) {
            if(counterNameChars[charIdx] === 0) { break; } // 00はカウンタ名の終了コード
            this.counterName[counterIdx] += String.fromCharCode(counterNameChars[charIdx]);
          }
        }
        // チップ情報
        for(let y = 0; y < this.routines[0].countY; y++) {
          for(let x = 0; x < this.routines[0].countX; x++) {
            this.routines[0].chips[y][x].setCheData(arrayBuffer.slice(0xfe0 + 8 * this.routines[0].countX * y + 8 * x, 0xfe0 + 8 * this.routines[0].countX * y + 8 * (x + 1)));
          }
        }
        for(let routineIdx = 1; routineIdx < 3; routineIdx++) {
          for(let y = 0; y < this.routines[routineIdx].countY; y++) {
            for(let x = 0; x < this.routines[routineIdx].countX; x++) {
              this.routines[routineIdx].chips[y][x].setCheData(arrayBuffer.slice(0xfe0 + 8 * 15 * 15 + 8 * 7 * 7 * (routineIdx - 1) + 8 * this.routines[routineIdx].countX * y + 8 * x, 0xfe0 + 8 * 15 * 15 + 8 * 7 * 7 * (routineIdx - 1) + 8 * this.routines[routineIdx].countX * y + 8 * (x + 1)));
            }
          }
        }
      }
      
      // machine に 引数 exedata の情報をセットする
      this.setExeData = function(exedata) {
        let lines = exedata.split('\n');
        
        // begin EXEの探索
        let lineIdx = 0;
        for(; lineIdx < lines.length; lineIdx++) {
          if(/begin Exe/.test(lines[lineIdx])) { break; }
        }
        lineIdx++;
        // カウンタ名の取得
        for(; lineIdx < lines.length; lineIdx++) {
          let lineMatch = lines[lineIdx].match(/reg_name\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\s((?:[A-Z]|-|[0-9]){1,5})\sreg_end/);
          if(lineMatch) {
            for(let lineMatchIdx = 0; lineMatchIdx < 8; lineMatchIdx++) {
              this.counterName[lineMatchIdx] = lineMatch[lineMatchIdx + 1];
            }
            break;
          }
        }
        lineIdx++;
        // スタート位置の取得
        for(; lineIdx < lines.length; lineIdx++) {
          let lineMatch = lines[lineIdx].match(/([0-9]|1?[0-5])\s([0-9]|1?[0-5])\s([0-9]|1?[0-5])/)
          if(lineMatch) {
            this.routines[0].startPos = Number(lineMatch[1]) - 1;
            this.routines[1].startPos = Number(lineMatch[2]) - 1;
            this.routines[2].startPos = Number(lineMatch[3]) - 1;
            break;
          }
        }
        lineIdx++;
        // チップ情報の取得
        for(; lineIdx < lines.length; lineIdx++) {
          if(/end Exe/.test(lines[lineIdx])) { break; }
          
          let lineMatch = lines[lineIdx].match(/(main|sub1|sub2)\s0\s([0-9]+)\s([0-9]+)\s0\s([0-9]+)\s(-1|[0-7])\s(-1|[0-7])\s(-?[0-9]+)/);
          if(lineMatch) {
            let routineNum = 0;
            if(lineMatch[1] === 'main') {
              routineNum = 0;
            } else if (lineMatch[1] === 'sub1') {
              routineNum = 1;
            } else if (lineMatch[1] === 'sub2') {
              routineNum = 2;
            }
            let x = Number(lineMatch[2]) - 1;
            let y = Number(lineMatch[3]) - 1;
            if(x >= 0 && x < this.routines[routineNum].countX && y >= 0 && y < this.routines[routineNum].countY) {
              this.routines[routineNum].chips[y][x].setExeData(lines[lineIdx]);
            }
          }
        }
      }
    }
    
    /*
    Team = {
      machines[3],   Machineデータ(3機分)
      name,
      emblemSrc,
      owner,
      init(),
    }
    */
    function Team() {
      this.machines = new Array(3);
      for(let i = 0; i < this.machines.length; i++) {
        this.machines[i] = new Machine();
      }
  
      // 初期化
      this.init = function() {
        for(let i = 0; i < 3; i++) {
          this.machines[i].init();
        }
        this.name = "";
        this.emblemSrc = "";
        this.owner = "";
      };
      this.init();
      
      // 引数 arrayBuffer.byteLength = 0x340
      this.setCheData = function(arrayBuffer) {
        this.emblemSrc = arrayBuffer2EmblemSrc(arrayBuffer, 0x10);
        this.name      = arrayBuffer2Str(arrayBuffer, 0x250, 24);
        this.owner     = arrayBuffer2Str(arrayBuffer, 0x269, 24);
      }
    }
    
    /* ---------- 関数 ---------- */
    // 描画用メイン関数
    function render(machine) {
      console.log(machine);
      // 初期化処理
      let canvas = document.getElementById('offscreen');
      let context = canvas.getContext('2d');
      
      // チップの描画
      for(let routineIdx = 0; routineIdx < 3; routineIdx++) {
        let nowRoutine = machine.routines[routineIdx];
        let targetElm = document.getElementById('routine' + routineIdx);
  
        if(nowRoutine.countX === 0 || nowRoutine.countY === 0) {
          canvas.width = 0;
          canvas.height = 0;
          targetElm.src = "";
        } else {
          canvas.width  = boxMarginLeft + boxMarginRight  + boxWidth * nowRoutine.countX;
          canvas.height = boxMarginTop  + boxMarginBottom + boxWidth * nowRoutine.countY;
          // 画面のクリア
          context.clearRect(0, 0, canvas.width, canvas.height);
          // テキストの初期化
          context.font = '12pt CHE';
          context.fillStyle = '#ffffff';
  
          // 背景の描画
          drowBackground(context, 0, 0, nowRoutine.countX, nowRoutine.countY);
          drowBackground(context, 0, 0, nowRoutine.countX, nowRoutine.countY);
          // スタート位置の描画
          let imgChips = CHEbase.imgChips;
          if(routineIdx === 0) {
            context.drawImage(imgChips, chipWidth * 5, chipHeight * 0, chipWidth, chipHeight, boxMarginLeft + boxWidth * nowRoutine.startPos + chipMarginLeft, 0, chipWidth, chipHeight);
          } else if(routineIdx === 1) {
            context.drawImage(imgChips, chipWidth * 5, chipHeight * 1, chipWidth, chipHeight, boxMarginLeft + boxWidth * nowRoutine.startPos + chipMarginLeft, 0, chipWidth, chipHeight);
          } else if(routineIdx === 2) {
            context.drawImage(imgChips, chipWidth * 5, chipHeight * 2, chipWidth, chipHeight, boxMarginLeft + boxWidth * nowRoutine.startPos + chipMarginLeft, 0, chipWidth, chipHeight);
          }
          // チップの描画
          for(let j = 0; j < nowRoutine.countY; j++) {
            for(let k = 0; k < nowRoutine.countX; k++) {
              renderChip(context, machine.counterName, 0, 0, k, j, nowRoutine.chips[j][k]);
            }
          }
  
          // 矢印の描画
          for(let y = 0; y < nowRoutine.countY; y++) {
            for(let x = 0; x < nowRoutine.countX; x++) {
              let nowChip = nowRoutine.chips[y][x];
              // 青矢印
              if(nowChip.type >= 1) {
                if(nowChip.actMode === 0) {
                  drawArrow(context, imgChips, 0, 0, x, y, 1, nowChip.dir1);
                } else if(nowChip.actMode === 1) {
                  drawArrow(context, imgChips, 0, 0, x, y, 0, nowChip.dir1);
                }
                // 赤矢印
                if(nowChip.type >= 10 && nowChip.type <= 28) {
                  drawArrow(context, imgChips, 0, 0, x, y, 2, nowChip.dir2);
                }
              }
            }
          }
          targetElm.src = canvas.toDataURL();
        }
      }
      
      // カウンタ名の表示
      for(let counterIdx = 0; counterIdx < 8; counterIdx++) {
        let targetElm = document.getElementById('CNT' + counterIdx);
        targetElm.value = machine.counterName[counterIdx];
      }
    }
    
    /*
      背景の描画
      context  描画対象のcontext
      x      左上のx座標
      y      左上のy座標
      itemsX   x方向の個数
      itemsX   y方向の個数
    */
    function drowBackground(context, posX, posY, boxCountX, boxCountY) {
      let imgBack = CHEbase.imgBack;
      context.drawImage(imgBack, 0,                        0,                        boxMarginLeft,   boxMarginTop,    posX,                                        posY,                                        boxMarginLeft,  boxMarginTop);    // 左上
      context.drawImage(imgBack, boxMarginLeft + boxWidth, 0,                        boxMarginRight,  boxMarginTop,    posX + boxMarginLeft + boxWidth * boxCountX, posY,                                        boxMarginRight, boxMarginTop);    // 右上
      context.drawImage(imgBack, 0,                        boxMarginTop + boxHeight, boxMarginLeft,   boxMarginBottom, posX,                                        posY + boxMarginTop + boxHeight * boxCountY, boxMarginLeft,  boxMarginBottom); // 左下
      context.drawImage(imgBack, boxMarginLeft + boxWidth, boxMarginTop + boxHeight, boxMarginBottom, boxMarginRight,  posX + boxMarginLeft + boxWidth * boxCountX, posY + boxMarginTop + boxHeight * boxCountY, boxMarginRight, boxMarginBottom); // 右下
      for(let x = 0; x < boxCountX; x++) {
        context.drawImage(imgBack, boxMarginLeft, 0,                        boxWidth, boxMarginTop,    posX + boxMarginLeft + boxWidth * x, posY,                                        boxWidth, boxMarginTop);    // 上
        context.drawImage(imgBack, boxMarginLeft, boxMarginTop + boxHeight, boxWidth, boxMarginBottom, posX + boxMarginLeft + boxWidth * x, posY + boxMarginTop + boxHeight * boxCountY, boxWidth, boxMarginBottom); // 下
      }
      for(let y = 0; y < boxCountY; y++) {
        context.drawImage(imgBack, 0,                        boxMarginTop, boxMarginLeft,  boxWidth,  posX,                                        posY + boxMarginTop + boxHeight * y, boxMarginLeft,  boxHeight); // 左
        context.drawImage(imgBack, boxMarginLeft + boxWidth, boxMarginTop, boxMarginRight, boxHeight, posX + boxMarginLeft + boxWidth * boxCountX, posY + boxMarginTop + boxHeight * y, boxMarginRight, boxWidth);  // 右
        for(let x = 0; x < boxCountX; x++) {
          context.drawImage(imgBack, boxMarginLeft, boxMarginTop, boxWidth, boxHeight, posX + boxMarginLeft + boxWidth * x, posY + boxMarginTop + boxHeight * y, boxWidth, boxHeight); // 中身
        }
      }
    }
    
    function renderChip(context, counterName, globalX, globalY, boxPosX, boxPosY, nowChip) {
      let imgChips = CHEbase.imgChips;
      let nowChipX = globalX + boxMarginLeft + boxWidth * boxPosX + chipMarginLeft;
      let nowChipY = globalY + boxMarginTop + boxHeight * boxPosY + chipMarginTop;
      let patternX = 0,
        patternY = 0,
        param = 0,
        text = '',
        rotateAngle = 0, // 移動,ジャンプ,急速移動
        jumpYAdjust = 0, // ジャンプ
        chip3Text = ['ALL', 'MOVE', 'TURN', 'FIRE', 'ALL'],
        chip5Text = ['FRIEND', 'ENEMY', '', '', 'MY XPOS', 'MY YPOS', 'MY ZPOS', 'MY DIRECTION', 'TARGET NO,', 'TARGET AZIMUTH',
               'TARGET ELEVATION', 'TARGET XPOS', 'TARGET YPOS', 'TARGET ZPOS', 'TARGET DIRECTION', 'TARGET BODYCODE', 'TARGET ACTCODE', 'TARGET DISTANCE', 'TARGET DISTANCE XY', '',
               'MY NO,', 'MY ACTCODE', 'MY HEAT', 'MY HP', 'MY ENERGY', 'MY SPEED', 'TARGET SPEED', 'W1', 'W2', 'W3',
               'W4', 'W5', '', '', '', '', 'MY RADAR', '', 'BUTTON', 'ANALOG X',
               'ANALOG Y', 'GUNSIGHT DIRECTION', 'GUNSIGHT ELEVATION', 'GUNSIGHT NO,'],
        chip6Text = ['=', '+', '-', '*', '/', 'int', 'mod', 'abs', 'max', 'min', 'sqr', 'sin', 'cos', 'tan', 'atan', 'not', 'and', 'or', 'xor'],
        chip12Text = ['E', 'F', 'A', 'U'],
        chip15Text = ['HP', 'ENERGY', 'HEAT'],
        chip16Text = ['WAIT', 'MOVE', 'TURN', 'JUMP', 'FIRE', 'FIGHT', 'DEFENSE', 'SPECIAL', 'STUMBLE', 'TARGET LOCK', '', '', '', '', 'GUNSIGHT', 'AUTO TURN'],
        chip51Text = ['BACK VIEW', 'FRONT VIEW', 'LEFT VIEW', 'RIGHT VIEW', 'TOP VIEW', 'GUNSIGHT VIEW', 'PAIR VIEW', 'NEXT VIEW'];
  
      // チップ種別の判断
      let ctype = -1;
      if(nowChip.type === 0) {
        ctype = 0; // Returnチップ
      } else if(nowChip.type > 0 && nowChip.type < 10) {
        ctype = 1; // 思考チップ
      } else if(nowChip.type > 9 && nowChip.type < 29) {
        ctype = 2; // 条件分岐チップ
      } else if(nowChip.type > 28 && nowChip.type < 44) {
        ctype = 3; // 動作チップ
      } else if(nowChip.type > 43 && nowChip.type < 53) {
        ctype = 4; // 指示チップ
      } else {
        ctype = -1; // チップなし
        return; // 描画処理を省く
      }
      // チップ背景の描画
      context.drawImage(imgChips, chipWidth * ctype, 0, chipWidth, chipHeight, nowChipX, nowChipY, chipWidth, chipHeight);
      
      // チップ内容の描画
      context.textAlign = 'center';
      let testArray = [
        THINK_NOP,                    //  1
        THINK_STOP,                   //  2
        THINK_WAIT,                   //  3
        THINK_GOSUB,                  //  4
        THINK_SUBMIT_COUNTER,         //  7
        THINK_RECEIVE_COUNTER,        //  8
        THINK_BUTTON,                 //  9
        BRANCH_WEAPON_REMAIN,         // 10
        BRANCH_SEARCH_AREA,           // 11
        BRANCH_SEARCH_OBJECT,         // 13
        BRANCH_MY_CONDITION,          // 15
        BRANCH_RANDOM,                // 17
        BRANCH_TIME,                  // 18
        BRANCH_TARGET_POSITION,       // 19
        BRANCH_FROM_TARGET_POSITION,  // 20
        BRANCH_TARGET_MOVEMENT,       // 21
        BRANCH_TARGET_CODE,           // 22
        BRANCH_BE_TARGETLOCKED,       // 23
        BRANCH_TARGET_WEAPON,         // 24
        MOVE_STOP,                    // 29
        MOVE_SPECIAL,                 // 37
        MOVE_SELECTION_SHOOT,         // 38
        MOVE_DIRECTION_SHOOT,         // 39
        MOVE_GUNSIGHT_COUNTER,        // 40
        MOVE_GUNSIGHT_MOVE,           // 42
        MOVE_GUNSIGHT_SHOOT,          // 43
        INSTRUCT_SET_HEIGHT,          // 44
        INSTRUCT_LAUNCH_OPTION,       // 45
        INSTRUCT_TARGET_AUTOTURN,     // 47
        INSTRUCT_TARGET_PARTS,        // 48
        INSTRUCT_TARGET_COUNTER,      // 49
        INSTRUCT_TARGET_OFF           // 50
      ];
      if(testArray.indexOf(nowChip.type) >= 0) {
        context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, chipHeight, nowChipX, nowChipY, chipWidth, chipHeight);
      }
      switch (nowChip.type) { // 思考チップ
        case THINK_STOP: // 思考停止(フレーム数)
          text = nowChip.param[0];
          context.textAlign = 'right';
          context.fillText(text, nowChipX + 32, nowChipY + 40);
          break;
        case THINK_WAIT: // 3, 動作完了待ち(完了待ち動作(1～4))
          text = chip3Text[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case THINK_GOSUB: // サブルーチン(サブプログラム番号)
          context.drawImage(imgChips, chipWidth * 5 + 8 * nowChip.param[0], chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 38, 7, 9);
          break;
        case THINK_INPUT_COUNTER: // 5, カウンタ入力(カウンタ,入力データ)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          if(nowChip.param[1] === 2) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth / 2, chipHeight / 2, nowChipX + chipCenterX - 16, nowChipY + 46 - 20, chipWidth / 2, chipHeight / 2);
          } else if(nowChip.param[1] === 3) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 32, chipHeight * (parseInt((type - 1) / 6, 10) + 4), chipWidth / 2, chipHeight / 2, nowChipX + chipCenterX - 16, nowChipY + 46 - 20, chipWidth / 2, chipHeight / 2);
          } else if(nowChip.param[1] >= 32 && nowChip.param[1] <= 35) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + 32, chipWidth / 2, chipHeight / 2, nowChipX + chipCenterX - 16, nowChipY + 46 - 20, chipWidth / 2, chipHeight / 2);
            context.drawImage(imgChips, chipWidth * 5 + 8 * (nowChip.param[1] - 33), chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 42, 7, 9);
          } else if(nowChip.param[1] === 37) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 32, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + 32, chipWidth / 2, chipHeight / 2, nowChipX + chipCenterX - 16, nowChipY + 46 - 20, chipWidth / 2, chipHeight / 2);
          } else {
            text = chip5Text[nowChip.param[1]];
            wrapTextMid(context, text, nowChipX + chipCenterX, nowChipY + 46, 8);
          }
          break;
        case THINK_CALCULATE_COUNTER: // カウンタ操作(カウンタ,演算子(1～19),パラメータ,正負(0:+,1:-),5桁目,3-4桁目,2-1桁目,小数点以下2桁)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          text = chip6Text[nowChip.param[1]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 34);
          if(nowChip.param[2] >= 0 && nowChip.param[2] < 8) {
            text = counterName[nowChip.param[2]];
          } else if(nowChip.param[2] === 8) {
            text = parseInt(nowChip.param[3] / 100, 10) + (Math.abs(nowChip.param[3] % 100) > 0 ? "." + ("0" + nowChip.param[3].toString()).slice(-2) : "");
          } else {
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 7: // カウンタ送信(カウンタ,チャンネル)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          text = nowChip.param[1] + 1;
          context.fillText(text, nowChipX + chipCenterX + 18, nowChipY + 46);
          break;
        case 8: // カウンタ受信(カウンタ,チャンネル)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          text = nowChip.param[1] + 1;
          context.fillText(text, nowChipX + chipCenterX + 18, nowChipY + 46);
          break;
  
          /* 条件分岐チップ */
        case 10: // 残数判断(武装/オプション番号(1～10),残数,分岐条件)
          if(nowChip.param[0] === 0) {
            text = 'WC';
          } else if(nowChip.param[0] <= 5) {
            text = 'W' + (nowChip.param[0]);
          } else {
            text = 'O' + (nowChip.param[0] - 5);
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 37);
          text = nowChip.param[1] + (nowChip.param[2] === 2 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 50);
          break;
        case 11: // 戦闘エリア判断(座標系,方位,幅,遠距離,近距離)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 42, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          break;
        case 12: // 機体探査(座標系,方位,幅,遠距離,近距離,部隊属性,機体種別(1～6),機体数,分岐条件)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          text = chip12Text[nowChip.param[5]];
          // 機体種別
          param = nowChip.param[6];
          if(param === 5) {
            param = 6;
          }
          context.drawImage(imgChips, chipWidth * 5 + 32 * (param % 2), chipHeight * 5 + 16 * parseInt(param / 2, 10), 32, 16, nowChipX + chipCenterX - 16, nowChipY + 8, 32, 16);
          // 機体数、分岐条件
          text += (nowChip.param[7]) + (nowChip.param[8] === 1 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 54);
          break;
        case 13: // 障害物探査(座標系,方位,幅,遠距離,近距離,高さ(0～30),分岐条件)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          text = 'H ' + nowChip.param[5] + '@' + (nowChip.param[6] === 1 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 54);
          break;
        case 14: // 発射物探査(座標系,方位,幅,遠距離,近距離,発射物(10:ミサイル),弾数,分岐条件)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          // 発射物
          if(nowChip.param[5] === 2) { // パルス弾
            context.drawImage(imgChips, chipWidth, chipHeight * 8 + 16, 32, 16, nowChipX + chipCenterX - 16, nowChipY + 8, 32, 16);
          } else if(nowChip.param[5] === 3) { // ナパーム弾
            context.drawImage(imgChips, chipWidth + 32, chipHeight * 8 + 16, 32, 16, nowChipX + chipCenterX - 16, nowChipY + 8, 32, 16);
          } else {
            patternX = 16 * (nowChip.param[5] % 4);
            patternY = 16 * parseInt(nowChip.param[5] / 4, 10);
            context.drawImage(imgChips, chipWidth + patternX, chipHeight * 6 + patternY, 16, 16, nowChipX + chipCenterX - 8, nowChipY + 8, 16, 16);
          }
          text = nowChip.param[6] + (nowChip.param[7] === 1 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 54);
          break;
        case 15: // 状態判断(種類(1:耐久度,2:エネルギー残量,3:耐久熱量),比率,分岐条件)
          text = chip15Text[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX + 1, nowChipY + 35);
          text = nowChip.param[1] + '%' + (nowChip.param[2] === 1 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX + 1, nowChipY + 50);
          break;
        case 16: // 動作判断(動作状態(1～10,11～14,15,16,17～21));
          context.drawImage(imgChips, chipWidth * 3, chipHeight * 6, chipWidth, chipHeight / 2, nowChipX, nowChipY, chipWidth, chipHeight / 2);
          if(nowChip.param[0] < 10 || nowChip.param[0] === 14 || nowChip.param[0] === 15) {
            text = chip16Text[nowChip.param[0]];
            wrapTextMid(context, text, nowChipX + chipCenterX, nowChipY + 46, 9);
          } else if(nowChip.param[0] < 14) {
            context.drawImage(imgChips, chipWidth * 3, chipHeight * 6 + chipHeight / 2, chipWidth, chipHeight / 4, nowChipX, nowChipY + chipHeight / 2, chipWidth, chipHeight / 4);
            context.drawImage(imgChips, chipWidth * 5 + 8 * (nowChip.param[0] - 10), chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 43, 7, 9);
          } else {
            context.drawImage(imgChips, chipWidth * 3, chipHeight * 6 + chipHeight / 2 + chipHeight / 4, chipWidth, chipHeight / 4, nowChipX, nowChipY + chipHeight / 2, chipWidth, chipHeight / 4);
            context.drawImage(imgChips, chipWidth * 5 + 8 * (nowChip.param[0] - 16), chipHeight * 3, 8, 9, nowChipX + chipCenterX - 4, nowChipY + chipCenterY + 12, 8, 9);
          }
          break;
        case 17: // ランダム分岐(確率)
          text = nowChip.param[0] + '%';
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 18: // 時間判断(基準時間(1,2),秒数,分岐条件)
          switch (nowChip.param[0]) {
          case 0:
            text = 'START}';
            break;
          case 1:
            text = '}END';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 34);
          text = nowChip.param[1] + 's' + (nowChip.param[2] === 1 ? '>' : '<');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 50);
          break;
        case 19: // ターゲット位置判断(座標系,方位,幅,遠距離,近距離)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 40, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          break;
        case 20: // ターゲットからの位置判断(座標系,方位,幅,遠距離,近距離,基準部位(1,2))
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          switch (nowChip.param[5]) {
          case 0:
            text = 'BODY';
            break;
          case 1:
            text = 'TURRET';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 54);
          break;
        case 21: // ターゲット動作判断(動作状態(1～12))
          switch (nowChip.param[0]) {
          case 0:
            text = 'WAIT';
            break;
          case 1:
            text = 'MOVE';
            break;
          case 2:
            text = 'TURN';
            break;
          case 3:
            text = 'JUMP';
            break;
          case 4:
            text = 'FIRE';
            break;
          case 5:
            text = 'FIGHT';
            break;
          case 6:
            text = 'DEFENSE';
            break;
          case 7:
            text = 'SPECIAL';
            break;
          case 8:
            text = 'STUMBLE';
            break;
          case 9:
            text = 'SHIELD';
            break;
          case 10:
            text = 'OVERHEAT';
            break;
          case 11:
            text = '~LOCK';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 22: // ターゲットコード判断(機体コード(0～42))
          text = nowChip.param[0];
          context.fillText(text, nowChipX + chipCenterX + 13, nowChipY + 46);
          break;
        case 23: // ターゲットロック警戒判断(被ロック数)
          context.drawImage(imgChips, chipWidth * 5 + 8 * (nowChip.param[0]), chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 38, 7, 9);
          break;
        case 24: // ターゲット武器判断(武装番号(1～5),武器種別(1～))
          text = nowChip.param[0] + 1;
          context.fillText(text, nowChipX + chipCenterX - 6, nowChipY + 46);
          // 発射物
          switch (nowChip.param[1]) {
          case 0:
            context.drawImage(imgChips, chipWidth, chipHeight * 8, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 1:
            context.drawImage(imgChips, chipWidth + 16 * 2, chipHeight * 6, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 2:
            context.drawImage(imgChips, chipWidth + 16, chipHeight * 6, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 3:
            context.drawImage(imgChips, chipWidth, chipHeight * 8 + 16, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 4:
            context.drawImage(imgChips, chipWidth + 32, chipHeight * 8 + 16, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 5:
            context.drawImage(imgChips, chipWidth, chipHeight * 8 + 16 * 2, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 6:
            context.drawImage(imgChips, chipWidth + 32, chipHeight * 8 + 16 * 2, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 7:
            context.drawImage(imgChips, chipWidth, chipHeight * 6, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 8:
            context.drawImage(imgChips, chipWidth + 16 * 3, chipHeight * 6, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 9:
            context.drawImage(imgChips, chipWidth, chipHeight * 6 + 16, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 10:
            context.drawImage(imgChips, chipWidth + 16, chipHeight * 6 + 16, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 11:
            context.drawImage(imgChips, chipWidth + 16 * 2, chipHeight * 6 + 16, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 12:
            context.drawImage(imgChips, chipWidth + 16 * 3, chipHeight * 6 + 16, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 13:
            context.drawImage(imgChips, chipWidth, chipHeight * 6 + 16 * 2, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 14:
            context.drawImage(imgChips, chipWidth + 16, chipHeight * 6 + 16 * 2, 16, 16, nowChipX + chipCenterX + 2, nowChipY + chipCenterY + 3, 16, 16);
            break;
          case 15:
            context.drawImage(imgChips, chipWidth, chipHeight * 8 + 16 * 3, 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterY + 3, 32, 16);
            break;
          case 16:
            context.fillText('WB', nowChipX + chipCenterX + 9, nowChipY + chipCenterY + 15);
            break;
          }
          break;
        case 25: // ターゲットまでの射線判断(障害判定(1～4))
          patternX = 32 * (nowChip.param[0] % 2);
          patternY = 32 * parseInt(nowChip.param[0] / 2, 10);
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + patternX, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + patternY, chipWidth / 2, chipHeight / 2, nowChipX + chipCenterX - 16, nowChipY + chipCenterY - 16, chipWidth / 2, chipHeight / 2);
          break;
        case 26: // カウンタ判断(カウンタ,分岐条件,パラメータ,正負(0:+,1:-),5桁目,3-4桁目,2-1桁目,小数点以下2桁)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          if(nowChip.param[2] >= 0 && nowChip.param[2] < 8) {
            text = counterName[nowChip.param[2]];
          } else if(nowChip.param[2] === 8) {
            text = parseInt(nowChip.param[3] / 100, 10) + (Math.abs(nowChip.param[3] % 100) > 0 ? "." + ("0" + nowChip.param[3].toString()).slice(-2) : "");
            if(nowChip.param[1] === 0) {
              text += '<'; // 以上
            } else if(nowChip.param[1] === 1) {
              text += '>'; // 以下
            } else if(nowChip.param[1] === 2) {
              text += ''; // 同じ
            }
          } else {
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 27: // ボタン判定(上(1:OFF,2:ON),下,右,左,○,×,△,□,L,R,ボタン状態(1～5))
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, chipHeight / 2, nowChipX, nowChipY + 10, chipWidth, chipHeight / 2);
          // ON状態のボタン描画
          if(nowChip.param[0] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 15, chipHeight * 8 + chipHeight / 2 + 10, 6, 8, nowChipX + 15, nowChipY + 10 + 10, 6, 8);
          } // 上
          if(nowChip.param[1] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 15, chipHeight * 8 + chipHeight / 2 + 24, 6, 8, nowChipX + 15, nowChipY + 10 + 24, 6, 8);
          } // 下
          if(nowChip.param[2] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 21, chipHeight * 8 + chipHeight / 2 + 18, 8, 6, nowChipX + 21, nowChipY + 10 + 18, 8, 6);
          } // 右
          if(nowChip.param[3] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 7, chipHeight * 8 + chipHeight / 2 + 18, 8, 6, nowChipX + 7, nowChipY + 10 + 18, 8, 6);
          } //左
          if(nowChip.param[4] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 48, chipHeight * 8 + chipHeight / 2 + 16, 8, 8, nowChipX + 48, nowChipY + 10 + 16, 8, 8);
          } // ○
          if(nowChip.param[5] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 41, chipHeight * 8 + chipHeight / 2 + 23, 8, 8, nowChipX + 41, nowChipY + 10 + 23, 8, 8);
          } // ×
          if(nowChip.param[6] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 41, chipHeight * 8 + chipHeight / 2 + 9, 8, 8, nowChipX + 41, nowChipY + 10 + 9, 8, 8);
          } // △
          if(nowChip.param[7] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 34, chipHeight * 8 + chipHeight / 2 + 16, 8, 8, nowChipX + 34, nowChipY + 10 + 16, 8, 8);
          } // □
          if(nowChip.param[8] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 35, chipHeight * 8 + chipHeight / 2, 18, 6, nowChipX + 35, nowChipY + 10, 18, 6);
          } // L
          if(nowChip.param[9] === 1) {
            context.drawImage(imgChips, chipWidth * 2 + 10, chipHeight * 8 + chipHeight / 2, 18, 6, nowChipX + 10, nowChipY + 10, 18, 6);
          } // R
          switch (nowChip.param[10]) {
          case 0:
            text = 'ALL';
            break;
          case 1:
            text = 'ANY';
            break;
          case 2:
            text = 'ANY F';
            break;
          case 3:
            text = 'ANY L';
            break;
          case 4:
            text = 'ANY C';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX + 1, nowChipY + 54);
          break;
        case 28: // アナログ判定(アナログ軸(1:X軸,2:Y軸),アナログ値,分岐条件)
          // アナログ軸
          if(nowChip.param[0] === 0) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 42, chipHeight, nowChipX, nowChipY, 42, chipHeight);
          } else {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 42, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 20, chipHeight, nowChipX + 22, nowChipY, 20, chipHeight);
          }
  
          text = nowChip.param[1];
          if(nowChip.param[2] === 0) {
            text += '<'; // 以上
          } else if(nowChip.param[2] === 1) {
            text += '>'; // 以下
          } else if(nowChip.param[2] === 2) {
            text += ''; // 同じ
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
  
          /* 動作チップ */
        case 29: // 動作中止(中止動作(1～4))
          switch (nowChip.param[0]) {
          case 0:
            text = 'ALL';
            break;
          case 1:
            text = 'MOVE';
            break;
          case 2:
            text = 'TURN';
            break;
          case 3:
            text = 'FIRE';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 30: // 移動(移動方向(1～8),移動距離,実行モード)
          switch (nowChip.param[0]) {
          case 0:
            rotateAngle = -Math.PI / 2;
            break; // 左
          case 1:
            rotateAngle = Math.PI / 2;
            break; // 右
          case 2:
            rotateAngle = 0;
            break; // 前
          case 3:
            rotateAngle = Math.PI;
            break; // 後
          case 4:
            rotateAngle = 0;
            break; // 左前
          case 5:
            rotateAngle = Math.PI / 2;
            break; // 右前
          case 6:
            rotateAngle = -Math.PI / 2;
            break; // 左後
          case 7:
            rotateAngle = Math.PI;
            break; // 右後
          default:
            rotateAngle = 0;
          }
          // イメージの回転
          context.save();
          context.translate(nowChipX + chipCenterX, nowChipY + 20);
          context.rotate(rotateAngle);
          context.translate(-16, -16);
          if(nowChip.param[0] > 4) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 32, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 32, 32, 0, 0, 32, 32);
          } else {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 32, 32, 0, 0, 32, 32);
          }
          context.restore();
  
          text = (nowChip.param[1] === 0 ? '$' : nowChip.param[1] + '@');
          context.fillText(text, nowChipX + chipCenterX, nowChipY + chipCenterY + 15);
          break;
        case 31: // 旋回(旋回方向(0:左,1:右),旋回角度,実行モード)
          // イメージの左右反転
          context.save();
          context.translate(nowChipX + chipCenterX, 0);
          context.scale(nowChip.param[0] === 0 ? 1 : -1, 1);
          context.translate(-nowChipX - chipCenterX, 0);
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, chipHeight, nowChipX, nowChipY, chipWidth, chipHeight);
          context.restore();
  
          text = nowChip.param[1] === 0 ? '$' : nowChip.param[1] + '\'';
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 32: // ジャンプ動作(方向(1～9),実行モード)
          switch (nowChip.param[0]) {
          case 0:
            rotateAngle = -Math.PI / 2;
            jumpYAdjust = 0;
            break; // 左
          case 1:
            rotateAngle = Math.PI / 2;
            jumpYAdjust = 0;
            break; // 右
          case 2:
            rotateAngle = 0;
            jumpYAdjust = 2;
            break; // 前
          case 3:
            rotateAngle = Math.PI;
            jumpYAdjust = -10;
            break; // 後
          case 4:
            rotateAngle = 0;
            jumpYAdjust = 8;
            break; // 左前
          case 5:
            rotateAngle = Math.PI / 2;
            jumpYAdjust = 8;
            break; // 右前
          case 6:
            rotateAngle = -Math.PI / 2;
            jumpYAdjust = -12;
            break; // 左後
          case 7:
            rotateAngle = Math.PI;
            jumpYAdjust = -12;
            break; // 右後
          case 8:
            rotateAngle = 0;
            jumpYAdjust = -4;
            break; // その場
          default:
            rotateAngle = 0;
            jumpYAdjust = 0;
          }
          // Jumpの描画
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, chipHeight, nowChipX, nowChipY + jumpYAdjust, chipWidth, chipHeight);
          // Jumpの形を切り抜き
          context.save();
          context.beginPath();
          context.moveTo(nowChipX, nowChipY);
          context.lineTo(nowChipX + chipWidth, nowChipY);
          context.lineTo(nowChipX + chipWidth, nowChipY + 31 + jumpYAdjust);
          context.lineTo(nowChipX + 47, nowChipY + 31 + jumpYAdjust);
          context.lineTo(nowChipX + 22, nowChipY + 31 + jumpYAdjust);
          context.lineTo(nowChipX + 22, nowChipY + 29 + jumpYAdjust);
          context.lineTo(nowChipX + 18, nowChipY + 29 + jumpYAdjust);
          context.lineTo(nowChipX + 18, nowChipY + 37 + jumpYAdjust);
          context.lineTo(nowChipX + 15, nowChipY + 37 + jumpYAdjust);
          context.lineTo(nowChipX + 15, nowChipY + 40 + jumpYAdjust);
          context.lineTo(nowChipX + 39, nowChipY + 40 + jumpYAdjust);
          context.lineTo(nowChipX + 39, nowChipY + 43 + jumpYAdjust);
          context.lineTo(nowChipX + 43, nowChipY + 43 + jumpYAdjust);
          context.lineTo(nowChipX + 43, nowChipY + 40 + jumpYAdjust);
          context.lineTo(nowChipX + 47, nowChipY + 40 + jumpYAdjust);
          context.lineTo(nowChipX + 47, nowChipY + 31 + jumpYAdjust);
          context.lineTo(nowChipX + chipWidth, nowChipY + 31 + jumpYAdjust);
          context.lineTo(nowChipX + chipWidth, nowChipY + chipHeight);
          context.lineTo(nowChipX, nowChipY + chipHeight);
          context.closePath();
          context.clip();
          // イメージの回転
          if(nowChip.param[0] === 8) {
            // その場でジャンプの場合は円を描く
            context.beginPath();
            context.arc(nowChipX + chipCenterX, nowChipY + chipCenterY, 11, 0, Math.PI * 2, false);
            context.fill();
          } else {
            context.translate(nowChipX + chipCenterX, nowChipY + chipCenterY);
            context.rotate(rotateAngle);
            context.translate(-16, -16);
            if(nowChip.param[0] > 3) {
              context.drawImage(imgChips, chipWidth * 5 + 32, chipHeight * 8, 32, 32, 0, 0, 32, 32);
            } else {
              context.drawImage(imgChips, chipWidth * 5, chipHeight * 8, 32, 32, 0, 0, 32, 32);
            }
          }
          context.restore();
          break;
        case 33: // 急速移動(移動方向(0～7),実行モード)
          switch (nowChip.param[0]) {
          case 0:
            rotateAngle = -Math.PI / 2;
            break; // 左
          case 1:
            rotateAngle = Math.PI / 2;
            break; // 右
          case 2:
            rotateAngle = 0;
            break; // 前
          case 3:
            rotateAngle = Math.PI;
            break; // 後
          case 4:
            rotateAngle = 0;
            break; // 左前
          case 5:
            rotateAngle = Math.PI / 2;
            break; // 右前
          case 6:
            rotateAngle = -Math.PI / 2;
            break; // 左後
          case 7:
            rotateAngle = Math.PI;
            break; // 右後
          default:
            rotateAngle = 0;
          }
          // イメージの回転
          context.save();
          context.translate(nowChipX + chipCenterX, nowChipY + chipCenterY);
          context.rotate(rotateAngle);
          context.translate(-16, -16);
          if(nowChip.param[0] > 3) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 32, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 32, 32, 2, 2, 32, 32);
          } else {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 32, 32, 0, 0, 32, 32);
          }
          context.restore();
          break;
        case 34: // 急速旋回(旋回方向(0:左,1:右),実行モード)
          // イメージの左右反転
          context.save();
          context.translate(nowChipX + chipCenterX, 0);
          context.scale(nowChip.param[0] === 0 ? 1 : -1, 1);
          context.translate(-nowChipX - chipCenterX, 0);
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, chipHeight, nowChipX, nowChipY, chipWidth, chipHeight);
          context.restore();
          break;
        case 35: // 格闘(格闘動作(0～3),実行モード)
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + 8, chipWidth, chipHeight - 8, nowChipX, nowChipY + 8, chipWidth, chipHeight - 8);
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + 16 * nowChip.param[0], chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), 16, 7, nowChipX + 33, nowChipY + 37, 16, 7);
          break;
          //ここまで
        case 36: // ガード動作(種類(0:ガード/1:伏せ),フレーム数,実行モード)
          // ガード動作
          if(nowChip.param[0] === 0) {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth / 2, chipHeight / 2, nowChipX + 16, nowChipY, chipWidth / 2, chipHeight / 2);
          } else {
            context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6) + chipWidth / 2, chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth / 2, chipHeight / 2, nowChipX + 16, nowChipY, chipWidth / 2, chipHeight / 2);
          }
          // フレーム数
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + chipHeight / 2, chipWidth, chipHeight / 2, nowChipX, nowChipY + chipHeight / 2, chipWidth, chipHeight / 2);
          context.textAlign = 'right';
          text = nowChip.param[1];
          context.fillText(text, nowChipX + 28, nowChipY + 46);
          break;
        case 37: // 特殊アクション(特殊動作(0～2),実行モード)
          context.drawImage(imgChips, chipWidth * 5 + 8 * nowChip.param[0], chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 38, 7, 9);
          break;
        case 38: // 選択射撃(座標系,方位,幅,遠距離,近距離,武装番号(0～5),発射数,射撃モード(1～3),実行モード)
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          // 武装番号
          // TODO: 要確認
          text = nowChip.param[5] === 0 ? "C" : nowChip.param[5];
          context.fillText(text, nowChipX + 25, nowChipY + 54);
          // 発射数
          text = nowChip.param[6];
          context.fillText(text, nowChipX + 40, nowChipY + 54);
          // 射撃モード
          switch (nowChip.param[7]) {
          case 0:
            text = '';
            break;
          case 1:
            text = 'R';
            break;
          case 2:
            text = 'S';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX + 15, nowChipY + chipCenterY - 8);
          break;
        case 39: // 方向指定発射(方位,仰角,武装番号(1～6),発射数,実行モード)
          drawFireDirection(context, nowChipX + 23, nowChipY + 35, 7, nowChip.param[0]);
          drawFireElevation(context, nowChipX + 36, nowChipY + 35, 7, nowChip.param[1]);
          text = nowChip.param[2] === 0 ? 'C' : nowChip.param[2];
          context.fillText(text, nowChipX + 25, nowChipY + 54);
          text = nowChip.param[3];
          context.fillText(text, nowChipX + 40, nowChipY + 54);
          break;
        case 40: // カウンタ指定ガンサイト移動(基準方向(0,1),方位カウンタ,仰角カウンタ)
          text = nowChip.param[0] === 0 ? 'F' : 'N';
          context.fillText(text, nowChipX + 37, nowChipY + 31);
          text = counterName[nowChip.param[1]];
          context.fillText(text, nowChipX + 38, nowChipY + 43);
          text = counterName[nowChip.param[2]];
          context.fillText(text, nowChipX + 38, nowChipY + 54);
          break;
        case 41: // ガンサイト起動(武装番号(1～7))
          context.drawImage(imgChips, chipWidth * 4, chipHeight * 10 + 8, chipWidth, chipHeight - 8, nowChipX, nowChipY + 8, chipWidth, chipHeight - 8);
          if(nowChip.param[0] === 5) {
            // ガンサイトOFF時の処理
            context.drawImage(imgChips, chipWidth * 4 + 16, chipHeight * 10, 24, 8, nowChipX + chipCenterX + 4, nowChipY + chipCenterY - 8, 24, 8);
          } else {
            context.drawImage(imgChips, chipWidth * 4, chipHeight * 10, 16, 8, nowChipX + chipCenterX + 4, nowChipY + chipCenterY - 8, 16, 8);
            text = (nowChip.param[0] === 6 ? 'NEXT' : 'W' + (nowChip.param[0] + 1));
            context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          }
          break;
        case 42: // ガンサイト移動(基準方向(0,1),方位指定,仰角指定) - 何故か小数点以下1桁
          text = (nowChip.param[0] === 0 ? 'F' : 'N');
          context.fillText(text, nowChipX + 37, nowChipY + 31);
          drawFireDirection(context, nowChipX + 23, nowChipY + 43, 7, nowChip.param[1]);
          drawFireElevation(context, nowChipX + 36, nowChipY + 43, 7, nowChip.param[2]);
          break;
        case 43: // ガンサイト射撃(起動武装(0～5),射撃モード(0～2),発射数,実行モード)
          // 起動武装
          text = nowChip.param[0] === 0 ? 'C' : nowChip.param[0];
          context.fillText(text, nowChipX + 25, nowChipY + 46);
          // 射撃モード
          switch (nowChip.param[1]) {
          case 0:
            text = '';
            break;
          case 1:
            text = 'R';
            break;
          case 2:
            text = 'S';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + chipCenterX + 16, nowChipY + chipCenterY);
          // 発射数
          text = nowChip.param[2];
          context.fillText(text, nowChipX + 40, nowChipY + 46);
          break;
          // 指示チップ
        case 44: // 飛行高度設定(タイプ(0～2),高度指定)
          switch (nowChip.param[0]) {
          case 0:
            text = '10@<';
            break;
          case 1:
            text = '10@>';
            break;
          case 2:
            text = nowChip.param[1] + '@';
            break;
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 45: // オプション装置起動(オプション番号)
          context.drawImage(imgChips, chipWidth * 5 + 8 * (nowChip.param[0]), chipHeight * 3, 7, 9, nowChipX + chipCenterX - 4, nowChipY + 38, 7, 9);
          break;
        case 46: // ターゲットロック(座標系,方位,幅,遠距離,近距離,優先順位(0～2),部隊属性,機体種別(0～6))
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, 32, nowChipX, nowChipY, chipWidth, 32);
          drawSearchAreaPlus(context, nowChip.param[0], nowChipX + 16, nowChipY + 35, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
          // 優先順位
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4) + 32 + 8 * nowChip.param[5], 32, 8, nowChipX + chipCenterX + 2, nowChipY + chipCenterY - 13, 32, 8);
          // 部隊属性
          switch (nowChip.param[6]) {
          case 0:
            text = 'E';
            break;
          case 1:
            text = 'F';
            break;
          case 2:
            text = 'A';
            break;
          default:
            text = '';
          }
          context.fillText(text, nowChipX + 25, nowChipY + 57);
          // 機体種別
          context.drawImage(imgChips, chipWidth * 5 + 32 * (nowChip.param[7] % 2), chipHeight * 5 + 16 * parseInt(nowChip.param[7] / 2, 10), 32, 16, nowChipX + chipCenterX - 6, nowChipY + chipCenterX + 13, 32, 16);
          break;
        case 47: // ターゲットへの自動旋回(方位,幅,遠距離,近距離,自動旋回(0:解除,1:作動))
          if(nowChip.param[5] === 1) {
            drawSearchArea(context, nowChip.param[0], nowChipX + 18, nowChipY + 42, 7, nowChip.param[1], nowChip.param[2], nowChip.param[3], nowChip.param[4]);
            text = 'ON';
            context.fillText(text, nowChipX + 43, nowChipY + 46);
          } else {
            text = 'OFF';
            context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          }
          break;
        case 48: // 照準箇所の変更(照準箇所(0～5))
          if(nowChip.param[0] === 0) {
            text = 'BODY';
          } else {
            text = 'W' + nowChip.param[0];
          }
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 46);
          break;
        case 49: // カウンタ指定ターゲットロック(カウンタ)
          text = counterName[nowChip.param[0]];
          context.fillText(text, nowChipX + chipCenterX, nowChipY + 24);
          break;
        case 51: // カメラビュー変更(カメラビュー(0～7),カメラ距離(0～2))
          context.drawImage(imgChips, chipWidth * ((nowChip.type - 1) % 6), chipHeight * (parseInt((nowChip.type - 1) / 6, 10) + 4), chipWidth, 32, nowChipX, nowChipY, chipWidth, 32);
          text = chip51Text[nowChip.param[0]];
          wrapTextMid(context, text, nowChipX + chipCenterX, nowChipY + 44, 8);
          // カメラ距離
          context.drawImage(imgChips, chipWidth * 2 + 8 * nowChip.param[1], chipHeight * 12 + 32, 8, 8, nowChipX + chipCenterX + 9, nowChipY + chipCenterY - 11, 8, 8);
          break;
        case 52: // アラート(アラート音(0～5),アラート表示(0～5),アラート時間(1～5))
          // アラート音
          if(nowChip.param[0] !== 5) {
            context.drawImage(imgChips, chipWidth * 3, chipHeight * 12 + 38, 32, 9, nowChipX, nowChipY + 38, 32, 9);
            text = nowChip.param[0] + 1;
            context.fillText(text, nowChipX + 26, nowChipY + 46);
          }
          // アラート表示
          if(nowChip.param[1] <= 4) {
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX - 16, chipHeight * 12 + 14, 32, 9, nowChipX + chipCenterX - 16, nowChipY + 14, 32, 9);
          }
          switch (nowChip.param[1]) {
          case 0:
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX + 16, chipHeight * 12 + 10, 10, 16, nowChipX + chipCenterX + 16, nowChipY + 10, 10, 16);
            break;
          case 1:
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX - 26, chipHeight * 12 + 10, 10, 16, nowChipX + chipCenterX - 26, nowChipY + 10, 10, 16);
            break;
          case 2:
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX - 8, chipHeight * 12 + 2, 16, 10, nowChipX + chipCenterX - 8, nowChipY + 2, 16, 10);
            break;
          case 3:
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX - 8, chipHeight * 12 + 24, 16, 10, nowChipX + chipCenterX - 8, nowChipY + 24, 16, 10);
            break;
          case 5:
            context.drawImage(imgChips, chipWidth * 3 + chipCenterX - 16, chipHeight * 12 + 50, 32, 9, nowChipX + chipCenterX - 16, nowChipY + 14, 32, 9);
            break;
          }
          // アラート時間
          text = nowChip.param[2];
          context.fillText(text, nowChipX + 38, nowChipY + 46);
          context.drawImage(imgChips, chipWidth * 3 + chipCenterX, chipHeight * 12 + 38, 32, 8, nowChipX + chipCenterX, nowChipY + 38, 32, 8);
          break;
      }
    }
    
    /* 
      座標系の描画 
      context  描画対象のcontext
      type  座標系 (0:極座標系 1:直交座標系)
      x    中心のx座標
      y    中心のy座標
      radius  半径
      param1  極座標系:方位(0～360),    直交座標系:横幅(m)
      param2  極座標系:幅(0～360),    直交座標系:縦幅(m)
      param3  極座標系:遠距離(0～110),  直交座標系:X位置(m)
      param4  極座標系:近距離(0～110),  直交座標系:Y位置(m)
    */
    function drawSearchArea(context, type, posX, posY, radius, param1, param2, param3, param4) {
      'use strict';
      var scale = 800;
  
      context.lineWidth = 1;
      context.strokeStyle = '#ffffff';
      if(type === 0) {
        param1 *= 2;
        param2 *= 2;
        // 極座標系
        context.beginPath();
        context.arc(posX + 0.5, posY + 0.5, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.beginPath();
        context.arc(posX + 0.5, posY + 0.5, radius, (-90 + param1 - param2 / 2) * Math.PI / 180, (-90 + param1 + param2 / 2) * Math.PI / 180, false);
        context.arc(posX + 0.5, posY + 0.5, param3 === 0 ? 0 : param4 * radius / param3, (-90 + param1 + param2 / 2) * Math.PI / 180, (-90 + param1 - param2 / 2) * Math.PI / 180, true);
        context.closePath();
        context.fill();
      } else if(type === 1) {
        // 直交座標系
        context.strokeRect(posX - radius + 0.5, posY - radius + 0.5, radius * 2, radius * 2);
        context.beginPath();
        context.moveTo(posX - radius + 0.5, posY + 0.5);
        context.lineTo(posX + radius + 0.5, posY + 0.5);
        context.stroke();
        context.beginPath();
        context.moveTo(posX + 0.5, posY - radius + 0.5);
        context.lineTo(posX + 0.5, posY + radius + 0.5);
        context.stroke();
  
        param1 = param2Meter(param1);
        param2 = param2Meter(param2);
        param3 = param2Meter(param3);
        param4 = param2Meter(param4);
        // 範囲を適度に縮小して描画
        // TODO: scaleの調整が必要、段階ではなく、線形がいい？
        if(param3 === 0 && param4 === 0) {
          scale = 1;
        } else if(param3 >= -50 && param3 <= 50 && param4 >= -50 && param4 <= 50 && param1 <= 50 && param2 <= 50) {
          scale = 40;
        } else if(param3 >= -100 && param3 <= 100 && param4 >= -100 && param4 <= 100 && param1 <= 100 && param2 <= 100) {
          scale = 75;
        } else if(param3 >= -200 && param3 <= 200 && param4 >= -200 && param4 <= 200 && param1 <= 200 && param2 <= 200) {
          scale = 200;
        } else if(param3 >= -400 && param3 <= 400 && param4 >= -400 && param4 <= 400 && param1 <= 400 && param2 <= 400) {
          scale = 300;
        } else {
          scale = 800;
        }
        context.fillRect(
          posX + 0.5 + param3 * radius / scale - param1 * radius / 2 / scale,
          posY + 0.5 - param4 * radius / scale - param2 * radius / 2 / scale,
          param1 * radius / scale,
          param2 * radius / scale
        );
      }
      context.fillRect(posX, posY, 1, 1);
    }
    
    /*
      座標系の描画 Plus : 一緒に文字も描画する
      context  描画対象のcontext
      type  座標系
      x    座標円の中心のx座標
      y    座標円の中心のy座標
      param1  極座標系:方位(0～180),    直交座標系:横幅(110段階)
      param2  極座標系:幅(0～180),    直交座標系:縦幅(110段階)
      param3  極座標系:遠距離(0～110),  直交座標系:X位置(110段階)
      param4  極座標系:近距離(0～110),  直交座標系:Y位置(110段階)
    */
    function drawSearchAreaPlus(context, type, posX, posY, param1, param2, param3, param4) {
      'use strict';
      var textAlignBefore = context.textAlign;
  
      context.textAlign = 'right';
      context.fillText(param2Meter(param3) + '@', posX + 40, posY - 1);
      context.fillText(param2Meter(param4) + '@', posX + 40, posY + 8);
      drawSearchArea(context, type, posX, posY, 7, param1, param2, param3, param4);
      context.textAlign = textAlignBefore;
    }
    
    /*
      方向指定発射の描画 仰角
      context   描画対象のcontext
      posX    中心のx座標
      posY    中心のy座標
      radius  半径
      dir     発射仰角(-90～90):2度刻みで(-180～180)
    */
    function drawFireElevation(context, posX, posY, radius, dir) {
      'use strict';
      dir *= 2;
      context.strokeStyle = '#ffffff';
      // 仰角用の弧を描画
      context.lineWidth = 1;
      context.beginPath();
      context.arc(posX + 0.5, posY + 0.5, radius, -Math.PI / 2, Math.PI / 2, false);
      context.closePath();
      context.stroke();
      // 仰角描画
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(posX + 0.5, posY + 0.5);
      context.lineTo(posX + 0.5 + radius * Math.cos(-dir * Math.PI / 180), posY + 0.5 + radius * Math.sin(-dir * Math.PI / 180));
      context.stroke();
    }
    
    /*
      方向指定発射の描画 方位
      context   描画対象のcontext
      posX      中心のx座標
      posY      中心のy座標
      radius    半径
      dir       発射方位(0～180):2度刻みで(0～360)
    */
    function drawFireDirection(context, posX, posY, radius, dir) {
      'use strict';
      dir *= 2;
      context.strokeStyle = '#ffffff';
      // 方位用の円を描画
      context.lineWidth = 1;
      context.beginPath();
      context.arc(posX + 0.5, posY + 0.5, radius, 0, Math.PI * 2, false);
      context.stroke();
      // 方位描画
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(posX + 0.5, posY + 0.5);
      context.lineTo(posX + 0.5 + radius * Math.cos((dir - 90) * Math.PI / 180), posY + 0.5 + radius * Math.sin((dir - 90) * Math.PI / 180));
      context.stroke();
    }
    
    /*
      距離の変換関数
      param  0～110の段階
      return  長さ -800～800(m)
    */
    function param2Meter(param) {
      'use strict';
      if(param >= -50 && param <= 50) {
        return param * 2;
      }
      if(param >= -70 && param <= 70) {
        return 100 + (param - 50) * 5;
      }
      if(param >= -90 && param <= 90) {
        return 200 + (param - 70) * 10;
      }
      if(param >= -110 && param <= 110) {
        return 400 + (param - 90) * 20;
      }
      return 0;
    }
    
    /*
      改行付き文字表示、j' 'で改行、高さを中揃え
      context  描画対象のcontext
      text  描画するテキスト spaceで改行
      posX  中心のX座標
      posY  中心のY座標
      lineHeight  行の高さ
    */
    function wrapTextMid(context, text, posX, posY, lineHeight) {
      if(text === undefined) {
        return;
      }
      let words = text.split(' ');
      
      posY -= lineHeight * (words.length - 1) / 2;
      for(let n = 0; n < words.length; n++) {
        context.fillText(words[n], posX, posY);
        posY += lineHeight;
      }
    }
    
    /*
      矢印の描画
      type  0:青矢印 1:動作中止青矢印 2:赤矢印
      dir   0～7:上/右上/右/右下/下/左下/左/左上
    */
    function drawArrow(context, imgChips, globalX, globalY, boxPosX, boxPosY, type, dir) {
      'use strict';
      var nowX = globalX + boxMarginLeft + boxWidth * boxPosX,
        nowY = globalY + boxMarginLeft + boxWidth * boxPosY;
  
      switch (dir) {
      case 0: //上
        context.drawImage(imgChips, 0, chipHeight * (1 + type), 40, 18, nowX + chipMarginLeft, nowY + chipMarginTop - 18, 40, 18);
        break;
      case 2: //右
        context.drawImage(imgChips, chipWidth - 18, chipHeight * (1 + type), 18, 40, nowX + chipMarginLeft + chipWidth - 2, nowY + chipMarginTop, 18, 40);
        break;
      case 4: //下
        context.drawImage(imgChips, chipWidth - 40, chipHeight * (2 + type) - 18, 40, 18, nowX + chipMarginLeft + chipWidth - 40, nowY + chipMarginTop + chipHeight - 2, 40, 18);
        break;
      case 6: //左
        context.drawImage(imgChips, 0, chipHeight * (2 + type) - 40, 18, 40, nowX + chipMarginLeft - 18, nowY + chipMarginTop + chipHeight - 40, 18, 40);
        break;
      case 1:
        context.drawImage(imgChips, chipWidth, chipHeight * (1 + type), chipWidth, chipHeight, nowX + chipMarginLeft + 30, nowY - 31, chipWidth, chipHeight);
        break;
      case 3:
        context.drawImage(imgChips, chipWidth * 2, chipHeight * (1 + type), chipWidth, chipHeight, nowX + chipMarginLeft + 40, nowY + chipMarginTop + 30, chipWidth, chipHeight);
        break;
      case 5:
        context.drawImage(imgChips, chipWidth * 3, chipHeight * (1 + type), chipWidth, chipHeight, nowX - 21, nowY + chipMarginTop + 40, chipWidth, chipHeight);
        break;
      case 7:
        context.drawImage(imgChips, chipWidth * 4, chipHeight * (1 + type), chipWidth, chipHeight, nowX - 31, nowY - 21, chipWidth, chipHeight);
        break;
      }
    }
    
    //html中の指定されたidの位置にチーム情報を表示
    function showInformation(team) {
      let targetElm;
      
      // チームエンブレム
      targetElm = document.getElementById('teamEmb');
      targetElm.src = team.emblemSrc;
      // チーム名
      targetElm = document.getElementById('teamName');
      targetElm.innerHTML = team.name;
      // Owner名
      targetElm = document.getElementById('teamOwner');
      targetElm.innerHTML = team.owner;
      
      for(let i = 0; i < 3; i++) {
        // OKEエンブレム
        targetElm = document.getElementById('OKE' + (i + 1) + 'Emb');
        targetElm.src = team.machines[i].emblemSrc;
        // OKEスナップショット
        targetElm = document.getElementById('OKE' + (i + 1) + 'SS');
        targetElm.src = team.machines[i].snapshotSrc;
        // OKE名
        targetElm = document.getElementById('OKE' + (i + 1) + 'Name');
        targetElm.innerHTML = team.machines[i].name === "" ? machineName[team.machines[i].machineType] : team.machines[i].name;
        // 非公開
        targetElm = document.getElementById('OKE' + (i + 1) + 'Secretary');
        targetElm.innerHTML = team.machines[i].secretary;
        // 機体タイプ
        targetElm = document.getElementById('OKE' + (i + 1) + 'MachineType');
        targetElm.innerHTML = machineName[team.machines[i].machineType];
        // CPU
        targetElm = document.getElementById('OKE' + (i + 1) + 'CpuType');
        targetElm.innerHTML = cpuName[team.machines[i].cpuType];
      }
    }
    
    // textareaのEXEデータを取得
    function getExeDataFromTextarea() {
      var str = document.getElementById('exedata').value;
      return str;
    }
    
    /* ---------- ファイルの読み込み関連 ---------- */
    // ファイルの読み込み
    function readFile(file) {
      // text/plain, text/html, ...
      if (/^text\//.test(file.type)) {
        let reader = new FileReader();
        reader.addEventListener('load', onLoadedTxt);
        reader.addEventListener('error', onError);
        reader.readAsText(file, 'sjis');
      } else {
        let reader = new FileReader();
        reader.addEventListener('load', onLoadedChe);
        reader.addEventListener('error', onError);
        reader.readAsArrayBuffer(file, 'sjis');
      }
      
      function onLoadedTxt(event) {
        var str = event.target.result;
        CHEbase.reInit();
        CHEbase.team.machines[0].setExeData(str);
        showInformation(CHEbase.team);
        CHEbase.renderMachine(CHEbase.team.machines[0]);
      }
      
      function onLoadedChe(event) {
        let arrayBuffer = event.target.result;
        if(readCheHeader(arrayBuffer.slice(0, 0x30)) === 'team') {
          let newTeam = new Team();
          newTeam.setCheData(arrayBuffer.slice(0x30, 0x30 + 0x340));
          for(let machineIdx = 0; machineIdx < 3; machineIdx++) {
            newTeam.machines[machineIdx].setCheData(arrayBuffer.slice(0x370 + 0x1ec0 * machineIdx, 0x370 + 0x1ec0 * (machineIdx + 1)));
          }
          CHEbase.team = newTeam;
          // 描画処理
          showInformation(CHEbase.team);
          if(CHEbase.team.machines[0].secretary) {
            CHEbase.renderMachine(new Machine());
          } else {
            CHEbase.renderMachine(CHEbase.team.machines[0]);
          }
        }
      }
      
      function onError(event) {
        if(event.target.error.code === event.target.error.NOT_READABLE_ERR) {
          alert('ファイルの読み込みに失敗しました！');
        } else {
          alert('エラーが発生しました。' + event.target.error.code);
        }
      }
    }
    
    // ヘッダーを読み込んでバイナリファイルの形式を判断
    function readCheHeader(arrayBuffer) {
      if(arrayBuffer.byteLength !== 0x30) {
        console.log('readCheHeader - Not CHE Header.');
        return false;
      }
      let view = new Uint8Array(arrayBuffer, 0, 5);
      if(view[0] === 0x43 && view[1] === 0x45 && view[2] === 0x54 && view[3] === 0x44 && view[4] === 0x1c) {
        // チームデータの場合
        console.log('readCheHeader - Match as team data.');
        return 'team';
      }
      console.log('readCheHeader - Don\'t match as team data.');
      return false;
    }
    
    // ArrayBufferのoffsetの位置からemblemのsrcを作る関数
    function arrayBuffer2EmblemSrc(buffer, offset) {
      let canvas = document.getElementById('offscreen');
      let context = canvas.getContext('2d');
      let palette = new Array(16);
      let view;
      
      // パレット情報を取得
      view = new Uint8Array(buffer, offset + 0x200, 0x40);
      for(let i = 0; i < 16; i++) {
        palette[i] = 'rgba(' + view[i * 4] + ',' + view[i * 4 + 1] + ',' + view[i * 4 + 2] + ',' + view[i * 4 + 3] + ')';
      }
      canvas.width = 32;
      canvas.height = 32;
      context.clearRect(0, 0, 32, 32);
      view = new Uint8Array(buffer, offset, 0x200);
      for(let y = 0; y < 32; y++) {
        for(let x = 0; x < 32 / 2; x++) {
          context.fillStyle = palette[view[y * 32 / 2 + x] & 0x0f];
          context.fillRect(x * 2, y, 1, 1);
          context.fillStyle = palette[view[y * 32 / 2 + x] >> 4];
          context.fillRect(x * 2 + 1, y, 1, 1);
        }
      }
      let img_png_src = canvas.toDataURL();
      return img_png_src;
    }
    
    // Convert ArrayBuffer to String (encode: Shift-JIS)
    // Need elc.js or elc_new.js
    function arrayBuffer2Str(arrayBuffer, offset, length) {
      let view = new Uint8Array(arrayBuffer, offset, length);
      let text = '';
      for(let i = 0; i < length; i++) {
        if(view[i] === 0x00) { break; }
        text += '%' + view[i].toString(16);
      }
      return UnescapeSJIS(text);
    }
    
    function arrayBuffer2SnapshotSrc(arrayBuffer, offset) {
      let canvas = document.getElementById('offscreen');
      let context = canvas.getContext('2d');
      let palette = new Array(256);
      
      // パレット情報を取得
      let colors = new Uint8Array(arrayBuffer, offset + 48 * 48, 4 * 16 * 16);
      for(let i = 0; i < 256; i++) {
        palette[i] = 'rgba(' + colors[i * 4] + ',' + colors[i * 4 + 1] + ',' + colors[i * 4 + 2] + ',' + colors[i * 4 + 3] + ')';
      }
      canvas.width = 48;
      canvas.height = 48;
      context.clearRect(0, 0, 48, 48);
      let palettePoses = new Uint8Array(arrayBuffer, offset, 48 * 48);
      for(let y = 0; y < 48; y++) {
        for(let x = 0; x < 48; x++) {
          context.fillStyle = palette[palettePoses[y * 48 + x]];
          context.fillRect(x, y, 1, 1);
        }
      }
      let img_png_src = canvas.toDataURL();
      return img_png_src;
    }
    
    /* ---------- インスタンス宣言 ---------- */
    //CHEbase: 無名オブジェクトのインスタンス
    /*
    CHEbase = {
      team: Team(),     Teamオブジェクト
      imgBack,          背景画像Imageオブジェクト
      imgChips,         チップ画像Imageオブジェクト
      init(),           初期化メソッド
      onload(),         リソースロード時メソッド
      reInit(),         再初期化メソッド
      reRender(),       再描画メソッド
      renderMachine(),  描画メソッド
    }
    */
    let CHEbase = new function() {
      this.team = new Team();
      this.imgBack = new Image();
      this.imgChips = new Image();
      // 画像の読み込み
      this.imgBack.src = 'back.png';
      this.imgChips.src = 'chips.png';
      
      this.team.machines[0].setExeData(getExeDataFromTextarea());
      this.team.machines[1].setExeData(getExeDataFromTextarea());
      this.team.machines[2].setExeData(getExeDataFromTextarea());
      
      // 再初期化
      this.reInit = function() {
        this.team.init();
      };
      this.firstRender = function() {
        render(this.team.machines[0]);
      };
  
      this.renderMachine = function(machine) {
        render(machine);
      };
    };
    
    /* ---------- イベント追加 ---------- */
    // ファイルのドラッグ＆ドロップ
    let dropArea = document.body;
    dropArea.ondrop = function(event) {
      var file = event.dataTransfer.files[0];
      readFile(file);
      event.preventDefault();
    };
    dropArea.ondragover = function(event) {
      event.preventDefault();
    };
    // 機体選択
    document.getElementById('machine0').onclick = function() {
      CHEbase.renderMachine(CHEbase.team.machines[0]);
    }
    document.getElementById('machine1').onclick = function() {
      CHEbase.renderMachine(CHEbase.team.machines[1]);
    }
    document.getElementById('machine2').onclick = function() {
      CHEbase.renderMachine(CHEbase.team.machines[2]);
    }
    
    /* ---------- リソースロード時処理 ---------- */
    WebFont.load({
      custom: {
        families: ['CHE']
      },
      active: function() {
        CHEbase.firstRender();
      }
    });
    
    window.onload = function() {
      CHEbase.firstRender();
    };
  });
  