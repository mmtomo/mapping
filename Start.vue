
<template class="w-100 mt-2">

	<template v-if = "! DATA.Mobile_flg">
		<div class="map-modal" id="drag_area" @dragleave.prevent @dragover.prevent @drop.prevent="f2">	
			<div style="display:flex;flex-direction:row;gap:64px;justify-content:center;">
				
				<div class="ms-3 me-4">
					<span style="font-weight:bolder;font-size: 150%;color: black;text-align: center;">スタート画面</span>
				</div>
		
				<div>
					<div class="dropdown">
					<button class="btn btn-warning dropdown-toggle d-print-none" type="button"
						id="dropdownMenuButton200" data-bs-toggle="dropdown" aria-expanded="false">
						アシスト</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton200" style = "background-color:#ffebcd;"> <!--  #ffffff 000000;-->
						<li style="cursor: pointer;background-color:violet;"><a class="dropdown-item" v-on:click="tukaikata">
						<img src="@/assets/readme.png" alt="" width="20" height="20" class="me-2"> 
						読んで下さい</a></li>
						<li style="cursor: pointer;background-color:violet;"><a class="dropdown-item" href="sample.xlsx" target="_blank">
						<img src="@/assets/download.png" alt="" width="20" height="20" class="me-2"> 
						Excelサンプル ファイル</a></li>
					</ul>
					</div>
				</div><!--終了 	-->

			</div><!--終了 	-->

			<h6 style="text-align: center;color:red;">期間限定版</h6>	

  			<div  style = "background-color:#afeeee;" class="map-modal" >
						<div>
							<h5>● 新規の場合：</h5>
							<span style="font-size: 130%;">　エクセルの住所データを、ここに<span style="color: orangered;">ドラッグ&ドロップ</span>します。</span> 
						</div>
						<div >
							<img src="@/assets/upload1.png" alt="" width="80" height="80" >
						</div>
						<div >
							<span style="font-size: 100%;">　または、エクセルファイルを選択します。</span> 
						</div>
						<div >
							<span style="color: black;font-size:1rem;">
								<label style = "background-color:gray;">
									<input
										@change="inputSheet"
										accept="xlsx"
										type="file"
										id="input_sheet"
										style="display:none"
									>住所ファイル選択
								</label> </span>
						</div>
			</div>
 
			<div  style = "background-color:silver;" class="map-modal" >
				<div >
					<h5>● データ呼び出しの場合：</h5>
					<span style="font-size: 100%;">下記のボタンを、<span style="color: orangered;">クリック</span>します。</span> 
				</div>
		
				<div >
					<button type="button" class="btn btn-primary mx-4" @click="yobidasi">
					データの呼び出し
					</button>
				</div>
			</div>
  
			<div >
				<span style="color: black;">Powered by <img src="@/assets/jyusyodemap-s01.png" width="100" height="20">(v1.50) by 株式会社 CCU </span>
			</div>
		</div>	<!-- 終了	 id="drag_area"	-->
	</template>

  	<!-- モバイルの場合 -->
	<template v-if = "DATA.Mobile_flg">

			<div style="display:flex;flex-direction:row;gap:8px;justify-content:center;">
				
				<div class="ms-3 me-4 mt-3">
					<span style="font-weight:bolder;font-size: 100%;color: black;text-align: center;">スタート画面</span>
				</div>
		
				<div class="mt-3"> 
					<div class="dropdown">
						<button class="btn btn-warning dropdown-toggle d-print-none" type="button"
							id="dropdownMenuButton200" data-bs-toggle="dropdown" aria-expanded="false">
						アシスト</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton200" style = "background-color:#ffebcd;"> <!--  #ffffff 000000;-->
							<li style="cursor: pointer;background-color:violet;"><a class="dropdown-item" v-on:click="tukaikata">
							<img src="@/assets/readme.png" alt="" width="20" height="20" class="me-2"> 
							読んで下さい</a></li>
							<li style="cursor: pointer;background-color:violet;"><a class="dropdown-item" href="sample.xlsx" target="_blank">
							<img src="@/assets/download.png" alt="" width="20" height="20" class="me-2"> 
							Excelサンプル ファイル</a></li>
						</ul>
					</div>
				</div><!--終了 	-->

			</div><!--終了 	-->

			<h6 style="text-align: center;color:red;" class="mt-3" >期間限定版</h6>

			<div  style = "background-color:#afeeee;" class="map-modal mt-3" >
					<div>
							<h6 style="color: navy;">● 新規の場合：</h6>
					</div>

					<div>
							<span style="font-size: 90%;">　Excelファイルを選択します。</span> 
					</div>
						
					<div>
							<span style="color: black;font-size:1rem;">
								<label style = "background-color:gray;">
									<input
										@change="inputSheet"
										accept="xlsx"
										type="file"
										id="input_sheet"
										style="display:none"
									>住所ファイル選択
								</label> </span>
					</div>
			</div>
 
			<div  style = "background-color:silver;" class="map-modal mt-3" >
				<div >
					<h6 style="color: navy;">● データ呼び出しの場合：</h6>
					<span style="font-size: 100%;">下記のボタンを、<span style="color: orangered;">クリック</span>します。</span> 
				</div>

				<div >
					<button type="button" class="btn btn-primary mx-4" @click="yobidasi">
						データの呼び出し
					</button>
				</div>

			</div>
  
			<div class="mx-auto p-3 w-100">
				<span style="color: black;font-size: 80%;">Powered by <img src="@/assets/jyusyodemap-s01.png" width="70" height="20">(v1.50) by 株式会社 CCU </span>
			</div>

		</template>

		<transition name="modal" v-if="DATA.Modal_Roding_flg">
					<div  class="overlay" @click="DATA.Modal_Roding_flg = false">
						<div>
				  <span style="font-size:2rem;color:red;">準備中です...</span>
						</div>
						<!--styleを指定して任意のサイズを表示-->
						<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
			  <span class="sr-only">Loading...</span>
						</div>
					</div>
		 </transition>
  
  
  </template>
  
  
  <script setup>
  
  import {reactive,computed,onMounted,ref,provide} from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router';
  
  //import TheTop from './Top.vue'

  import '@/components/tile/Bing.js'
  
  const qkeyname = import.meta.env.VITE_QKEYNAME
  const router = useRouter();

  let torikomi_file = "";
  let Total_output = [];  // 全データ （管理用）
  let all_db = [];//
  let all_db02 = [];//
  
  let obj = null;
  
  let DB_linglat = [];
  let DB_linglat_non = [];
  let NonDatproperti = {};//新規登録propertyで必要
  let Excel_State = ""; //excel flg
  
  let center_lng = 136.219482;  //福井駅
  let center_lat = 36.064087; 
  
  const DATA = reactive({
	
	All_output_filter: [], // 全データ（表示用）
	Touroku_Names:[],  	// 登録　項目
  Touroku_Names_Html:[], 
	Kensaku_Kubun_Names:[],  	// データ検索　項目
	Excel_Out_Retu:[],   	// Excel出力　項目
	 Kensaku_Kubun_Set_Names:[],  	// 表示用　データ検索項目
  
	All_Kakunin_filter: [],
	Kakunin_Single:null,
	Qdat:"",
  
	start_flg:true,//初回状態flg
	excel_save_flg:false,
	Mobile_flg:false, //モバイル端末なら true 、それ以外なら false を返す
	Modal_Roding_flg:false,
  
	//詳細検索用
	SutiRetus: [],   //数値の列
	Modal_kubun_select_flg:false,   //検索区分からの表示列の　窓
	Modal_edit_flg:false,    //検索区分からの列での値　選択　窓
  
	Fukusuu_Kensaku_flg:false,     //複数検索の区分
	SutiRetus_flg:"mozi",//項目の数値、文字列設定
  
	ChngeColor_flg:false,
	last_wno:""
	
	});
	
	//終了　reactive
  
  
  /** モバイル端末なら true 、それ以外なら false を返す */
  function isMobile(){
	let regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return (window.navigator.userAgent.search(regexp) !== -1);
  }
  
  function f2(event)
	{
	  event.preventDefault();
	  torikomi_file = event.dataTransfer.files[0];
	  let type = torikomi_file.name.split('.');
	  if (type[type.length - 1].toLowerCase() == 'xlsx') {
		if(DATA.start_flg == true){
		  handleFile(event);
		}else{
		  alert("「xlsx」ファイルを取り込んでいます。\n 必用なら再起動して下さい");
		  return "";
		}
	  }else{
		alert("ファイル種類が違います。\n 拡張が「xlsx」を選んで下さい");
		return "";
	  }
  }
  
  function inputSheet(){
	//let torikomi = "sample.xlsx";
	let torikomi = document.getElementById("input_sheet");			
	torikomi_file = torikomi.files[0];
	//alert(torikomi_file.name);
	let type = torikomi_file.name.split('.');
	if (type[type.length - 1].toLowerCase() == 'xlsx') {
	  if(DATA.start_flg == true){
		handleFile(event);
	  }else{
		alert("すでに「xlsx」ファイルを取り込んでいます。\n 再起動して下さい");
		return "";
	  }
	}else{
	  alert("ファイル種類が違います。\n 拡張が「xlsx」を選んで下さい");
	  return "";
	}
  }
  
  
  function s2ab(s){
	  let buf = new ArrayBuffer(s.length);//arrayBufferバイナリデータをオクテットに変換
	  let view = new Uint8Array(buf);//UInt8Arrayバイナリデータをオクテットに変換
	  for (let m = 0; m != s.length; ++m) {
		view[m] = s.charCodeAt(m) & 0xFF;
	  }
	  return buf;
  }
  

	// excelファイル選択時のメイン処理
	  function handleFile(e) {
			DATA.Modal_Roding_flg = true;
		  	let reader = new FileReader();
		  	reader.onload = function (e) {
			  let dat = e.target.result;
			  let wb;
			  let arr = fixdata(dat);
			  wb = XLSX.read(btoa(arr), {
				  type: 'base64',
				  cellDates: true,
			  });
			  let output = to_json(wb);
				let sheet_name = wb.SheetNames[0];
				let Goods_G = output[sheet_name];//シート名のフリー
				//空白行、空白列は除かれてる。
				//先頭行は、システムでkey項目となっているので、実際のExcelの２行目からjsonになっている。
				let ans01 = "";
				let ans02 = "";
  
				//住所列チェック
				ans01 = _(Goods_G).every(function(item){return truthy(item["住所"])});  //すべてが定義でないならば　true  そうでなければfalse
			//alert("ans01");
				if(ans01 == false) {//_が無い場合
					alert("Excelファイルに「住所」文字の列がないです。\n 「住所」列を、設定してから取り込んで下さい。");
					DATA.Modal_Roding_flg = false;
					return
				}
			
				ans01 = _(Goods_G).every(function(item){return _.isString(item["住所"])});  //すべてが文字列ならば　true  そうでなければfalse
			//alert("ans01-2");
				if(ans01 == false) {//_が無い場合
					alert("「住所」データに文字がないです。\n 「住所」文字を、設定してから取り込んで下さい。");
					DATA.Modal_Roding_flg = false;
					return
				}
  
				//lng lat列の混在で、いずれかのみが、ある場合は戻る  ①
				DB_linglat = _(Goods_G).filter(function(item){return (truthy(item["lng"]) && truthy(item["lat"]))}); 
				//◆"lng","lat"列が両方ある場合 は、スルー
				if(DB_linglat.length>0) {
					//◆"lng","lat"列が片方ある場合は、 
					}else{
					ans01 = _(Goods_G).any(function(item){return truthy(item["lng"])}); 
					if(ans01 == true) {//_が有る場合
						alert("「lng」列を、削除してから取り込んで下さい。");
						DATA.Modal_Roding_flg = false;
						return
					}
					ans01 = _(Goods_G).any(function(item){return truthy(item["lat"])});
					if(ans01 == true) {//_が有る場合
						alert("「lat」列を、削除してから取り込んで下さい。");
						DATA.Modal_Roding_flg = false;
						return
					}
				}
  /////////////////////////////////////////////////
			
				//◆　　１回目のkey_retus　設定
				let Gtytle_record = _(Goods_G).first();//共通jsonデータ	変わらない変数	取得したJSONデータの１行目から取得
				let key_retus = _(Gtytle_record).keys();//行毎のjsonデータのために必用→
			
				//◆　項目に"photo"がない場合     項目"photo"の追加
				ans02 = _(key_retus).indexOf('photo');						 
				if(ans02 == -1) {//_が無い場合
					key_retus.push('photo');
				}
			
				//◆　項目に"位置メモ"がない場合     項目"位置メモ"の追加
				ans02 = _(key_retus).indexOf('位置メモ');						 
				if(ans02 == -1) {//_が無い場合
					key_retus.push('位置メモ');
				}
  
				//◆Excel_Stateの取込みフラグ　設定	lng、latの列の有無チェック
				//DB_linglat = _(Goods_G).filter(function(item){return (truthy(item["lng"]) && truthy(item["lat"]))}); 
			
				//◆"lng","lat"列があるのとないの混合の場合
				if(DB_linglat.length>0) {
				//alert(JSON.stringify(DB_linglat));  
					DB_linglat_non = _(Goods_G).reject(function(item){return (truthy(item["lng"]) && truthy(item["lat"]))}); 
					//◆「lng」latの両方の列が無い場合
					if(DB_linglat_non.length>0) {
					Excel_State = 3;  //◆
					//alert(JSON.stringify(DB_linglat_non));
					//◆「lng」latの両方の列がある場合 
					}else{
					Excel_State = 2; //◆
					DB_linglat_non =[];
					}
				//◆「lng」latの両方の列が無い場合 住所から取得
				}else{
					Excel_State = 1; //◆
					//alert("lng,lat列無し");
				}
  
			
				//◆　全てのレコードで共通
			
				//◆　DATA.Excel_Out_Retu    DATA.Touroku_Names	 DATA.Kensaku_Kubun_Namesの設定
				if(_.isEqual(_(key_retus).first(2),["lng","lat"])){
					DATA.Excel_Out_Retu = deepClone(_(key_retus).rest(2));
					key_retus = deepClone(_(key_retus).rest(2));
			
				}else{
					DATA.Excel_Out_Retu = deepClone(key_retus);
					key_retus = deepClone(key_retus);
				}
				//マスター用のデータ取得
				DATA.Touroku_Names = deepClone(DATA.Excel_Out_Retu);
				DATA.Touroku_Names_Html = _(DATA.Touroku_Names).difference(["photo","一覧表示","位置メモ"]);//"mouseover"で使っている
				DATA.Kensaku_Kubun_Names = deepClone(DATA.Excel_Out_Retu);
				DATA.Kensaku_Kubun_Set_Names  = _(DATA.Kensaku_Kubun_Names).difference(["photo","一覧表示","位置メモ"]);//検索用
			
				//◆　未定義データ処理
				let proper_su = [];
				proper_su = _.map(key_retus,function(){
					return "?";//
				});
				let NonData = _.zip(key_retus,proper_su);  //複数の配列から対の配列を作る
				NonDatproperti = _(NonData).object();//初期設定で済
				//項目"photo"の初期値を配列にする
				NonDatproperti["photo"] = [];
			
				//◆　数値列を配列にする
				DATA.SutiRetus = [];
				_.each(key_retus,function(x,index){   //-2含む  _(key_retus).rest(2)
					//数値なら
					if(_.isNumber(Gtytle_record[x])){
					DATA.SutiRetus.push(x);
					} 
				});
			
				//◆　項目に"一覧表示"がない場合     mapで一覧表示をする
				ans02 = _(key_retus).indexOf('一覧表示');						 
				if(ans02 == -1) {//_が無い場合
				}else{			
				}
			
  ///////////////////
			
				let Val_retus = [];//必用
				let R_retus = [];//必用
			
				let NextData = [];
				let Nextproperti = {};
				let Allproperti =  {};
			
				let lng = "";
				let lat = "";
				let coord = [];
							
				DATA.Modal_Roding_flg = true;
  
				//項目に"lng","lat"がない場合	◆　住所名より経緯度データの連続取得
				if(Excel_State == 1){	
						if(Goods_G.length>100)  {
							alert("経緯度の取得が100件以上あります。\n 初回は、時間を要します。");
						}
				
					_.each(Goods_G,function(item,index){//い
						obj = {"type": "Feature","geometry": {"type": "Point","coordinates": []}};//[136.378913,36.091453]
						Val_retus = _(item).values();//④　各行の値の配列の取得	各行の値は、それぞれの行毎に設定すること
						R_retus = _(item).keys();//④　各行の列の配列の取得	各行の列は、それぞれの行毎に設定すること
				
						// ここから、仮のcoordinatesの設定  住所名が検索不能の場合の値も兼ねる
						lng = center_lng;//	福井市	lng 135	
						lat = center_lat;//		lat 36
						coord = [lng,lat];//◆経緯度を、数値に変換
						obj.geometry.coordinates = coord;
				
						// ここから、propertiesの作成
						//◆　定義データ処理
						//複数の配列から、要素毎の配列を作る
						NextData = _.zip(R_retus,Val_retus);//
						//要素毎の配列をオブジェクトに変換する
						Nextproperti = _(NextData).object();
						//◆　未定義データを定義データで更新
						Allproperti = _.extend({},NonDatproperti,Nextproperti);//NonDatpropertiの更新、追加
						obj.properties = Allproperti;//objに追加
						all_db.push(obj);//配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
						//if (all_db.length < 11)all_db.push(obj);
					});//いの終了
				
					DATA.All_Kakunin_filter = deepClone(all_db);
					//◆　住所名より経緯度データの連続取得
					ikkatu_add_after();
				}

				//項目に"lng","lat"がある場合
				else if(Excel_State == 2){
					_.each(Goods_G,function(item,index){//い
							obj = {"type": "Feature","geometry": {"type": "Point","coordinates": []}};//[136.378913,36.091453]
							Val_retus = _(item).values();//④　各行の値の配列の取得	各行の値は、それぞれの行毎に設定すること
							R_retus = _(item).keys();//④　各行の列の配列の取得	各行の列は、それぞれの行毎に設定すること
							
							//◆　定義データ処理
							//複数の配列から、要素毎の配列を作る
							NextData = _.zip(R_retus,Val_retus);//
							//要素毎の配列をオブジェクトに変換する
							Nextproperti = _(NextData).object();
							//◆　未定義データを定義データで更新
							Allproperti = _.extend({},NonDatproperti,Nextproperti);//NonDatpropertiの更新、追加
					
							// ここから、coordinatesの作成
							lng = Allproperti.lng;//	lng 135	
							lat = Allproperti.lat;//	lat 36
					
							//◆お'lng'　'lat'のデータチェック
							//◆列データ'lng'　'lat'の数値、文字列 ?の判断
							if(_.isNumber(lng) == false || _.isNumber(lat) == false){ //lngデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							if(lng>150 || lng< 50){ //lngデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							if(lat>100 || lat< 20){ //latデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							//◆お終了
				
							lng = parseFloat(lng);//
							lat = parseFloat(lat);//
							coord = [lng,lat];
							obj.geometry.coordinates = coord;
					
							// ここから、propertiesの作成
							//◆　左端の先頭の２列データを削除	定義データ処理
							obj.properties = _(Allproperti).omit("lng","lat");
				
							all_db.push(obj);//配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
							//if (all_db.length < 11)all_db.push(obj);配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
						});//いの終了
				
					Total_output = deepClone(all_db);
					DATA.All_output_filter = deepClone(all_db);
					//alert(JSON.stringify(DATA.All_output_filter));
				
					torikomi_end();
					DATA.Modal_Roding_flg = false;
				}

				//項目に"lng","lat"が混在の場合
				//if(Excel_State == 3){
				else{
					//最初に"lng","lat"が有るdb
					_.each(DB_linglat,function(item,index){//い
							obj = {"type": "Feature","geometry": {"type": "Point","coordinates": []}};//[136.378913,36.091453]
							Val_retus = _(item).values();//④　各行の値の配列の取得	各行の値は、それぞれの行毎に設定すること
							R_retus = _(item).keys();//④　各行の列の配列の取得	各行の列は、それぞれの行毎に設定すること
							
							//◆　定義データ処理
							//複数の配列から、要素毎の配列を作る
							NextData = _.zip(R_retus,Val_retus);//
							//要素毎の配列をオブジェクトに変換する
							Nextproperti = _(NextData).object();
							//◆　未定義データを定義データで更新
							Allproperti = _.extend({},NonDatproperti,Nextproperti);//NonDatpropertiの更新、追加
					
							// ここから、coordinatesの作成
							lng = Allproperti.lng;//	lng 135	
							lat = Allproperti.lat;//	lat 36
				
							//◆お'lng'　'lat'のデータチェック
							//◆列データ'lng'　'lat'の数値、文字列 ?の判断
							if(_.isNumber(lng) == false || _.isNumber(lat) == false){ //lngデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							if(lng>150 || lng< 50){ //lngデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							if(lat>100 || lat< 20){ //latデータ
								lng = center_lng;
								lat = center_lat;
								Allproperti["位置メモ"] = '位置検索は仮り';
							}
							//◆お終了
				
							lng = parseFloat(lng);//
							lat = parseFloat(lat);//
							coord = [lng,lat];
							obj.geometry.coordinates = coord;
				
							// ここから、propertiesの作成
							//◆　左端の先頭の２列データを削除	定義データ処理
							obj.properties = _(Allproperti).omit("lng","lat");
					
							all_db.push(obj);//配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
							//if (all_db.length < 11)all_db.push(obj);配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
					});//いの終了
				
					//次に"lng","lat"が無いdb
					_.each(DB_linglat_non,function(item,index){//い
							obj = {"type": "Feature","geometry": {"type": "Point","coordinates": []}};//[136.378913,36.091453]
							Val_retus = _(item).values();//④　各行の値の配列の取得	各行の値は、それぞれの行毎に設定すること
							R_retus = _(item).keys();//④　各行の列の配列の取得	各行の列は、それぞれの行毎に設定すること
					
							// ここから、仮のcoordinatesの設定  住所名が検索不能の場合の値も兼ねる
							lng = center_lng;//	福井市	lng 135	
							lat = center_lat;//		lat 36
							coord = [lng,lat];//◆経緯度を、数値に変換
							obj.geometry.coordinates = coord;
				
							// ここから、propertiesの作成
							//◆　定義データ処理
							//複数の配列から、要素毎の配列を作る
							NextData = _.zip(R_retus,Val_retus);//
							//要素毎の配列をオブジェクトに変換する
							Nextproperti = _(NextData).object();
							//◆　未定義データを定義データで更新
							Allproperti = _.extend({},NonDatproperti,Nextproperti);//NonDatpropertiの更新、追加
							obj.properties = Allproperti;//objに追加
							all_db02.push(obj);//配列の先頭に値を追加する→unshift　配列の最後に値を追加する→push
					});//いの終了
				
					DATA.All_Kakunin_filter = deepClone(all_db02);
					//◆　住所名より経緯度データの連続取得
					ikkatu_add_after_State3();
				}
			
		  	 };//終了　reader.onload
		  reader.readAsArrayBuffer(torikomi_file);
		  //reader.readAsText(torikomi_file);これはtxtデータの場合
  }
  
  function ikkatu_add_after_State3(){
	DATA.Kakunin_Single = _(DATA.All_Kakunin_filter).first();//先頭レコードを選ぶ
	DATA.Qdat = DATA.Kakunin_Single.properties["住所"];//
  //alert("ikkatu_add_after_State3");
  //alert(JSON.stringify(DATA.Kakunin_Single));
	//◆非同期→	axios.getで経緯度の取得
	setTimeout(function(){one_add_State3(DATA.Qdat)}, 50); //0.5秒後 
   }
  
  function one_add_State3(abc){//Bing Map でGeocoding
	let lng = "";
	let lat = "";
	let coord = [];	
	let dummy = encodeURIComponent(abc);
	let url = "";			
  //alert("ikkatu_add_after_State3");
	//url = '"http://dev.virtualearth.net/REST/v1/Locations?query=' + duumy + '&key=ArY4zE0As0OvcjFovHIEKkUqsAj18iJrmhoWPruCNej0rP31UuUP6ATx27WDpaGm"';
  
	url = `https://dev.virtualearth.net/REST/v1/Locations?query=${dummy}&key=${qkeyname}`;
	//let url = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeURIComponent(DATA.Qdat)}&key=${qkeyname}`;
	axios.get(qurl)
	  .then((result)=>{
		lng = result.data.resourceSets[0].resources[0].point.coordinates[1];//		lng 135	lat 36
		lat = result.data.resourceSets[0].resources[0].point.coordinates[0];//		lng 135	lat 36
		coord =  [parseFloat(lng),parseFloat(lat)];//◆経緯度を、数値に変換
		DATA.Kakunin_Single.geometry.coordinates = coord;
  
		Total_output.push(DATA.Kakunin_Single);
		//先頭レコード以外を選ぶ
		DATA.All_Kakunin_filter = _(DATA.All_Kakunin_filter).rest();
  //alert("DATA.All_Kakunin_filter");
  //alert(JSON.stringify(DATA.All_Kakunin_filter));
		//データがあれば、連続して処理をする
		if(DATA.All_Kakunin_filter.length>0){
		  ikkatu_add_after_State3();
  
		//データがなければ、終了処理をする
		}else{
		  alert("経緯度を登録しました。");
		  //◆union
		  Total_output = _(all_db).union(Total_output);
		  DATA.All_output_filter = deepClone(Total_output);
		  torikomi_end();
		  DATA.Modal_Roding_flg = false;
		}
  
	  }).catch((error)=>{
		//alert("住所名が不正です。\n 住所データを修正して下さい。\n " + DATA.Qdat + " です。");
		alert("保存したexcelで、住所データを修正して下さい。\n lng、latの値を空白にして下さい。\n 修正したexcelファイルを取り込んで下さい。\n " + DATA.Qdat + " です。");
		DATA.Kakunin_Single.properties["位置メモ"] = '位置検索は仮り';
		Total_output.push(DATA.Kakunin_Single);
		//先頭レコード以外を選ぶ
		DATA.All_Kakunin_filter = _(DATA.All_Kakunin_filter).rest();
  
		//データがあれば、連続して処理をする
		if(DATA.All_Kakunin_filter.length>0){
		  ikkatu_add_after_State3();
		//データがなければ、終了処理をする
		}else{
		  alert("経緯度を登録しました。");
		  //DATA.Kakunin_Single.properties["位置メモ"] = '位置検索は仮り';
		  //◆union
		  Total_output = _(all_db).union(Total_output);
  
		  DATA.All_output_filter = deepClone(Total_output);
		  torikomi_end();
		  DATA.Modal_Roding_flg = false;
		}
	  })
	  }
  
  function ikkatu_add_after(){
  //alert("after-02");
	DATA.Kakunin_Single = _(DATA.All_Kakunin_filter).first();//先頭レコードを選ぶ
	DATA.Qdat = DATA.Kakunin_Single.properties["住所"];//
	//◆非同期→	axios.getで経緯度の取得
	setTimeout(function(){one_add(DATA.Qdat)}, 50); //0.5秒後 50
   }
  
   function one_add(xyz){//Bing Map でGeocoding
  //alert("one-add");
	let lng = "";
	let lat = "";
	let coord = [];	
	let dummy = encodeURIComponent(xyz);
	let url = "";			
  
	//url = '"http://dev.virtualearth.net/REST/v1/Locations?query=' + duumy + '&key=ArY4zE0As0OvcjFovHIEKkUqsAj18iJrmhoWPruCNej0rP31UuUP6ATx27WDpaGm"';
  
  url = `https://dev.virtualearth.net/REST/v1/Locations?query=${dummy}&key=${qkeyname}`;
  axios.get(url)
	  .then((result)=>{
		lng = result.data.resourceSets[0].resources[0].point.coordinates[1];//		lng 135	lat 36
		lat = result.data.resourceSets[0].resources[0].point.coordinates[0];//		lng 135	lat 36
		coord =  [parseFloat(lng),parseFloat(lat)];//◆経緯度を、数値に変換
		DATA.Kakunin_Single.geometry.coordinates = coord;
  //alert(lng);
		Total_output.push(DATA.Kakunin_Single);
		//先頭レコード以外を選ぶ
		DATA.All_Kakunin_filter = _(DATA.All_Kakunin_filter).rest();
  
		//データがあれば、連続して処理をする
		if(DATA.All_Kakunin_filter.length>0){
		  ikkatu_add_after();
		//データがなければ、終了処理をする
		}else{
		  alert("経緯度を登録しました。");
		  DATA.All_output_filter = deepClone(Total_output);
		  torikomi_end();
		  DATA.Modal_Roding_flg = false;
		}
	  }).catch((error)=>{
		alert(error);	
		//alert("住所名が不正です。\n 住所データを修正して下さい。\n " + DATA.Qdat + " です。");
		alert("保存したexcelで、住所データを修正して下さい。\n lng、latの値を空白にして下さい。\n 修正したexcelファイルを取り込んで下さい。\n " + DATA.Qdat + " です。");
		DATA.Kakunin_Single.properties["位置メモ"] = '位置検索は仮り';
		Total_output.push(DATA.Kakunin_Single);
		//先頭レコード以外を選ぶ
		DATA.All_Kakunin_filter = _(DATA.All_Kakunin_filter).rest();
  
		//データがあれば、連続して処理をする
		if(DATA.All_Kakunin_filter.length>0){
		  ikkatu_add_after();
		//データがなければ、終了処理をする
		}else{
		  alert("経緯度を登録しました。=");
		  DATA.All_output_filter = deepClone(Total_output);
		  torikomi_end();
		  DATA.Modal_Roding_flg = false;
		}
	  })
	  }
  
		// ファイルの読み込み
		function fixdata(dat) {
			let o = "",
				l = 0,
				w = 10240;
			for (; l < dat.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(dat.slice(l * w,
				l * w + w)));
			o += String.fromCharCode.apply(null, new Uint8Array(dat.slice(l * w)));
			return o;
		}
  
		// ワークブックのデータをjsonに変換
		function to_json(workbook) {
			let result = {};
			workbook.SheetNames.forEach(function (sheetName) {
				let roa = XLSX.utils.sheet_to_json(
					workbook.Sheets[sheetName],
					{
						raw: true,
					});
				if (roa.length > 0) {
					result[sheetName] = roa;
				}
			});
			return result;
		}
  

  
  // 1　◆　共通　ドラッグ及び　inputのファイルのhandleFileでの local保存の終了処理  photo項目は必ず有る
		function torikomi_end(e) {
			let dummy = DATA.All_output_filter;
			DATA.Modal_Roding_flg = false;
			if(dummy.length> 0){
/*
				//alert(JSON.stringify(DATA.All_output_filter));
				//DATA.Modal_Roding_flg = false;

					//alert(JSON.stringify(DATA.All_output_filter));
				//provide('parentData99', computed(() => DATA));
*/
			

				//ローカルストレージ対応
				dummy = JSON.stringify(DATA.All_output_filter);//"Local storage"保存のため、JSON文字列にする
				localStorage.setItem('my_map_db', dummy);
				alert('保存しました。\n マーカーを表示します。');
						
				// 例えば、0.1秒後にTheTopに切り替える
				setTimeout(() => {
					router.push({ name: 'TheTop' });
				}, 100);

			}else{//表示無し
				//DATA.Modal_Roding_flg = false;
				alert("取得データは有りません");
			}
		}//終了　torikomi_end
  
  //2 ◆　gisフォーマットのstringになっている   localからの呼び出し  photo項目は必ず有る
  function yobidasi(){
	let dummy = "";
	//ストレージ対応
	dummy = localStorage.getItem('my_map_db');   //キーが存在しない場合、getItemメソッドはnullを返します。
			if(dummy !== null){
				DATA.Modal_Roding_flg = true;
			
				torikomi_start(); //photo項目値の	配列への変換
			}else{
				alert('データはありません。\n 住所の入ったExcelシートを、枠内にドラッグして下さい。');
				return
			}
	  }

	  //3 ◆　ファイル取込の場合のメイン処理
		function torikomi_start(e) {
			DATA.Modal_Roding_flg = false;

			// 例えば、0.1秒後にTheTopに切り替える
			setTimeout(() => {
				router.push({ name: 'TheTop' });
			}, 100);
  		
		}//終了　torikomi_start

  
	function getNowYMD(){
		let dt = new Date();
		let y = dt.getFullYear();
		let m = ("00" + (dt.getMonth()+1)).slice(-2);//末尾から2文字を取得する
		let d = ("00" + dt.getDate()).slice(-2);
		let h = ("00" + dt.getHours()).slice(-2);
		let mu = ("00" + dt.getMinutes()).slice(-2);
		let result = y + "-" + m + "-" + d + "-" + h + "-" + mu;
		return result;
	}
  
	//日付番号からの値の年、月、日の和暦表示
	function getNum_TimestampYMD(stamp){
		//let dt = stamp;
		let dt = new Date(stamp);
		let y = dt.getFullYear();
		let m = ("00" + (dt.getMonth()+1)).slice(-2);//末尾から2文字を取得する
		let d = ("00" + dt.getDate()).slice(-2);
		let h = ("00" + dt.getHours()).slice(-2);
		let mu = ("00" + dt.getMinutes()).slice(-2);
		let result = y + "-" + m + "-" + d;
		return result;
	}
  
	//日付文字列から日付番号の表示
	function date_str_number(val){
		let str = Date.parse(val);
		//let str = Date.parse("2019-01-01");この書式		正しい値が与えられなかった場合、 NaN を返します。
		//let str = Date.parse("2020/2/29");この書式
		let result = Date.parse(str);
		return result;
	}
  
  let deepClone = function(object) {
	var clone = _.clone(object);
	_.each(clone,function(value,key) {
		  if (_.isObject(value)) {
			clone[key] = deepClone(value);
		  }
	});
	return clone;
  };
  
  function is_json(data) {
	try {
	  JSON.parse(data);
	} catch (error) {
	  return false;
	}
	return true;
  }
  // javascript でのnull undefined 判定→false
  function existy(z)
	{return z != null};
  
  // 値のtrue false 判定→
  function truthy(z)
	{return (z !== false) && existy(z)};
  
  
  function edit_sougou_list(val,index){
	DATA.Modal_edit_flg=true;
	DATA.Edit_Retu_name=val;
  }
  
  function tukaikata(){
	window.open('tukaikata.html', '_blank');
  }
  
  //有効期限の確認	
		function kigenhandan(){ 
		 		let dt = "";
				let y = "";
		 		let m = "";//末尾から2文字を取得する
		 		let d = "";
		 		let result = "";

				//初めに、有効期限のチェック
				let dummy = localStorage.getItem('kigen_word');   //キーが存在しない場合、getItemメソッドはnullを返します。 
				if(dummy !== null){
					let kigen_db = JSON.parse(dummy);

/*
					alert(kigen_db.motodate);//2024-08-06
					alert(Date.parse(kigen_db.motodate));//1722902400000
					alert(kigen_db.date_next);//2024-11-06
					alert(Date.parse(kigen_db.date_next));//1730851200000
*/

					// 今日の日付を取得
		 			dt = new Date();
					y = dt.getFullYear();
		 			m = ("00" + (dt.getMonth()+1)).slice(-2);//末尾から2文字を取得する
		 			d = ("00" + dt.getDate()).slice(-2);
		 
		 			result = y + '-' + m + '-' + d;//Date.parse("2019-01-01")	→1265969999
		 			//alert(Date.parse(result));→1265969999

					if(Date.parse(result) > Date.parse(kigen_db.date_next)){
alert('実行期限が超えています。\n 実行の場合は「問い合せ」フォームにて、有効期限の解除を選び送信願います。');
						DATA.Layer01 = 'MAP_NON';
						DATA.Layer02 = '';
					}else{
						//無料期限内です
						DATA.Layer01 = 'MAP_NON';
						DATA.Layer02 = 'Drag';

					}

				} else {
					alert("新規の、開始日データを保存します。");//json
					// 今日の日付を取得
		 			dt = new Date();
					y = dt.getFullYear();
		 			m = ("00" + (dt.getMonth()+1)).slice(-2);//末尾から2文字を取得する
		 			d = ("00" + dt.getDate()).slice(-2);
		 
		 			result = y + '-' + m + '-' + d;//Date.parse("2019-01-01")	→1265969999

					/*
		 			alert(result);
		 			alert(Date.parse(result));//→1265969999
					*/

					// 3カ月後の日付を設定
		 			let next = new Date();
					next.setMonth(next.getMonth()+3);// 3カ月後の日付を設定

					let y3 = next.getFullYear();
					let m3 = ('00' + (next.getMonth()+1)).slice(-2);
					let d3 = ('00' + next.getDate()).slice(-2);
		 			let result_next = y3 + '-' + m3 + '-' + d3;

		 			//alert(Date.parse(result_next));	1730678400000

					let obj99={motodate:result,date_next:result_next};
					let obj55 = JSON.stringify(obj99);
					localStorage.setItem('kigen_word', obj55);
				}

			}

  onMounted(function() {
	  // モバイルの判断
	  DATA.Mobile_flg = isMobile();  
	  kigenhandan(); 
	})
  
  </script>