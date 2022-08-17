// クリック時に起動
$("#result").click(()=>{
	// 変数定義
	var totalCount = 0;
	var aCount = 0;
	var bCount = 0;
	var cCount = 0;
	var dCount = 0;
	var result = "";

	// .eachを用いて指定した各jQueryオブジェクトを一つずつ取り出す
	$(".aa input").each(function(){
		// ラジオボタンにcheckedプロパティが付加されていた場合
		if($(this).prop('checked')){
			// 指定要素のvalue値に応じてカウントを増加させる
			if($(this).val() == "a"){
				aCount++;
			}
			else if($(this).val() == "b"){
				bCount++;
			}
			else if($(this).val() == "c"){
				cCount++;
			}
			else if($(this).val() == "d"){
				dCount++;
			}
		}
		totalCount++;
	});

	totalCount /= 2;
	
	if (aCount + bCount + cCount + dCount != totalCount) {	
		debugger;
		alert("すべての要素を選択してください。")
		return false;
	}

	// 性格診断の計算処理 => (質問数/2 + (指定回答数 - 指定回答数))/質問数
	var X = (totalCount / 2 + (aCount - bCount)) / totalCount;
	var Y = (totalCount / 2 + (cCount - dCount)) / totalCount;

	// %表記用
	X *= 100;
	Y *= 100;
	
	// 性格判定処理
	if (X > 50 && Y > 50) {
		result = "エクスプレッシブ";

	}else if (X > 50 && Y < 50) {
		result = "ドライビング";
	
	}else if (X < 50 && Y > 50) {
		result = "エミアブル";
	
	}else if (X < 50 && Y < 50) {
		result = "アナリティカル";
	
	}else {
		// この処理がなるべく発生しないように、質問数を増加させる。
		result = "error";
	}

	// 出力部
	alert(`X値:${X}%, Y値:${Y}%, 診断結果 : ${result}`);
	$(function () {
		$.ajax({
			url: 'recieve.py',
			type: 'post',
			data: '送信メッセージ'
		}).done(function(data){
			console.log(data);
		}).fail(function(){
			console.log('failed');
		});
	})
});




