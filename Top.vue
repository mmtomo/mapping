<template>
	<template v-if="DATA.Layer01 == 'MAP_NON'" class="w-100 mt-2"><!-- 初期設定は、''	 Vue.onMountedは、MAP_NON	-->

		<div v-if="DATA.Layer02 == '登録'" class="w-90 mt-2 ms-2"><!-- 登録	-->
			<div style = "background-color:#ffffe0;"><!--	 class="overlay"-->

				<div class = "flex-touroku-menyu">
					<div class = "ms-3">
						<button type="button" class="btn btn-warning ml-4 mt-1" @click="close_Touroku">閉じる</button> 　　
					</div>

					<div class = "">
						<span v-html="DATA.KeiIdo_Info"  class="button_g"></span>　　
					</div>

				</div>

				<div class="scroll-box-top">
					<div class="flex-touroku">
						<div class="">
							<table class="table table-sm table-striped table-hover">
								<thead>
									<tr :style="{fontSize:fontSize.size,backgroundColor:'#ffe4c4'}">							
										<th scope="col" style="width:auto;">項　目</th>
										<th scope="col" style="width:auto;">内　容</th>
										<th scope="col" style="width:auto;">選択入力</th>
									</tr>
								</thead>
								<tbody >
									<tr v-for="(item,idx) in DATA.Touroku_Names_Html" v-bind:key ="idx" :style = "{fontSize: fontSize.size}">
									<template v-if = "item != '' && item != 'photo'">
										<!--	1列目	-->
										<th scope="col"><span :style="{fontSize: fontSize.size}">{{item}}</span></th>
										<!--	2列目	-->
										<td v-if = "item != 'photo'">
											<input type ="text" :style="{fontSize: fontSize.size}" class = "form-control" 
												v-model.trim.lazy="DATA.Select_json_Single[item]" ></td>
										<!--	3列目	-->
										<td v-if = "item != 'photo'">
											<button type="button" @click="edit_sougou_list(item,idx)">
												<span class="input_size"> S</span></button></td><!--アイコン有り -->
										<td v-else></td>
									</template>
									</tr>		
								</tbody>
							</table>
						</div>
						<div class="flex-touroku-item02 ms-3">
							<button type="button"
								class="btn btn-primary btn-sm mb-1" @click="ph_in_map_Modal()">
								<span class="input_size"> 写真登録</span></button>

							<!--登録済の写真があれば、表示-->
							<template v-if="DATA.Select_json_Single['photo'].length >0">
								<section>
									<template v-for="(item,index) in DATA.Select_json_Single['photo']" v-bind:key="index">
										<div class="card" style = "float:left;width:45%;">
											<img :src="item.url" > 
											<div class="card-body">
												<span @click="ph_sakuzyo(index)" class="text-danger" 
												:style="{cursor: pointer,fontSize: fontSize.size}">◆写真削除</span>
											</div>
										</div> 
									</template>
								</section>
							</template>
						</div>
					</div><!-- 	-->
				</div><!--	 class="scroll-box-top"	-->

			</div><!--style = "background-color:#ffffe0;	-->
		</div><!-- 終了	v-if="DATA.Layer02 == '登録'"	-->

	</template>

<div v-show = "DATA.Layer01 != ''">		<!-- == 'MAP_NON	v-show = "DATA.Layer01 == 'MAP'"--> 

	<div class = "container">
			<template v-if="DATA.Layer01 != 'MAP_NON'">
				<div class="sub-nav"> <!--終了class="sub-nav"	-->

						<div style="display: flex;flex-direction:row;gap:8px;padding:5px;"><!--終了> gap:8px;	-->
							<div class="dropdown">
								<button class="btn btn-danger dropdown-toggle d-print-none" type="button"
									id="dropdownMenuButton100" data-bs-toggle="dropdown" aria-expanded="false">
										<span :style="{color: black,fontSize:fontSize.menu}">
										<img src="@/assets/kensaku.png"  :width="imgSize.width" :height="imgSize.height" class="me-2">
										検索</span> 
										</button>

									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton100" style = "background-color:#ffe4ce;">
										<li>
											<div class="scroll-box-kensaku">
												<template v-for = "item in DATA.Kensaku_Kubun_Set_Names">    <!--計算式はダメで変数のこと	-->
													<li class="dropdown-item" v-on:click="onkubun_select(item)" style="cursor: pointer;">
													◆{{item}}</li>	
												</template>
											</div>
										</li>
										<li style="cursor: pointer;"><a class="dropdown-item" v-on:click="all_map();">
											<span style="color:green;">◆</span>
												全てを選ぶ</a></li>
									</ul>
							</div>
							<div class="d-print-none">
								<button type="button" class="btn btn-primary" @click="genzaiti">
									<span :style="{color: black,fontSize:fontSize.menu}">
									<img src="@/assets/genzaichi.png" :width="imgSize.width" :height="imgSize.height" class="me-2">
									現在地</span>
								</button>
							</div>
							<div class="d-print-none">
								<button type="button" class="btn bg-secondary" @click="home">
									<span :style="{color: black,fontSize:fontSize.menu}">
									<img src="@/assets/home.png" :width="imgSize.width" :height="imgSize.height" class="me-2">
									ホーム</span>
								</button>
							</div>
						</div><!--終了	-->
		
						<div style="display:flex;gap:8px;"><!--gap:16px;	-->
							<div >
								<div class="normal_save d-print-none">
									<div @click="db_save" class="mt-2">
										<span  :style="{color: black,fontSize:fontSize.menu}">
											<img src="@/assets/hozon.png" :width="imgSize.width" :height="imgSize.height" class="me-2">
											保存
										</span>
									</div>
								</div>
							</div>

							<template v-if= "!DATA.Mobile_flg">
								<div class="excel_save d-print-none">
									<div @click="excel_save" class="mt-2">
										<span  :style="{color: black,fontSize:fontSize.menu}">
											<img src="@/assets/kakidashi.png" :width="imgSize.width" :height="imgSize.height" class="me-2">
											Excelに保存</span>
									</div>
								</div>						
							</template>
							
							<div class="d-print-none">
								<button type="button" class="btn bg-warning" @click="toiawase">
									<span :style="{color:'black',fontSize:fontSize.menu}">
									<img src="@/assets/otoiawase_1.png" :width="imgSize.width" :height="imgSize.height" class="me-2">
									問い合せ</span>					
								</button>
							</div>
						</div> <!--終了	-->


				</div><!--終了class="sub-nav"	-->

			</template><!--終了 v-if="DATA.Layer01 != ''"-->

			<div >
				<div class="map" id="map"></div>
			</div>

	</div>	<!--終了"container"	-->

</div>	<!--	終了v-show = "DATA.Layer01 != ''"	-->


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

				   <!--	②検索区分からの、一般表示エリアの選択	-->
					<transition name="modal" v-if="DATA.Modal_kubun_select_flg">
						<div class="overlay" @click="DATA.Modal_kubun_select_flg = false">
							   <div class="panel99" @click.stop>
									<template v-if="DATA.SutiRetus_flg == 'suti'"><!--数値の列なら	-->
												<h6>{{DATA.Retu_name}}を選択してください</h6>
									</template>
									<template v-else>
												<h6>{{DATA.Retu_name}}を選択してください</h6>
									</template> 
									<div class="scroll-box">
										<li v-for="(item,idx02) in result_kensaku_retu_db(DATA.Retu_name)" v-bind:key="idx02" 
										@click="onSelect_bunruiChanged(item)" style="cursor: pointer;">{{item.name}}</li>
									</div>
								</div>
						</div>
					</transition>

					<transition name="modal" v-if="DATA.Modal_edit_flg">
							   <div class="overlay" @click="DATA.Modal_edit_flg = false">
								   <div class="panel99" @click.stop>
									   <h4>④{{DATA.Edit_Retu_name}}を選択してください</h4>
									   <!--　0の時は？　エラー	-->
									   <div class="scroll-box">
											<li v-for="item in result_edit_db(DATA.Edit_Retu_name)" 
												@click="onSelect_edit_01(item)" style="cursor: pointer;">
													{{item.name}}
											</li>
							   			</div>
										<button class="panelbtn" @click="close_selectModal">閉じる</button>
								   </div>
							   </div>
					</transition>

				   <transition name="modal" v-if="DATA.Modal_Photo_flg"><!--	写真取り込み画面	-->
					   <div class="overlay" @click="DATA.Modal_Photo_flg = false">
						   <div class="panel99" @click.stop>
							   <h6 class="mr-3">写真取り込み</h6>
							   <!--登録写真の選択-->
							   <div class="ml-1">
								   <label>
									   <input
										   @change="attachImg"
											   accept="image/jpeg, .jpg, .jpeg"
											   type="file"
											   id="file"
											   ref="fileInput"
										   style="display:none"
									   >写真を選択
								   </label> 
							   </div>
							   <!-- プレビュー -->
							   <div class="col-auto mt-1">
								   <img :src="DATA.ResizedImg" class=""><!--	-->
							   </div>
							   <div class = "btn-group m-3" role="group">
								   <button type="button" class="btn btn-info btn-sm" @click="ph_in_map_kakutei">
									   確定する</button>
								   <button type="button" class="btn btn-secondary btn-sm" @click="close_Modal_Photo_flg">
									   キャンセル</button>
							   </div>
						   </div>
					   </div>
				   </transition>


</template>


<script setup>

		import {reactive,computed,onMounted,inject} from 'vue'
		import { useRouter } from 'vue-router';

		const qkeyname = import.meta.env.VITE_QKEYNAME
		const router = useRouter();

  		let torikomi_file = "";
		let Total_output = [];  // 全データ （管理用）
	
		let Edit_output = [];     // 選択したデータ （管理用）
		let Edit_Non_output = [];   // 未選択の全データ （管理用）

		let All_Blob = [];//複数写真の表示用の素データの配列

		//let out_db = null;
		let obj = null;

		let center_lng = 136.219482;  //福井駅
		let center_lat = 36.064087; 

		const imgSize = reactive({
			width: 20, // 初期幅
			height:20 // 初期高さ
		});

		const fontSize = reactive({
			size: '120%' // 初期フォントサイズ
		});

		const DATA = reactive({
			//表示状態flg
			Layer01:'MAP',      //'MAP_NON'	'MAP'
			Layer02:"",      //Form	Drag	'登録'

			All_output_filter: [], //全データ（表示用）
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
Hikaku_flg:"onazi",
			Izyou_flg:true,

			//地図関係
			map: null,
			ALLControl:null,
			DrawControl:null,

			Map_BaseLayer:"",
			OverLay:null,

			MyGroup2:null,
			MyGroup3:null,

			awatizu:null,
			o_std:null,
			ph_2007:null,

			KeiIdo_Info:null,

			Select_json:null,
			Select_json_Single:null,
			Select_json_Single_Pre:null,
			MyLat:null,
			MyLng:null,
			MyLayer:null,

			//区分検索用
			Retu_name : "",
			Retu_dat : "",
			kubun_Select_Info : "",
			Kensaku_Dats:[],

			//photo用
			Modal_Photo_flg:false,
			ResizedImg:null,
			Pre_Ph_Retu:{},

			ChngeColor_flg:false,
			last_wno:""
      
		  });
		  
		  //終了　reactive
	
		/** モバイル端末なら true 、それ以外なら false を返す */
		function isMobile(){
			let regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			return (window.navigator.userAgent.search(regexp) !== -1);
		}

    		//４ ◆　ファイル取込の場合のメイン処理
        	function torikomi_start(e) {
				if(DATA.All_output_filter.length> 0){
					//photo項目値の	配列文字への変換
					_.each(DATA.All_output_filter,function(item){
						_.each(DATA.Excel_Out_Retu,function(x,idx){
							//json文字列かの 判定
							if(is_json(item.properties[x]))	item.properties[x] =  JSON.parse(item.properties[x]);
						});
					});
					DATA.kubun_Select_Info = '<button type="button" class="btn btn-light btn-sm">選択区分：◆全部表示です</button>'+
						'<span class="kensu_size">' + DATA.All_output_filter.length + '件</span>';

					//init_map01();     ここは、不要
					//init_map01_01();
					DATA.Modal_Roding_flg = false;

					/*
						alert("parent99");			
						alert(JSON.stringify(parentData99));
					*/

					DATA.Layer01 = 'MAP';//	

					init_map01();
					init_map01_01();
					init_map02();
					first_map();
				}else{//表示無し
					DATA.Modal_Roding_flg = false;
					alert("表示データは有りません");
				}
        	}//終了　torikomi_start

//MAP 処理
		function init_map01(){
				DATA.awatizu = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
					attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
				});
				DATA.o_std = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				});
				DATA.ph_2007 = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
					attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
				});

/*
				DATA.map =  new L.Map('map',{layers: [DATA.awatizu], center: new L.LatLng(36.064087,136.219482), zoom:14,zoomDelta:2,
							minNativeZoom: 0,maxNativeZoom: 0, zoomControl:true});//福井市 true
*/

				DATA.map =  new L.Map('map',{layers: [DATA.awatizu], center: new L.LatLng(center_lat,center_lng), zoom:14,zoomDelta:2,
							zoomControl:true});//福井市 true

				/*◆タイル切り替えの表示に必要   タイルのレイヤーを変数に入れて置く	https://ops.jig-saw.com/tech-cate/leaflet_maps   */
				DATA.defaults = {
					key: qkeyname ,
					detectRetina: true
				};

				DATA.Map_BaseLayer = {"地理院 淡色地図":DATA.awatizu,"OpenStreetmap":DATA.o_std,"地理院 航空写真":DATA.ph_2007};

				DATA.MyGroup2 = L.layerGroup();
				DATA.MyGroup3 = L.layerGroup();
/*
				DATA.ALLControl = L.control.layers(DATA.Map_BaseLayer,DATA.OverLay,{collapsed:true}).addTo(DATA.map);    // collapsed:true
*/

				['RoadOnDemand'].forEach(function (imagerySet) {		
					DATA.Map_BaseLayer[imagerySet] = L.bingLayer(L.extend({imagerySet: imagerySet}, DATA.defaults));
				});

				['Aerial', 'AerialWithLabelsOnDemand','RoadOnDemand'].
					forEach(function (imagerySet) {
					DATA.Map_BaseLayer[imagerySet] = L.bingLayer(L.extend({imagerySet: imagerySet}, DATA.defaults));
				});

				DATA.map._onResize();

		}//終了 init_map01()


		function init_map01_01(){
/*
				DATA.ALLControl = L.control.layers(DATA.Map_BaseLayer,DATA.OverLay,{collapsed:true}).addTo(DATA.map);    // collapsed:true
*/
				DATA.map._onResize();
		}//終了 init_map01_01


			function init_map02(){
				//下記はレイヤー地図の切り替え
				if (DATA.map.hasLayer(DATA.Select_json) == true) {DATA.map.removeLayer(DATA.Select_json); 
				}else{DATA.Select_json = new L.FeatureGroup();}

				if (DATA.map.hasLayer(DATA.MyGroup2) == true) {DATA.map.removeLayer(DATA.MyGroup2); 
				}else{DATA.MyGroup2 = new L.layerGroup();}

				if (DATA.map.hasLayer(DATA.MyGroup3) == true) {DATA.map.removeLayer(DATA.MyGroup3); 
				}else{DATA.MyGroup3 = new L.layerGroup();}

				//下記はControlのレイヤー地図の切り替え
				if (DATA.DrawControl) DATA.map.removeControl(DATA.DrawControl);
				if (DATA.ALLControl) DATA.map.removeControl(DATA.ALLControl);

				let sentou_rec = _(DATA.All_output_filter).first();
//alert(JSON.stringify(sentou_rec));
				let sentou_keyretu = _(sentou_rec.properties).keys();
//alert(JSON.stringify(sentou_keyretu)); 
				let result = _(sentou_keyretu).indexOf('一覧表示');
				if(result == -1) {//一覧表示が無い場合
					DATA.ALLControl = L.control.layers(DATA.Map_BaseLayer,null,{collapsed:true}).addTo(DATA.map);
				}else{//一覧表示が有る場合
					if(DATA.All_output_filter.length<1000){//overlay表示は、1000件以下の場合
						let aza = new L.geoJSON(DATA.All_output_filter, {
							pointToLayer: function(feature,latlng){ 
								if (feature.geometry.type === 'Point') { 
									let lat = latlng.lat; 
									let lng = latlng.lng; 
						L.marker([lat,lng],{icon:L.divIcon({className:'AzaName',html:feature.properties["一覧表示"]})}).addTo(DATA.MyGroup3); //◆項目名による
								} //終了	if 
							}  //終了pointToLayer
						}); //終了L.geoJSON
						DATA.overlay = {"一覧表示": DATA.MyGroup3};
						DATA.ALLControl = L.control.layers(DATA.Map_BaseLayer,DATA.overlay,{collapsed:true}).addTo(DATA.map);								//1000件以上の場合
					}else{DATA.ALLControl = L.control.layers(DATA.Map_BaseLayer,null,{collapsed:true}).addTo(DATA.map);}
				}
			}//終了 init_map02()

			function first_map(){
				L.drawLocal.draw.toolbar.buttons.polyline = 'ポリラインを描画';
				L.drawLocal.draw.toolbar.buttons.polygon = 'ポリゴンを描画';
				L.drawLocal.draw.toolbar.buttons.rectangle = '矩形を描画';

				L.drawLocal.draw.toolbar.buttons.circle = '円を描画';
				L.drawLocal.draw.toolbar.buttons.marker = 'マーカーを描画';
				L.drawLocal.draw.toolbar.buttons.circlemarker = '丸枠を描画';

				L.drawLocal.draw.toolbar.actions.title = '描画をキャンセル';
				L.drawLocal.draw.toolbar.actions.text = 'キャンセル';
				L.drawLocal.draw.toolbar.finish.title = '描画を終了';
				L.drawLocal.draw.toolbar.finish.text = '終了';
				L.drawLocal.draw.toolbar.undo.title = '最後のポイントを削除';
				L.drawLocal.draw.toolbar.undo.text = '削除';

				L.drawLocal.edit.toolbar.actions.save.title = '変更を保存';
				L.drawLocal.edit.toolbar.actions.save.text = '保存';
				L.drawLocal.edit.toolbar.actions.cancel.title = '編集をキャンセル';
				L.drawLocal.edit.toolbar.actions.cancel.text = 'キャンセル';
				L.drawLocal.edit.toolbar.actions.clearAll.title = '全てのレイヤーを削除';
				L.drawLocal.edit.toolbar.actions.clearAll.text = '全削除';
				L.drawLocal.edit.toolbar.buttons.edit = 'レイヤーを編集';

				L.drawLocal.edit.toolbar.buttons.editDisabled = '編集するレイヤーがありません';
				L.drawLocal.edit.toolbar.buttons.remove = 'レイヤーを削除';
				L.drawLocal.edit.toolbar.buttons.removeDisabled = '削除するレイヤーがありません';

				/*
				L.drawLocal.draw.toolbar.buttons.polyline = '線を描く';
				L.drawLocal.draw.toolbar.buttons.polygon = '多角形を描く';
				L.drawLocal.draw.toolbar.buttons.rectangle = '四角形を描く';
				L.drawLocal.draw.toolbar.buttons.circle = '円を描く';
				L.drawLocal.draw.toolbar.buttons.marker = 'マーカーを置く';

				L.drawLocal.draw.toolbar.buttons.circlemarker = '丸枠を描画';

				L.drawLocal.draw.toolbar.actions.title = 'キャンセル';
				L.drawLocal.draw.toolbar.actions.text = 'キャンセル';
				L.drawLocal.draw.toolbar.finish.title = '終了';
				L.drawLocal.draw.toolbar.finish.text = '終了';
				L.drawLocal.draw.toolbar.undo.title = '最後のポイントを削除';
				L.drawLocal.draw.toolbar.undo.text = '削除';
				*/

				DATA.Select_json = new L.geoJSON(DATA.All_output_filter, {
					pointToLayer: pointToLayer,
					onEachFeature: onEachFeature
				});//終了L.geoJSON

				DATA.map.addLayer(DATA.Select_json);
				DATA.DrawControl = new L.Control.Draw({
						        position: 'topright',
						        draw: {
						            polyline: false,
						            circle: false,
						            //circlemarker: false,
						            rectangle: false,
						            simpleshape: false,
						            feature: false,
							　　	polygon: false,
						            marker: false
						        	},
						        edit: {
						            featureGroup: DATA.Select_json,
						            remove: true
						        }
				});
				DATA.map.addControl(DATA.DrawControl);

				//新規描画の場合
				DATA.map.on(L.Draw.Event.CREATED, function (e) {
					DATA.Select_json.addData(e.layer.toGeoJSON());

				/*  下記は検証で必要
					alert("abcde");
					alert(JSON.stringify(e.layer.toGeoJSON()));
				*/
					//項目の初期値を設定
					let New_NonDatproperti = {};
					let proper_su = [];
					proper_su = _.map(DATA.Excel_Out_Retu,function(){
						return "?";//
					});
					let NonData = _.zip(DATA.Excel_Out_Retu,proper_su);  //複数の配列から対の配列を作る
					New_NonDatproperti = _(NonData).object();//対の配列をオブジェクトに変換する   項目に"photo"有り　データ　"?"
					//項目"photo"の初期値を配列にする
					New_NonDatproperti["photo"] = [];
				/*   下記は検証で必要
					e.layer.properties = New_NonDatproperti;
					alert(JSON.stringify(e.layer.properties));
				*/

					let layers = [];
					//★下記は必要
					let keys = [];
					let key = "";
					let layer = {};

					layers = DATA.Select_json._layers,
						keys = Object.keys(layers),
						key = keys[keys.length - 1],
						layer = layers[key];
						/* 下記は検証で必要
							alert("mmmmm");
							let abcde = layer.toGeoJSON();
							abcde.properties = New_NonDatproperti;
							alert(JSON.stringify(abcde));
						*/

					layer.feature.properties = New_NonDatproperti;
				});//終了 DATA.map.on
					let layerCtrl = L.control.layers();
					let featureLayer = L.featureGroup();
					layerCtrl.addOverlay(featureLayer);
					featureLayer.addTo(DATA.map);

					DATA.map._onResize();//◆地図の中心位置のリセット
					DATA.map.fitBounds(DATA.Select_json.getBounds());

			}//終了 first_map

		function pointToLayer(feature,latlng){
			if(! DATA.Mobile_flg){
				if(DATA.ChngeColor_flg == true) {
					return L.circleMarker(latlng,{radius: 10,fillColor:"#00ffff",color:"#00ffff",weight:2,opacity:1,fillOpacity:0.5});//青
				}else{
					return L.circleMarker(latlng,{radius: 10,fillColor:"#ffff00",color:"#ff0000",weight:2,opacity:1,fillOpacity:0.5});//黄
				}			
			}else{
				if(DATA.ChngeColor_flg == true) {
					return L.circleMarker(latlng,{radius: 15,fillColor:"#00ffff",color:"#00ffff",weight:2,opacity:1,fillOpacity:0.7});//青
				}else{
					return L.circleMarker(latlng,{radius: 15,fillColor:"#ffff00",color:"#ff0000",weight:2,opacity:1,fillOpacity:0.7});//黄
				}		
			}
		}
		
		//終了pointToLayer

		function onEachFeature(feature,layer){
				layer.on("mouseover", function(e){
					let layer = e.target;
					let ms ="";
					let tuika ="";

/*    これも可
					for (let i = 0; i < 10; i++){  //photoをはずす
						tuika = '<li >'+ DATA.Touroku_Names_Html[i] + ':' + 
							layer.feature.properties[DATA.Touroku_Names_Html[i]]  + '</li>';
						ms = ms + tuika;
					}
 */
				if(DATA.Mobile_flg == true) {
					if(DATA.Touroku_Names_Html.length >5){
						for (let i = 0; i < 5; i++){  //photoをはずす
							tuika = '◆'+ DATA.Touroku_Names_Html[i] + ':' + 
								layer.feature.properties[DATA.Touroku_Names_Html[i]]  + '<br>';
							ms = ms + tuika;
						}
					}else{
						for (let i = 0; i < DATA.Touroku_Names_Html.length; i++){  //photoをはずす
							tuika = '◆'+ DATA.Touroku_Names_Html[i] + ':' + 
								layer.feature.properties[DATA.Touroku_Names_Html[i]]  + '<br>';
							ms = ms + tuika;
						}
					}
					ms = '<div><span  style = "color: #ff00ff">全項目の表示は、マーカーをクリックして下さい。</span><br>'+ 
						'<span  style = "color: #ff00ff">項目値の検索は、検索ボタンをクリックして下さい。</span><br>'+ 
						ms  + '</div>';

				}else{
					if(DATA.Touroku_Names_Html.length >20){
						for (let i = 0; i < 20; i++){  //photoをはずす
							tuika = '◆'+ DATA.Touroku_Names_Html[i] + ':' + 
								layer.feature.properties[DATA.Touroku_Names_Html[i]]  + '<br>';
							ms = ms + tuika;
						}
					}else{
						for (let i = 0; i < DATA.Touroku_Names_Html.length; i++){  //photoをはずす
							tuika = '◆'+ DATA.Touroku_Names_Html[i] + ':' + 
								layer.feature.properties[DATA.Touroku_Names_Html[i]]  + '<br>';
							ms = ms + tuika;
						}
					}
					ms = '<div><span  style = "color: #ff00ff">全項目の表示は、マーカーをクリックして下さい。</span><br>'+ 
						'<span  style = "color: #ff00ff">項目値の検索は、検索ボタンをクリックして下さい。</span><br>'+ 
						ms  + '</div>';
				}


					layer.setStyle({
						weight: 5,
						color: '#ff00ff',//灰色　#666　　ピンク系赤　#ff00ff
						fillOpacity: 0.5
					});

					let hover_bubble = new L.Popup({ offset: new L.Point(0,-5), closeButton: false, autoPan: true })
						.setContent(ms)
						.setLatLng(e.latlng)
						.openOn(DATA.map);
				});
				layer.on("mouseout", function(e){
					DATA.Select_json.resetStyle(e.target);//必用
					DATA.map.closePopup()
				});
				layer.on("click",function(e){
					DATA.MyLayer = e.target;//クリックレイヤーの取得

					let item = DATA.MyLayer.feature.properties;
					DATA.Select_json_Single = item;
					DATA.Select_json_Single_Pre = deepClone(DATA.Select_json_Single);
					//alert(JSON.stringify(DATA.Select_json_Single));
					//クリック場所の緯度/経度の取得
					DATA.MyLat = e.latlng.lat;//緯度
					DATA.MyLng = e.latlng.lng;//経度

					DATA.KeiIdo_Info = '<a href = "https://www.google.com/maps/dir/?api=1&destination=' + DATA.MyLat + ',' + DATA.MyLng + '" ' + 'target="_blank">経路の確認 </a>';
			//alert(DATA.KeiIdo_Info);

				DATA.Layer01 = 'MAP_NON';
				DATA.Layer02 = '登録';
				});

		}//終了onEachFeature

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAP NAV

		//①★検索区分後の処理
		function onkubun_select(item){
			DATA.Retu_name = item;// 列名	DATA.Retu_nameへの代入が必要、

				let result = _(DATA.SutiRetus).indexOf(DATA.Retu_name);						 
				if(result == -1) {//_が無い場合 文字列
					DATA.SutiRetus_flg="mozi";
					DATA.Hikaku_flg = "onazi";
				}else{//_数値
					DATA.SutiRetus_flg="suti";
				}
			DATA.Modal_kubun_select_flg = true;//<!--	③一般表示エリアの選択	-->
		}

		//全体表示の場合の処理 
		function all_map(){
			DATA.Retu_name = null;//初期化
			DATA.Retu_dat = null;//初期化

			//更新されたTotal_outputの取得
			if(DATA.All_output_filter.length>0){
				Total_output = select_json_DO();//全体表示前のEdit_outputとTotal_outputが取得される
			}
			//次のDATA.All_output_filter取得のステップ
			Edit_Non_output = [];//◆選択以外のデータの初期化

			//DATA.All_output_filterへの反映
			DATA.All_output_filter = Total_output;//全レコードを返す
			if(DATA.All_output_filter.length> 0){
				DATA.kubun_Select_Info = '<button type="button" class="btn btn-light btn-sm">選択区分：◆全部表示です</button>'+
					'<span class="kensu_size">' + DATA.All_output_filter.length + '件</span>';
				setTimeout(function(){DATA.map.invalidateSize()}, 50);
				init_map02();
				first_map();
			}else{
				alert("選択データはないです。");
				DATA.kubun_Select_Info = '';
				return ;
			} 
		}//終了	"all_map()"

		  function genzaiti(e) {
			if (DATA.map.hasLayer(DATA.MyGroup2) == true) {DATA.map.removeLayer(DATA.MyGroup2); 
			}else{
				DATA.MyGroup2 = new L.layerGroup();}

				navigator.geolocation.getCurrentPosition(success, error);
				if (navigator.geolocation == false){
					alert('現在地を取得できません。');
					return;
				}
		 }

		 function success(e) {
		          let lat  = e.coords.latitude;
		          let lng = e.coords.longitude;
		          DATA.map.setView([lat, lng]);
		          //DATA.map.setView([lat, lng], 15);
		          DATA.MyGroup2 = L.marker([lat,lng]).addTo(DATA.map).bindPopup('現在地').openPopup();
		 }
 
		function error() {
		          alert('現在地を取得できません。');
		}

		function home(){
			//alert("abcde");
    			//location.href = 'index.html';
				setTimeout(() => {
					router.push({ name: 'TheStart' });
					//router.push('/'); ok
					//router.push({ path: '/' }); ok
					//router.go(-1); ok
				}, 100);	
		}

   		//５ ◆　保存
		function db_save(){
			//ローカルストレージ対応
			let dummy = select_json_DO();//最新のTotal_outputを得る
			let pre_All_output = JSON.stringify(dummy);//"Local storage"保存のため、JSON文字列にする
			localStorage.setItem('my_map_db', pre_All_output);
			alert('ストレージに保存しました。');
			//alert(pre_All_output);
		}

		//６　★　excelへ保存処理
		function excel_save(){
			let data99 = DATA.Select_json.toGeoJSON();//
            			// 入力データ更新
				if(_.size(data99)>0){//オブジェクトの要素数があれば

					let out_db_pre = select_json_DO(data99);//Select_json.toGeoJSON()を最初に取り込んだGeoJSONに変換する

						let ans01 = _(out_db_pre).any(function(item){return truthy(item.properties["photo"].length>1)});
						if(ans01 == true) {//_が有る場合
							alert("1レコードに、写真データが複数あるので、Excelには保存できません。\nローカルストレージに保存します。");
							db_save();
							return
						}

					DATA.excel_save_flg = true;//大事

					let out_db = _.sortBy(out_db_pre,function(obj){return parseInt(obj.properties["管理NO"])});//管理NOでソートした配列を返す
					let dummy_record = data99.features[0].properties;//propertiesデータの配列での取得	0	
					let s_gis_titles1 = _(dummy_record).keys();//①-1　　propertiesの全列名の配列の取得	excelの１行目の登録

					let result = _(s_gis_titles1).indexOf('更新日');
					//更新日の項目が無い場合						 
					if(result == -1) {
						s_gis_titles1.push('更新日');
					}

					result = _(s_gis_titles1).indexOf('位置メモ');
					//位置メモの項目が無い場合						 
					if(result == -1) {
						s_gis_titles1.push('位置メモ');
					}

/*
					result = _(s_gis_titles1).indexOf('photo');
					//photoの項目が無い場合						 
					if(result == -1) {
						s_gis_titles1.push('photo');
					}
*/

					//列に配列データがある場合の設定に必要
					let pre_titles = deepClone(s_gis_titles1);//excelの'lng''lat'を除いた項目列

					s_gis_titles1.unshift('lat');//①-2　propertiesの列名の先頭にlat列名の追加　緯度35.790806
					s_gis_titles1.unshift('lng');//①-2　propertiesの列名の先頭にlng列名の追加　経度136.3256

					//aoa_to_sheetへの書き出し用の変数の設定
				        let createXLSLFormatObj = [];
				        let innerRowData = [];

					//coordinates用変数の初期化
				        let coords_retu_in = [];

					//excelの１行目のタイトル行の出力データの設定
					//s_gis_titles1 = _(s_gis_titles1).initial(1);initial最後のn個以外のデータを削除する　wno
        				createXLSLFormatObj.push(s_gis_titles1);

					//excelのデータ行の出力データの設定
					_.each(out_db,function(item,index){//各レコード
						//配列に値を追加する
						innerRowData = [];//各レコードの初期化

						//列に配列データがある場合
						innerRowData = pre_titles.map(function(x){//出力順に生成
							//if(_.isArray(item.properties[x])){	
							if(Array.isArray(item.properties[x])){	
								// 配列の場合
								return JSON.stringify(item.properties[x]);
							} else {
								// 配列ではない。
								return item.properties[x];
							}
						});

						//②-各coordinatesの経緯度データを返す Point
						coords_retu_in = item.geometry.coordinates;//coordinatesの経緯度データの取込
						//③各レコードの配列の先頭に経度 緯度の追加
				            	innerRowData.unshift(coords_retu_in[1]);//　緯度35.790806
				            	innerRowData.unshift(coords_retu_in[0]);//　経度136.3256

						//④各レコードをexcel出力用の配列に追加
				            	createXLSLFormatObj.push(innerRowData);
				        });
						//ワークシート用データの作成 sheet.jsの活用
						let ws_data = createXLSLFormatObj;
						alert("excelファイルを、ダウンロードします");
						let wb = XLSX.utils.book_new();
						let filename = "";

						filename = "save_" + getNowYMD() + ".xlsx";
						

						wb.SheetNames[0] = 'Sheet1';//シート名の設定。呼び出しにも使っている
						//配列データをワークシート用データに変換
						let ws = XLSX.utils.aoa_to_sheet(ws_data);
						wb.Sheets["Sheet1"] = ws;//該当シートにデータを設定

						let wbout = XLSX.write(wb,{bookType:'xlsx',type: 'binary'});//xlsx用にデータを書き込む
						saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}),filename);

				}else{ 
					alert("データが無いです");
				}
		}//	"click","excel_save"


//MAP NAV 終了

		function select_json_DO(){//最新のselect_json取得
			//最新のTotal_outputを得る
			Edit_output = start_toGeoJSONDB();
			Total_output = deepClone(Edit_output);

			if(Edit_Non_output.length>0) {//旧選択外のレコードがあるなら
				Total_output = _.union(Edit_output,Edit_Non_output);
			} 
			return Total_output;
		}

		function start_toGeoJSONDB(){//edit_dbが取得される
			let dat = DATA.Select_json.toGeoJSON();
			let edit_db = [];
			obj = null;
			$.each(dat.features,function(index,item) {
				obj = {"type": "Feature","geometry": {"type": "Point","coordinates": []}};//[136.378913,36.091453]
				obj.geometry.coordinates = item.geometry.coordinates;		//変更された、coordinatesの経緯度データの取込
				item.properties = _(item.properties).omit("_feature");	//変更された、select_jsonで作られた不要objectの、 __proto__	_featureを除く
					//obj = _(obj).omit("_feature","__proto__");__proto__:
				obj.properties = item.properties;//
				edit_db.push(obj);
			});
			return edit_db;
		}

			function select_map(){
				//更新されたTotal_outputの取得
				if(DATA.All_output_filter.length>0){//	Edit_Non_output = []は上記で判断
					Total_output = select_json_DO();//Edit_outputとTotal_outputが取得される
				}
				let dummy = [];

				if(DATA.Kensaku_Dats[0].hikaku == "onazi"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
					DATA.Kensaku_Dats[0].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
					DATA.Kensaku_Dats[0].retu_dat});
				}else if(DATA.Kensaku_Dats[0].hikaku == "izyou"){	//以上
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name]
					 >= DATA.Kensaku_Dats[0].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name]
					 >= DATA.Kensaku_Dats[0].retu_dat});
				}else if(DATA.Kensaku_Dats[0].hikaku == "ika"){	//以下
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
					DATA.Kensaku_Dats[0].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] <
					 DATA.Kensaku_Dats[0].retu_dat});
				}else{}

				if(dummy.length> 0){
					Edit_output = dummy;
					DATA.All_output_filter = Edit_output;//選択したレコードを返す

					DATA.kubun_Select_Info = '<button type="button" class="btn btn-light btn-sm">選択区分：'+
					'◆'+ DATA.Kensaku_Dats[0].retu_name +  'の、' + DATA.Kensaku_Dats[0].retu_dat+ 
						'</button><span class="kensu_size">' + 
						DATA.All_output_filter.length + '件</span>';

					setTimeout(function(){DATA.map.invalidateSize()}, 50);
					init_map02();
					first_map();
					DATA.Kensaku_Dats = [];
				}else{
					alert("選択データはないです。");
					DATA.Kensaku_Dats = [];
					DATA.kubun_Select_Info = '';
					return ;
				} 

			}//終了	select_map()

			function select_map_w(){
				//更新されたTotal_outputの取得
				if(DATA.All_output_filter.length>0){//	Edit_Non_output = []は上記で判断
					Total_output = select_json_DO();//Edit_outputとTotal_outputが取得される
				}
				let dummy = [];

				//◆DATA.Kensaku_Dats[0].hikaku == "onazi"
				if(DATA.Kensaku_Dats[0].hikaku == "onazi" && DATA.Kensaku_Dats[1].hikaku == "onazi"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
						DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "onazi" && DATA.Kensaku_Dats[1].hikaku == "izyou"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "onazi" && DATA.Kensaku_Dats[1].hikaku == "ika"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] < DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] == 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] < DATA.Kensaku_Dats[1].retu_dat});

				//◆DATA.Kensaku_Dats[0].hikaku == "izyou"
				}else if(DATA.Kensaku_Dats[0].hikaku == "izyou" && DATA.Kensaku_Dats[1].hikaku == "onazi"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >= 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >= 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "izyou" && DATA.Kensaku_Dats[1].hikaku == "izyou"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >= 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >= 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "izyou" && DATA.Kensaku_Dats[1].hikaku == "ika"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >=
							 DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] < DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] >= 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] < DATA.Kensaku_Dats[1].retu_dat});

				//◆DATA.Kensaku_Dats[0].hikaku == "ika"
				}else if(DATA.Kensaku_Dats[0].hikaku == "ika" && DATA.Kensaku_Dats[1].hikaku == "onazi"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] == DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "ika" && DATA.Kensaku_Dats[1].hikaku == "izyou"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] >= DATA.Kensaku_Dats[1].retu_dat});

				}else if(DATA.Kensaku_Dats[0].hikaku == "ika" && DATA.Kensaku_Dats[1].hikaku == "ika"){// = なら
					dummy = _(Total_output).filter(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat && 
							item.properties[DATA.Kensaku_Dats[1].retu_name] <  DATA.Kensaku_Dats[1].retu_dat});
					Edit_Non_output = _(Total_output).reject(function(item){return item.properties[DATA.Kensaku_Dats[0].retu_name] < 
							DATA.Kensaku_Dats[0].retu_dat &&
							item.properties[DATA.Kensaku_Dats[1].retu_name] <  DATA.Kensaku_Dats[1].retu_dat});
				}else{}

				if(dummy.length> 0){
					Edit_output = dummy;
					DATA.All_output_filter = Edit_output;//選択したレコードを返す

					DATA.kubun_Select_Info = '<button type="button" class="btn btn-light btn-sm">選択区分：'+
						'◆'+ DATA.Kensaku_Dats[0].retu_name +  'の、' + DATA.Kensaku_Dats[0].retu_dat + '</button><span class="kensu_size">' + 

						DATA.Kensaku_Dats[1].retu_name +  'の、' + DATA.Kensaku_Dats[1].retu_dat + 
						'</button><span class="kensu_size">' + 

						DATA.All_output_filter.length + '件</span>';

					setTimeout(function(){DATA.map.invalidateSize()}, 50);
					init_map02();
					first_map();
					//DATA.Kensaku_Dats = [];
					onkubun_fukusuu();

				}else{
					alert("選択データはないです。");
					//DATA.Kensaku_Dats = [];
					DATA.kubun_Select_Info = '';
					onkubun_fukusuu();
					return ;
				} 

			}//終了	ンpm


			//クリック位置の表示
			function map_panTo(){
				DATA.map.panTo([DATA.MyLat,DATA.MyLng]);
				DATA.MyLayer.setStyle({ 
					color: "#e6550d", //赤
					weight: 8,
					fillColor: "#ee82ee" //violet
				}); 
			}

			//閉じる
			function close_Touroku(){
				//あ、変更がなければ
				if(_.isEqual(DATA.Select_json_Single,DATA.Select_json_Single_Pre)){
					//alert("変更は無いです。");
				}else{
					//alert("修正があります。");
					let New_tuika_key = Date.parse(new Date().toString());
					DATA.Select_json_Single["更新日"] = getNum_TimestampYMD(New_tuika_key);
				}
				//クリックしたポイントの表示指定
				DATA.Layer01 = 'MAP';
				map_panTo();
			 }


//////<transitionでの変数
			function result_kensaku_retu_db(val){
					let kensaku_retu_db = [];
					obj = null;
					_.each(Total_output,function(item){
						kensaku_retu_db.push(item.properties[val]);
					});
					kensaku_retu_db = _.uniq(kensaku_retu_db);
					obj = _.map(kensaku_retu_db,function(item,index){
						return {"id":index,"name":item};});//
					return  obj;
		   	}

			function close_selectModal(){
					DATA.Modal_edit_flg = false;//詳細　選択モーダルの非表示
		    	}

			function onSelect_bunruiChanged(item){
				DATA.kubun_Select_Info = '';
				DATA.Retu_dat = item.name;//列データ

				obj = {"retu_name":"","retu_dat":"","type":"","hikaku":""};
				obj.retu_name = DATA.Retu_name;//列名
				obj.retu_dat = DATA.Retu_dat;//列名のデータ
				DATA.Hikaku_flg = "onazi";//
				obj.hikaku = DATA.Hikaku_flg;//"izyou"	"ika"	"onazi"の設定

				if(item){
					//値が数値なら
					if(_.isNumber(DATA.Retu_dat)){
					//値が文字列なら
					}else{
						//日付文字列から日付番号の表示
						if(_.isNumber(Date.parse(DATA.Retu_dat))){
						}else{}
					}
					DATA.Kensaku_Dats.push(obj);

					DATA.Modal_kubun_select_flg = false;

					// 単一検索の場合
					DATA.Fukusuu_Kensaku_flg = false;
					if (DATA.Fukusuu_Kensaku_flg==false) {
						select_map();//地図表示へ
					 // 複数検索の場合
					 } else {
						/*
						if(DATA.Kensaku_Dats.length == 2){//複数検索なら
							select_map_w();//複数検索の地図表示へ
						}else{
					          	alert("次の検索をして下さい。");
						}
						*/
					}

				}else{}
		    	}

			function onSelect_edit_01(item){
					DATA.Select_json_Single[DATA.Edit_Retu_name] = item.name;
					DATA.Modal_edit_flg = false;//値モーダルの非表示 先に非表示にする
		    	}

			function result_edit_db(val){
				let kensaku_retu_db = [];
				obj = null;
				_.each(Total_output,function(item){
					kensaku_retu_db.push(item.properties[val]);
				});
				kensaku_retu_db = _.uniq(kensaku_retu_db);
				obj = _.map(kensaku_retu_db,function(item,index){
					return {"id":index,"name":item};});//
				return  obj;
		       }

//////共通変数
			function s2ab(s){
				let buf = new ArrayBuffer(s.length);//arrayBufferバイナリデータをオクテットに変換
				let view = new Uint8Array(buf);//UInt8Arrayバイナリデータをオクテットに変換
				for (let m = 0; m != s.length; ++m) {
					view[m] = s.charCodeAt(m) & 0xFF;
				}
				return buf;
		}

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

		//写真入力へ
		function ph_in_map_Modal(){
			DATA.Modal_Photo_flg = true;
		}

		function attachImg(e){
			DATA.Pre_Ph_Retu = {
				"name":"?",
				"phpath":"?",	// window.URL.createObjectURL(data.blob);	data.ResizedImg	多面処理に使う　オフラインの複数写真で
				"url":"?" 	//canvas.toDataURL(file.type)			base64の文字列データ  	有無の判断
			};

			const file = e.target.files[0];
 			DATA.Pre_Ph_Retu.name = file.name;

			let kakutyousi_s = ['jpeg', 'jpg'];
			let type = file.name.split('.');
			if(kakutyousi_s.indexOf(type[type.length - 1].toLowerCase()) == -1) {// 小文字にして確認
				alert("jpegファイルでありません。\n 「jpegファイル」を選んで下さい");
				return ;
			}

			//parseMetaDataを使うと dat.exif でExif情報も取れます
			loadImage.parseMetaData(file, (dat) => {
				const options = {//maxの値をもとにリサイズ
					maxHeight: 300,//  200 250  400
					maxWidth: 300,//   200 250  400
				        canvas: true
				};
			        displayImage(file,options);
			 });//終了loadImage.parseMetaData
		  }

		//ファイル形式を変換		dat.exifのtrue falseの共通処理	data_url -> blob object -> blob url
		function displayImage(file,options){
		      loadImage(
		        file,
		        async (canvas) => {
				//1.base64の文字列データに変換する必要があります。canvas.toDataURL()
			        let dat = canvas.toDataURL(file.type);

				//2. data_url形式をblob objectに変換	base64データをblobに変換
			        let blob = base64ToBlob(dat, file.type);

			        //3. objectのURLを生成
			        let url = window.URL.createObjectURL(blob);
				DATA.ResizedImg = url;
//DATA.ResizedImg = deepClone(url);
				//canvas.toDataURL(file.type)  base64の文字列データ
				DATA.Pre_Ph_Retu.url = dat;
//DATA.Pre_Ph_Retu.url = deepClone(dat);
				// window.URL.createObjectURL(DATA.blob);  DATA.ResizedImg  多面処理に使う オフラインの複数写真で
				DATA.Pre_Ph_Retu.phpath = DATA.ResizedImg;

				All_Blob.push(blob);
		        },
		        options
		      );
		 }

		function base64ToBlob(base64, fileType){
		      const bin = atob(base64.replace(/^.*,/, ''));
		      const buffer = new Uint8Array(bin.length);
		      for (let i = 0; i < bin.length; i++) {
		        buffer[i] = bin.charCodeAt(i);
		      }
		      return new Blob([buffer.buffer], {
		        type: fileType ? fileType : 'image/jpg'
		        //type: fileType ? fileType : 'image/png'
		      });
		    }

		//写真取込	⑦	
		function ph_in_map_kakutei(){ 
			if(DATA.Pre_Ph_Retu.name != "?") {
				//複数写真  
				if(DATA.Select_json_Single["photo"].length>0) {

					DATA.Select_json_Single["photo"].unshift(DATA.Pre_Ph_Retu);//先頭に追加
					DATA.Modal_Photo_flg = false;
		 			DATA.ResizedImg = null;
				//初回
				}else{
					DATA.Select_json_Single["photo"] = [];
					DATA.Select_json_Single["photo"].push(DATA.Pre_Ph_Retu);
		 			DATA.ResizedImg = null;
					DATA.Modal_Photo_flg = false;
				}
			}else{
					DATA.Modal_Photo_flg = false;
		 			DATA.ResizedImg = null;
			}
		}

		function close_Modal_Photo_flg(){
			if(DATA.ResizedImg != null){
				DATA.ResizedImg = null;
			}
			DATA.Modal_Photo_flg = false;
		    }

		function ph_sakuzyo(idx){
			DATA.Select_json_Single['photo'].splice(idx,1) ;
			All_Blob.splice(idx,1) ;
		    }

		function marker_change(){
			DATA.ChngeColor_flg = !DATA.ChngeColor_flg;
			init_map02();
			first_map();
			alert('マーカー色を変更しました。');
		}

		function tukaikata(){
			window.open('tukaikata.html', '_blank');
		}
		
		function toiawase() {
		          window.open("https://formwone.netlify.app/index.html","_blank");
		 }

	  onMounted(function() {
				// モバイルの判断
				DATA.Mobile_flg = isMobile();
				if(DATA.Mobile_flg){
						fontSize.size = '100%';
						fontSize.menu = '80%';
						imgSize.width = 20;
						imgSize.height = 20;
				}

				let dummy = localStorage.getItem('my_map_db');
				if(dummy !== null){
					DATA.All_output_filter = JSON.parse(dummy);
					//gisフォーマットになっている
					Total_output = deepClone(DATA.All_output_filter);
			
					let Gtytle_record = _(DATA.All_output_filter).first();//
					let key_retus = _(Gtytle_record.properties).keys();//

					//マスター用のデータ取得
					DATA.Excel_Out_Retu = deepClone(key_retus);
			
					DATA.Touroku_Names = deepClone(DATA.Excel_Out_Retu);
					DATA.Touroku_Names_Html = _(DATA.Touroku_Names).difference(["photo","一覧表示","位置メモ"]);//以外を返す;
			
					DATA.Kensaku_Kubun_Names = deepClone(DATA.Excel_Out_Retu);
					DATA.Kensaku_Kubun_Set_Names  = _(DATA.Kensaku_Kubun_Names).difference(["photo","一覧表示","位置メモ"]);//検索用"
			
					//◆　数値列を配列にする
					DATA.SutiRetus = [];
					_.each(key_retus,function(x,index){
						//数値なら
						if(_.isNumber(Gtytle_record.properties[x])){
						DATA.SutiRetus.push(x);
						} 
					});
			
					torikomi_start(); //photo項目値の	配列への変換
				}else{
					alert('データはありません。\n 住所の入ったExcelシートを、枠内にドラッグして下さい。');
					return
				}

			})

</script>

					            





	


 
