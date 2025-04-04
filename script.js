//1.ランダムにおみくじ画像のパスと詳細を返す

function getRandomImage(){
    const kujiNumber = Math.floor(Math.random() * 7);
    const imagePath = `./images/kuji-${kujiNumber.toString()}.png`;

    // おみくじの詳細テキストを定義
    const kujiDetails = [
        "大吉: 今日は最高の日です！",
        "中吉: 良いことが起こる予感。",
        "小吉: 少しだけ良いことがあるかも。",
        "吉: 平穏な一日になりそう。",
        "末吉: 少しの幸運が訪れるでしょう。",
        "凶: 注意が必要な日です。",
        "大凶: 慎重に行動しましょう。"
    ];

    return { imagePath, detail: kujiDetails[kujiNumber] };
}

//2.ボタンを押したらスロットが回転する

function playOmikuji(){
    const button = document.querySelector("#js-button");
    button.disabled = true; // ボタンを一時的に無効化

    const timer = setInterval(
        function(){
            const result = getRandomImage();
            document.querySelector("#js-result").setAttribute("src", result.imagePath);
        }
    , 200);

    //3.数秒後にスロットが止まる
    setTimeout(
        function(){
            clearInterval(timer);

            // スロット停止後に詳細を表示
            const result = getRandomImage();
            document.querySelector("#js-result").setAttribute("src", result.imagePath);
            document.querySelector("#js-detail").textContent = result.detail;

            // ボタンのテキストを「もう一度引く」に変更
            button.textContent = "もう一度引く";
            button.disabled = false; // ボタンを再度有効化
            button.classList.add("reset-mode"); // リセットモード用のクラスを追加
        }, 3000
    );
}

// 初期状態に戻す関数
function resetOmikuji(){
    const button = document.querySelector("#js-button");
    const resultImage = document.querySelector("#js-result");
    const detailText = document.querySelector("#js-detail");

    // 初期状態に戻す
    resultImage.setAttribute("src", "./images/omikuji.png");
    detailText.textContent = "";
    button.textContent = "おみくじを引く";
    button.classList.remove("reset-mode");

    // アニメーションをリセット
    resultImage.classList.remove("shake-animation");
}

// ボタンのクリックイベントを設定
document.querySelector("#js-button").addEventListener("click", function(){
    const button = document.querySelector("#js-button");

    if (button.classList.contains("reset-mode")) {
        // リセットモードの場合は初期状態に戻す
        resetOmikuji();
    } else {
        // 通常モードの場合はおみくじを引く
        playOmikuji();
    }
});

document.querySelector("#js-button").addEventListener("mouseover", function(){
    const target = document.querySelector("#js-result");
    target.classList.add("shake-animation");
});