var _ua = (function(){
	return {
		Touch:typeof document.ontouchstart != "undefined",
		Pointer:window.navigator.pointerEnabled,
		MSPoniter:window.navigator.msPointerEnabled
	}
})();


var Puzzles = [];
var CurrentPuzzle = null;
var Studied = [];
var Stage;
var Score = 0;
var collection_name = "puzzle2";
var Stage_name = "Stage1";
var Studied_name = "Studied1";
var Score_name = "SCORE1";
var Wizards = [];
var margin_left = 0;
var margin_right = 0;
function MakeWizard()
{
	for (var i = 1; i <= 13; i++) {
		var obj = {};
		obj.src = "images/step" + i + ".png";
		obj.buttons = [];
		if (i == 13) {
			button = {};
			button.left = 298;
			button.top = 532;
			button.right = 384;
			button.bottom = 570;
			button.kind = 1;
			obj.buttons.push(button);
		}
		else {
			for (var j = 0; j < 2; j++) {
				var button = {};
				if (j == 0) {
					button.left = 298;
					button.top = 532;
					button.right = 384;
					button.bottom = 570;
					button.kind = 0;
				}
				else if (j == 1) {
					button.left = 353;
					button.top = 12;
					button.right = 390;
					button.bottom = 55;
					button.kind = 1;
				}
				obj.buttons.push(button);
			}
		}
		Wizards.push(obj);
	}
}
var wizard_index;
function ShowWizard(start_index)
{
	if (!start_index)
		start_index = 0;
	wizard_index = start_index;
	if (Wizards.length == 0)
		MakeWizard();
	$("#wizard_pic").attr("src", Wizards[wizard_index].src);
	$("#help_wizard").show();
//	var height = $("#wizard_pic").height();
//	$("#wizard_pic").parent().height(height);
}

function LoadPuzzle()
{
	Puzzles = [];
	CurrentPuzzle = null;
	let filename = "data/stage" + Stage + ".json";
	console.log(filename);
	(async() => {
		const a = await fetch(filename);
		console.log("a=",a);
		Puzzles = await a.json();
		console.log("Puzzles=", Puzzles);
		console.log("Check");
		if (Puzzles.length == 0) {
			// 全部やりきった場合は最初に戻る
			ons.notification.confirm({
				title: '全問クリアしました',
				messageHTML: 'ステージを選択してください',
				buttonLabels: ['小学生', '中学生'],
				animation: 'default',
				cancelable: false,
				callback: function(index) {
					if(index == 0) {
						Stage = 1;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
					else if (index == 1) {
						Stage = 16;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
				}
			});
			return;
		}
		if (Puzzles.length > 0) {
			for (var i = 0; i < Puzzles.length; i++) {
				var id = Puzzles[i].id;
				var index = Studied.findIndex(item => item === id);
				if (index == -1) {
					CurrentPuzzle = Puzzles[i];
					break;
				}
			}
			if (!CurrentPuzzle) {
				if (Stage == 15) {
					ons.notification.confirm({
						title: '小学生問題を全てクリアしました',
						messageHTML: 'ステージを選択してください',
						buttonLabels: ['小学生', '中学生'],
						animation: 'default',
						cancelable: false,
						callback: function(index) {
							if(index == 0) {
								Stage = 1;
								localStorage.setItem(Stage_name, Stage);
								Studied = [];
								localStorage.setItem(Studied_name, JSON.stringify(Studied));
								LoadPuzzle();
							}
							else if (index == 1) {
								Stage = 16;
								localStorage.setItem(Stage_name, Stage);
								Studied = [];
								localStorage.setItem(Studied_name, JSON.stringify(Studied));
								LoadPuzzle();
							}
						}
					});
				}
				else {
					ons.notification.confirm({
						title: 'ステージクリア',
						messageHTML: '次のステージを選択してください',
						buttonLabels: ['前のステージ', '同じステージ', '次のステージ'],
						animation: 'default',
						cancelable: false,
						callback: function(index) {
							if(index == 0) {
								if (Stage > 1)
									Stage--;
								localStorage.setItem(Stage_name, Stage);
								Studied = [];
								localStorage.setItem(Studied_name, JSON.stringify(Studied));
								LoadPuzzle();
							}
							else if (index == 1) {
								Studied = [];
								localStorage.setItem(Studied_name, JSON.stringify(Studied));
								LoadPuzzle();
							}
							else if (index == 2) {
								Stage++;
								localStorage.setItem(Stage_name, Stage);
								Studied = [];
								localStorage.setItem(Studied_name, JSON.stringify(Studied));
								LoadPuzzle();
							}
						}
					});
				}
				return;
			}
			CalcArea();
			ParsePuzzle();
			DrawPuzzle();
			AddScore(0);
			DrawStage();
			$("#hint_desc").text("");
			$("#palette_desc").empty();
			AutoSelect();
		}
	})();

}


function NextPuzzle()
{
	var current_id = CurrentPuzzle.id;
	CurrentPuzzle = null;
	for (var i = 0; i < Puzzles.length; i++) {	
		var id = Puzzles[i].id;
		var index = Studied.findIndex(item => item === id);
		if (index == -1) {
			CurrentPuzzle = Puzzles[i];
			break;
		}
	}
	if (!CurrentPuzzle) {
		if (Stage == 15) {
			ons.notification.confirm({
				title: '小学生問題を全てクリアしました',
				messageHTML: 'ステージを選択してください',
				buttonLabels: ['小学生', '中学生'],
				animation: 'default',
				cancelable: false,
				callback: function(index) {
					if(index == 0) {
						Stage = 1;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
					else if (index == 1) {
						Stage = 16;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
				}
			});
		}
		else {
			ons.notification.confirm({
				title: 'ステージクリア',
				messageHTML: '次のステージを選択してください',
				buttonLabels: ['前のステージ', '現在のステージ', '次のステージ'],
				animation: 'default',
				cancelable: false,
				callback: function(index) {
					if(index == 0) {
						if (Stage > 1)
							Stage--;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
					else if (index == 1) {
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
					else if (index == 2) {
						Stage++;
						localStorage.setItem(Stage_name, Stage);
						Studied = [];
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						LoadPuzzle();
					}
				}
			});
		}
		return;
	}
	CalcArea();
	ParsePuzzle();
	DrawPuzzle();
	AddScore(0);
	DrawStage();
	$("#hint_desc").text("");
	$("#palette_desc").empty();
	AutoSelect();
}


$(window).on("orientationchange", function(e) {
	CalcArea();
	ParsePuzzle();
	DrawPuzzle();
	AddScore(0);
	DrawStage();
});

var cell_size;
var puzzle_margin_top = 8;
var puzzle_margin_left = 8;
var puzzle_margin_bottom = 8;
var puzzle_margin_right = 8;
var outer_size = 5;
var outerRect;
var canvas_width;
var canvas_height;
var button_size;

function CalcArea()
{
	console.log("CalcArea");
	// 仮の値
	puzzle_margin_top = 8;
	puzzle_margin_left = 8;
	puzzle_margin_bottom = 8;
	puzzle_margin_right = 8;

	var width = window.innerWidth;;
	var height = window.innerHeight;
	// 上半分をinfoとパズル, 下半分をヒントと文字パレットに割り当てる
	var half_height = height / 2;
	console.log("half_height=", half_height);
	// 大まかなマスの大きさを決める
	cell_size = Math.floor((half_height - puzzle_margin_top * 2 - outer_size * 2) / CurrentPuzzle.row_count);
	let margin = Math.floor((width - cell_size * CurrentPuzzle.column_count - outer_size * 2) / 2);
	margin_left = margin - puzzle_margin_left;
	margin_right = margin - puzzle_margin_right;
	if (margin_left < 0) {
		// cellサイズが大きすぎる。計算しなおし
		cell_size = Math.floor((width - puzzle_margin_left - puzzle_margin_right - outer_size * 2) / CurrentPuzzle.column_count);
		margin_left = 0;
		margin_right = 0;
	}
	console.log("cell_size=", cell_size);
	console.log("margin-left", margin_left);
	console.log("margin_right", margin_right);
	$("#wrapper").css("margin-left", margin_left + "px");
	$("#wrapper").css("margin-right", margin_right + "px");
	width = width - margin_left - margin_right;
	var info_height = $("#info").height();
	var hint_height = 64;
	button_size = 50;
	var palette_width = button_size * 5 + 4 * 11;
//	if (palette_width > window.innerWidth - 50) {
		button_size = (width - 50 - 4 * 11) / 5;
//	}
	var palette_height = button_size * 2 + 4 * 3;

	var puzzle_height = cell_size * CurrentPuzzle.row_count + puzzle_margin_top + puzzle_margin_bottom + outer_size * 2;
	console.log("button_size=", button_size);
	console.log("palette_height", palette_height);
	console.log("puzzle_height", puzzle_height);
	if (puzzle_height + hint_height + info_height + palette_height > height) {
		// だいたい横向きの場合が多い
		var h = height - (hint_height + info_height +  palette_height);
		cell_size = Math.floor((h - puzzle_margin_top * 2 - outer_size * 2) / CurrentPuzzle.row_count);
		puzzle_height = cell_size * CurrentPuzzle.row_count + puzzle_margin_top * 2 + outer_size * 2;
		puzzle_margin_left = Math.floor((width - cell_size * CurrentPuzzle.column_count - outer_size * 2) / 2);
		puzzle_margin_right = puzzle_margin_left;
		puzzle_margin_top = 8;
		puzzle_margin_bottom = 8;
	}

	hint_height = height - puzzle_height - info_height - palette_height;
	console.log("hint_height=", hint_height);

	// CSSを設定する
	$("#disp_puzzle").height(puzzle_height);
	$("#hint_area").height(hint_height);
	$("#char_palette").height(palette_height);
	console.log("width=", width)
	// canvasを設定する
	var canvas = document.getElementById("canvas_puzzle");
	canvas.width = width;
	canvas.height = puzzle_height;
	canvas.style.width = width + "px";
	canvas.style.height = puzzle_height + "px";
	// 覚えておく
	canvas_width = width;
	canvas_height = puzzle_height;
}

var PuzzleCells;
var Chunks;
var OuterRect = {};

function IsHintH(str)
{
	for (var i = 0; i < CurrentPuzzle.hints.h.length; i++) {
		if (CurrentPuzzle.hints.h[i][1] == str)
			return true;
	}
	return false;
}
function IsHintV(str)
{
	for (var i = 0; i < CurrentPuzzle.hints.v.length; i++) {
		if (CurrentPuzzle.hints.v[i][1] == str)
			return true;
	}
	return false;
}


function ParsePuzzle()
{
	PuzzleCells = [];
	var offset_x = puzzle_margin_left + outer_size;
	var offset_y = puzzle_margin_top + outer_size;
	OuterRect.left = puzzle_margin_left + outer_size / 2;
	OuterRect.top = puzzle_margin_top + outer_size / 2;
	OuterRect.right = offset_x + cell_size * CurrentPuzzle.column_count + outer_size / 2;
	OuterRect.bottom = offset_y + cell_size * CurrentPuzzle.row_count + outer_size / 2;

	for (var y = 0; y < CurrentPuzzle.row_count; y++) {
		var str = CurrentPuzzle.cell_data[y];
		var Row = [];
		for (var x = 0; x < CurrentPuzzle.column_count; x++) {
			var cell = {};
			cell.chr = str.substr(x, 1);
			if (cell.chr == "■")
				cell.chr = "";
			cell.input = "";
			cell.marked = 0;
			cell.x = offset_x + x * cell_size;
			cell.y = offset_y + y * cell_size;
			Row.push(cell);
		}
		PuzzleCells.push(Row);
	}
	Chunks = [];
	var num = 1;
	for (var y = 0; y < CurrentPuzzle.row_count; y++) {
		var str = "";
		var start_x = -1;
		for (var x = 0; x < CurrentPuzzle.column_count; x++) {
			if (PuzzleCells[y][x].chr != "") {
				str += PuzzleCells[y][x].chr;
				if (start_x == -1)
					start_x = x;
			}
			else {
				if (str.length >= 2 && IsHintH(str)) {
					var chunk = {};
					chunk.str = str;
					chunk.x = start_x;
					chunk.y = y;
					chunk.dir = 0;
					chunk.speak = 0;
					if (PuzzleCells[y][start_x].marked == 0) {
						PuzzleCells[y][start_x].marked = num;
						chunk.num = num++;
					}
					else
						chunk.num = PuzzleCells[y][start_x].marked;
					Chunks.push(chunk);
				}
				start_x = -1;
				str = "";
			}
		}
		if (str.length >= 2 && IsHintH(str)) {
			var chunk = {};
			chunk.str = str;
			chunk.x = start_x;
			chunk.y = y;
			chunk.dir = 0;
			chunk.speak = 0;
			if (PuzzleCells[y][start_x].marked == 0) {
				PuzzleCells[y][start_x].marked = num;
				chunk.num = num++;
			}
			else
				chunk.num = PuzzleCells[y][start_x].marked;
			Chunks.push(chunk);
		}
	}
	for (var x = 0; x < CurrentPuzzle.column_count; x++) {
		var str = "";
		var start_y = -1;
		for (var y = 0; y < CurrentPuzzle.row_count; y++) {
			if (PuzzleCells[y][x].chr != "") {
				str += PuzzleCells[y][x].chr;
				if (start_y == -1)
					start_y = y;
			}
			else {
				if (str.length >= 2 && IsHintV(str)) {
					var chunk = {};
					chunk.str = str;
					chunk.x = x;
					chunk.y = start_y;
					chunk.dir = 1;
					chunk.speak = 0;
					if (PuzzleCells[start_y][x].marked == 0) {
						PuzzleCells[start_y][x].marked = num;
						chunk.num = num++;
					}
					else
						chunk.num = PuzzleCells[start_y][x].marked;
					Chunks.push(chunk);
				}
				start_y = -1;
				str = "";
			}
		}
		if (str.length >= 2 && IsHintV(str)) {
			var chunk = {};
			chunk.str = str;
			chunk.x = x;
			chunk.y = start_y;
			chunk.dir = 1;
			chunk.speak = 0;
			if (PuzzleCells[start_y][x].marked == 0) {
				PuzzleCells[start_y][x].marked = num;
				chunk.num = num++;
			}
			else
				chunk.num = PuzzleCells[start_y][x].marked;
			Chunks.push(chunk);
		}
	}
	Selected.chunk = null;
	Selected.index = -1;
}

function DrawPuzzle()
{
	var canvas = document.getElementById("canvas_puzzle");
	var ctx = canvas.getContext('2d');
	ctx.scale(1.0, 1.0);
	ctx.clearRect(0, 0, canvas_width, canvas_height);

	ctx.strokeStyle = "black";
	ctx.lineWidth = outer_size;
	ctx.beginPath();
	ctx.rect(OuterRect.left, OuterRect.top, OuterRect.right - OuterRect.left, OuterRect.bottom - OuterRect.top);
	ctx.closePath();
	ctx.stroke();

	ctx.lineWidth = 1;
	ctx.textBaseline = "top";
	ctx.strokeStyle = "black";
	var offset = cell_size * 0.2;
	var offset2 = cell_size * 0.1;

	for (var y = 0; y < CurrentPuzzle.row_count; y++) {
		for (var x = 0; x < CurrentPuzzle.column_count; x++) {
			var cell = PuzzleCells[y][x];
			if (cell.chr != "") {
				ctx.font = Math.floor(cell_size * 0.8 / 1.33) + "px Arial Bold";
				ctx.beginPath();
				ctx.rect(cell.x, cell.y, cell_size, cell_size);
				ctx.stroke();
				ctx.fillText(cell.input, cell.x + offset, cell.y + offset);
				if (cell.marked) {
					ctx.font = Math.floor(cell_size * 0.2 / 1.33) + "px Arial Bold";
					ctx.fillText(cell.marked, cell.x + offset2, cell.y + offset2);
				}
				ctx.closePath();
			}
			else {
				ctx.fillRect(cell.x, cell.y, cell_size, cell_size);
			}
		}
	}
}

function AddScore(score)
{
	Score += score;
	var score_string = ("          " + Score).substr(-10);
	score_string = score_string.replace(/ /g, "&nbsp;")
	$("#score .info_value").html(score_string);
}

function DrawStage()
{
	$("#stage .info_value").html(Stage);
}

function StartGame()
{
	ons.notification.confirm({
		title: '開始レベルの選択',
		messageHTML: 'レベルを選択してください',
		buttonLabels: ['小学生', '中学生'],
		animation: 'default',
		cancelable: false,
		callback: function(index) {
			if(index == 0) {
				Stage = 1;
				localStorage.setItem(Stage_name, Stage);
				LoadPuzzle();
			}
			else if (index == 1) {
				Stage = 16;
				localStorage.setItem(Stage_name, Stage);
				LoadPuzzle();
			}
		}
	});
}

var Selected = {};
var recognition = null;

$(function()
{
	Studied = JSON.parse(localStorage.getItem(Studied_name));		// 既に学習し終えたパズルのIDの配列
	if (Studied == null)
		Studied = [];
	Stage = localStorage.getItem(Stage_name);
	if (!Stage) 
		Stage = 1;
	LoadPuzzle();
	Selected.chunk = null;
	Selected.index = -1;
	Score = parseInt(localStorage.getItem(Score_name));
	if (!Score) {
		Score = 0;
		localStorage.setItem(Score_name, Score);
	}

	var _start = _ua.Pointer ? 'pointerdown' : _ua.MSPointer ? 'MSPointerDown' : _ua.Touch ? 'touchstart' : 'mousedown';
	var _move  = _ua.Pointer ? 'pointermove' : _ua.MSPointer ? 'MSPointerMove' : _ua.Touch ? 'touchmove'  : 'mousemove';
	var _end   = _ua.Pointer ? 'pointerup'   : _ua.MSPointer ? 'MSPointerUp'   : _ua.Touch ? 'touchend'   : 'mouseup';
	var _target = $('#canvas_puzzle');
	_target.on(_start, function(e){
		var point  = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
		var startX = point.pageX;
		var startY = point.pageY;

		$(document).on(_end, function(e){
			if (e.target.id == "canvas_puzzle") {
				point	= e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
				Touch(point.pageX - 8 - margin_left, point.pageY - 50 - 8);
				if (TouchChunk.length > 0) {
					if (Selected.chunk != null) {
						DrawChunk(Selected.chunk, false, false);
					}
					if (TouchChunk.length == 1) {
						DrawChunk(TouchChunk[0], false, true);
						Selected.chunk = TouchChunk[0];
						DrawHint();
						CreateButtonPalette();
						DrawFocus();
					}
					else {
						if (Selected.chunk == TouchChunk[0]) {
							DrawChunk(TouchChunk[1], false, true);
							Selected.chunk = TouchChunk[1];
							DrawHint();
							CreateButtonPalette();
							DrawFocus();
						}
						else if (Selected.chunk == TouchChunk[1]) {
							DrawChunk(TouchChunk[0], false, true);
							Selected.chunk = TouchChunk[0];
							DrawHint();
							CreateButtonPalette();
							DrawFocus();
						}
						else {
							var index = Math.floor(Math.random() * TouchChunk.length);
							DrawChunk(TouchChunk[index], false, true);
							Selected.chunk = TouchChunk[index];
							DrawHint();
							CreateButtonPalette();
							DrawFocus();
						}
					}
				}
			}
			$(document).off(_end);
		});
		// Windowsでは，mouseupの代わりにdragendイベントになることがある
		$(document).on("dragend", function(e) {
			$(document).trigger("mouseup", e);
		});
	});

	$("#wizard_pic").on("click", function(ev) {
		var x = ev.originalEvent.clientX;
		var y = ev.originalEvent.clientY;
		var image_pos = $("#wizard_pic").offset();
		var image_width = $("#wizard_pic").width();
		var image_height = $("#wizard_pic").height();
		var x1 = (x - image_pos.left) / image_width * 400;
		var y1 = (y - image_pos.top) / image_height * 600;
		console.log("click=" + x1 + "," + y1);
		for (var i = 0; i < Wizards[wizard_index].buttons.length; i++) {
			var button = Wizards[wizard_index].buttons[i];
			if (button.left <= x1 && x1 <= button.right && button.top <= y1 && y1 <= button.bottom) {
				if (button.kind == 0) {
					ShowWizard(++wizard_index);
				}
				else if (button.kind == 1) {
					$("#help_wizard").hide();
					if (!Stage)
						StartGame();
				}
			}
		}
	});

	if (window.webkitSpeechRecognition) {
		recognition = new webkitSpeechRecognition();
		SetupRecognition()
	}

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js');
	}
});

function AutoSelect()
{
	for (var i = 0; i < Chunks.length; i++) {
		var chunk = Chunks[i];
		var solved = true;
		var x = chunk.x;
		var y = chunk.y;
		for (var j = 0; j < chunk.str.length; j++) {
			if (chunk.str[j] == PuzzleCells[y][x].input) {
				if (chunk.dir == 1)
					y += 1;
				else
					x += 1;
			}
			else {
				solved = false;
				break;
			}
		}
		if (!solved) {
			if (Selected.chunk != null) {
				DrawChunk(Selected.chunk, false, false);
			}
			Selected.chunk = chunk;
			Selected.index = 0;
			DrawChunk(Selected.chunk, false, true);
			DrawHint();
			CreateButtonPalette();
			DrawFocus();
			return;
		}
	}
}

var TouchChunk = [];

function Touch(x, y)
{
	TouchChunk = [];

	// Touchしたセルを特定する
	var touch_i = -1;
	var touch_j = -1;
	for (var j = 0; j < PuzzleCells.length; j++) {
		for (var i = 0; i < PuzzleCells[j].length; i++) {
			var cell = PuzzleCells[j][i];
			if (cell.x <= x && x < cell.x + cell_size && cell.y <= y && y < cell.y + cell_size) {
				touch_i = i;
				touch_j = j;
			}
		}
	}
	if (touch_i == -1)
		return;
	for (var i = 0; i < Chunks.length; i++) {
		var chunk = Chunks[i];
		if (chunk.x == touch_i && chunk.y == touch_j) {
			TouchChunk.push(chunk);
			Selected.index = 0;
		}
	}
	if (TouchChunk.length == 0) {
		for (var i = 0; i < Chunks.length; i++) {
			var chunk = Chunks[i];
			if (chunk.dir == 1) {	// 縦
				if (chunk.x != touch_i)	// 違う列
					continue
				if (chunk.y <= touch_j && touch_j < chunk.y + chunk.str.length) {
					TouchChunk.push(chunk);
					Selected.index = touch_j - chunk.y;;
				}
			}
			else {					// 横
				if (chunk.y != touch_j)	// 違う行
					continue;
				if (chunk.x <= touch_i && touch_i < chunk.x + chunk.str.length) {
					TouchChunk.push(chunk);
					Selected.index = touch_i - chunk.x;
				}
			}
		}
	}
}



function DrawChunk(chunk, answer, hilight)
{
	DrawPuzzle();
	var x = chunk.x;
	var y = chunk.y;
	var canvas = document.getElementById("canvas_puzzle");
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 1;
	ctx.font = Math.floor(cell_size * 0.8 / 1.33) + "px Arial Bold";
	ctx.textBaseline = "top";
	ctx.strokeStyle = "black";
	var offset = cell_size * 0.2;
	var offset2 = cell_size * 0.1;

	var pos_x = PuzzleCells[y][x].x;
	var pos_y = PuzzleCells[y][x].y;

	for (var i = 0; i < chunk.str.length; i++) {
		ctx.fillStyle = hilight ? "lemonchiffon" : "white";
		ctx.fillRect(pos_x, pos_y, cell_size, cell_size);
		ctx.beginPath();
		ctx.rect(pos_x, pos_y, cell_size, cell_size);
		ctx.stroke();

		ctx.stroke();
		ctx.fillStyle = "black";
		var cell;
		if (chunk.dir == 1)
			cell = PuzzleCells[y + i][x];
		else
			cell = PuzzleCells[y][x + i];

		ctx.font = Math.floor(cell_size * 0.8 / 1.33) + "px Arial Bold";
		if (answer) {
			ctx.fillText(chunk.str.substr(i, 1), pos_x + offset, pos_y + offset);
		}
		else {
			ctx.fillText(cell.input, pos_x + offset, pos_y + offset);

		}
		if (cell.marked) {
			ctx.font = Math.floor(cell_size * 0.2 / 1.33) + "px Arial Bold";
			ctx.fillText(cell.marked, cell.x + offset2, cell.y + offset2);
		}

		if (chunk.dir == 1)
			pos_y += cell_size;
		else
			pos_x += cell_size;
	}
}

function DrawFocus()
{
	if (Selected.index == -1)
		return;
	var i = Selected.chunk.x;
	var j = Selected.chunk.y;
	if (Selected.chunk.dir == 1)
		j += Selected.index;
	else
		i += Selected.index;
	var pos_x = PuzzleCells[j][i].x;
	var pos_y = PuzzleCells[j][i].y;
	// (pos_x, pos_y)から始まるセルにフォーカスを描画
	var canvas = document.getElementById("canvas_puzzle");
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 1;
	ctx.strokeStyle = "red";
	var offset = cell_size * 0.1;
	var line = cell_size * 0.3;

	var p1 = {x: pos_x + offset, y: pos_y + offset};
	var p2 = {x: pos_x + cell_size - offset, y: pos_y + offset};
	var p3 = {x: pos_x + offset, y: pos_y + cell_size - offset};
	var p4 = {x: pos_x + cell_size - offset, y: pos_y + cell_size - offset};

	ctx.beginPath();
	ctx.moveTo(p1.x + line, p1.y);
	ctx.lineTo(p1.x, p1.y);
	ctx.lineTo(p1.x, p1.y + line);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(p2.x - line, p2.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.lineTo(p2.x, p2.y + line);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(p3.x, p3.y - line);
	ctx.lineTo(p3.x, p3.y);
	ctx.lineTo(p3.x + line, p3.y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(p4.x - line, p4.y);
	ctx.lineTo(p4.x, p4.y);
	ctx.lineTo(p4.x, p4.y - line);
	ctx.stroke();
}

var SpeakCount = 0;

function DrawHint()
{
	var ans = Selected.chunk.str;
	var hint = "";
	if (Selected.chunk.dir == 1) {
		for (var i = 0; i < CurrentPuzzle.hints.v.length; i++) {
			if (CurrentPuzzle.hints.v[i][1] == ans) {
				hint = CurrentPuzzle.hints.v[i][2];
				break;
			}
		}
	}
	else {
		for (var i = 0; i < CurrentPuzzle.hints.h.length; i++) {
			if (CurrentPuzzle.hints.h[i][1] == ans) {
				hint = CurrentPuzzle.hints.h[i][2];
				break;
			}
		}
	}
	var size = 40;
	var width = $("#hint_desc").width();
	var nchar = Math.floor(width / size);
	var nline = Math.ceil((hint.length + 2) / nchar);		// +2は禁則処理用
	if (nline > 2) {
		nchar = Math.ceil((hint.length + 2) / 2) ;
		size = width / nchar;
	}
	$("#hint_desc").text(hint).css("font-size", size + "px");

	SpeakCount = 0;
}

function AddButton(chr)
{
	$("#palette_desc").append("<button class='btn'>" + chr + "</button>");
}

var array = [];

function IsExist(char)
{
	for (var i = 0; i < array.length; i++) {
		if (array[i] == char)
			return true;
	}
	return false;
}

var Chars = ["Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ"];
function MakeArray()
{
	array = Selected.chunk.str.split('');
	if (SpeakCount < 3) {
		// 重複を除く
		for (var i = 0; i < array.length; i++) {
			var char = array[i];
			for (var j = i + 1; j < array.length; j++) {
				if (array[j] == char) {
					array.splice(j, 1);
				}
			}
		}
		while (array.length < 10) {
			var index = Math.floor(Math.random() * Chars.length);
			var char = Chars[index];
			if (!IsExist(char)) {
				array.push(char);
			}
		}
	}
	if (SpeakCount < 5) {
		array.sort(function(a, b){
			if( a < b ) return -1;
			if( a > b ) return 1;
			return 0;
		});
	}
}

function ClearButtonPalette()
{
	$(".btn").off("click");
	$("#palette_desc").empty();
}

function CreateButtonPalette()
{
	ClearButtonPalette();
	MakeArray();

	for (var i = 0; i < array.length; i++) {
		AddButton(array[i]);
	}
//	$(".btn").width(button_size).height(button_size);1

	$(".btn").height(button_size - 16).width(button_size - 16);
	$(".btn").on("click touchend", function(ev) {
		EnterKey($(this).text());
		if (IsFinish()) {
			Studied.push(CurrentPuzzle.id);
			localStorage.setItem(Studied_name, JSON.stringify(Studied));
			AddScore(200);
			localStorage.setItem(Score_name, Score);
			DispClear(NextPuzzle);
			$("#clear_pazzle").get(0).play();
		}
		return false;
	});

}

function IsSolved()
{
	var x = Selected.chunk.x;
	var y = Selected.chunk.y;
	var solved = true;
	for (var j = 0; j < Selected.chunk.str.length; j++) {
		if (Selected.chunk.str[j] == PuzzleCells[y][x].input) {
			if (Selected.chunk.dir == 1)
				y += 1;
			else
				x += 1;
		}
		else {
			solved = false;
			break;
		}
	}
	return solved;
}

function EnterKey(chr)
{
	var x = Selected.chunk.x;
	var y = Selected.chunk.y;
	if (Selected.chunk.dir == 1) {
		y += Selected.index;
	}
	else {
		x += Selected.index;
	}
	var orgScore = CalcScore();

	PuzzleCells[y][x].input = chr;
	DrawChunk(Selected.chunk, false, true);
	if (IsSolved()) {
		if (!IsFinish())
			$("#correct").get(0).play();
		Selected.chunk.speak = 0;
		var newScore = CalcScore();
		AddScore(newScore - orgScore);
		AutoSelect();
	}
	else {
		var newScore = CalcScore();
		if (orgScore != newScore)
			AddScore(newScore - orgScore);
		// フォーカスの移動
		if (Selected.index < Selected.chunk.str.length - 1)
			Selected.index++;
		DrawFocus();
	}
}

function IsFinish()
{
	// 全部埋まったか
	for (var j = 0; j < PuzzleCells.length; j++) {
		for (var i = 0; i < PuzzleCells[j].length; i++) {
			if (PuzzleCells[j][i].chr != PuzzleCells[j][i].input)
				return false;
		}
	}
	return true;
}

function DispClear(callback)
{
	var width = $("#canvas_puzzle").width();
	var height = $("#canvas_puzzle").height();
	$("#message").width(width).height(height).css("display", "flex").text("CLEAR!!");
	$("#message").on("transitionend", function() {
		$("#message").css("display", "none").removeClass("active");
	});
	setTimeout(function() {
		$("#message").addClass("active");
		if (callback)
			callback();
	}, 500)
}

function CalcScore()
{
	var score = 0;
	for (var i = 0; i < Chunks.length; i++) {
		var chunk = Chunks[i];
		var x = chunk.x;
		var y = chunk.y;
		var solved = true;
		for (var j = 0; j < chunk.str.length; j++) {
			if (chunk.str[j] == PuzzleCells[y][x].input) {
				if (chunk.dir == 1)
					y += 1;
				else
					x += 1;
			}
			else {
				solved = false;
				break;
			}
		}
		if (solved) {
			score += chunk.speak ? 100 : 10;
		}
	}
	return score;
}

function Speech(text, hint_flag, callback)
{
	speechSynthesis.cancel();
	function _wait() {
		if (!window.speechSynthesis.speaking) {
			SpeechSub(text, hint_flag, callback);
			return;
		}
		 setTimeout(_wait, 200);
	}
	_wait();
}

var MyScore = {id:null, total:0, VoicePitch:1.0, VoiceSpeed:1.0};

function SpeechSub(text, hint_flag, callback)
{
	var uttr = new SpeechSynthesisUtterance();
	uttr.text = text;
	uttr.lang = 'en-US';
	uttr.pitch = MyScore.VoicePitch;
/*	if (!hint_flag) // ヒントの時のみtrue
		hint_count = 0;
	if (hint_count < 2)
		uttr.rate = MyScore.VoiceSpeed;
	else if (hint_count < 3)
		uttr.rate = MyScore.VoiceSpeed * 0.8;
	else if (hint_count < 4)
		uttr.rate = MyScore.VoiceSpeed * 0.6;
	else if (hint_count < 5)
		uttr.rate = MyScore.VoiceSpeed * 0.4;
	else if (hint_count < 6)
		uttr.rate = MyScore.VoiceSpeed * 0.2;
	else
		uttr.rate = MyScore.VoiceSpeed * 0.1;*/
	speechSynthesis.speak(uttr);
	if (!callback)
		return;
	function _wait() {
		if (!window.speechSynthesis.speaking) {
			callback();
			return;
		}
		setTimeout(_wait, 200);
	}
	_wait();
}

function SpeakHint()
{
	if (!Selected.chunk) {
		Speech("Please select any cell.", false);
		return;
	}
	if (recognizing) {
		rec_result = -1;
		recognition.stop();
	}
	var ans = Selected.chunk.str;
	ans = ans.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
	    return String.fromCharCode(s.charCodeAt(0) - 65248);
	});
	Speech(ans, true);
	SpeakCount++;
	if (SpeakCount == 3 || SpeakCount == 5)
		CreateButtonPalette();
}

function IsRight(array)
{
	if (array.length != Selected.chunk.str.length)
		return false;
	var right = true;
	for (var j = 0; j < Selected.chunk.str.length; j++) {
		if (Selected.chunk.str[j] != array[j]) {
			right = false;
			break;
		}
	}
	return right;
}

function GetPraise()
{
	var praise = ["Great!", "Excellent!", "Fantastic!", "Awesome!", "Good job!", "Good for you!", "Amazing!", "Perfect!", "Incredible!", "Superb!", "Way to go!", "I’m proud of you."];
	var index = Math.floor(Math.random() * praise.length);
	return praise[index];
}

function GetMistake()
{
	var failed = ["It's a mistake.", "It's wrong.", "That's wrong.", "Incorrect"];
	var index = Math.floor(Math.random() * failed.length);
	return failed[index];
}

function SpeechSub(text)
{
	var uttr = new SpeechSynthesisUtterance();
	uttr.text = text;
	uttr.lang = 'en-US';
	speechSynthesis.speak(uttr);
}

function Speech(text)
{
	speechSynthesis.cancel();
	function _wait() {
		if (!window.speechSynthesis.speaking) {
			SpeechSub(text);
			return;
		}
		setTimeout(_wait, 200);
	}
	_wait();
}

var rec_result = 0;
var recognizing = false;

function SetupRecognition()
{
	recognition.continuous = false;
	recognition.lang = "en-US";

	recognition.onresult = function (event) {
		console.log("onresult");
		if (event.resultIndex == 0) {
			for (var i = 0; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					var text= event.results[i][0].transcript;
					rec_result = 1;
					text = text.toUpperCase();
					text = text.replace(/[A-Za-z0-9]/g, function(s) {
					    return String.fromCharCode(s.charCodeAt(0) + 65248);
					});
					var array = text.split('');
					var orgScore = CalcScore();
					if (!IsRight(array)) {
						ons.notification.toast(text + "と聞こえました．", {timeout: 2000});
						rec_result = 2;
						return;
					}
					var text = GetPraise();
					Speech(text);

					Selected.index = 0;
					var x = Selected.chunk.x;
					var y = Selected.chunk.y;
					for (var i = 0; i < array.length; i++) {
						PuzzleCells[y][x].input = array[i];
						if (Selected.chunk.dir == 1) {
							y += 1;
						}
						else {
							x += 1;
						}
						DrawChunk(Selected.chunk, false, true);
					}
					var bClear = IsFinish();

					if (IsSolved()) {
						if (!bClear)
							$("#correct").get(0).play();	// 音が重なるのを防ぐ
						Selected.chunk.speak = 1;
						var newScore = CalcScore();
						AddScore(newScore - orgScore);
					}
					else {
						var newScore = CalcScore();
						if (newScore != orgScore)
							AddScore(newScore - orgScore);
					}
					if (bClear) {
						Studied.push(CurrentPuzzle.id);
						localStorage.setItem(Studied_name, JSON.stringify(Studied));
						localStorage.setItem(Score_name, Score);
						AddScore(200);
						DispClear(NextPuzzle);
						$("#clear_pazzle").get(0).play();
					}
					else {
						AutoSelect();
					}

				}
			}
		}
	}
	recognition.onstart = () => {
		$("#palette_button").addClass("active");
		rec_result = 0;
		recognizing = true;
	};
	recognition.onend = function() {
		$("#palette_button").removeClass("active");
		recognizing = false;
		CreateButtonPalette();
		if (rec_result == 0) {
			ons.notification.toast("聞き取れませんでした．", {timeout: 2000});
		}
	};
}

function StartRec()
{
	if(recognition) {
		if ($("#palette_button").hasClass("active"))
			return;
		if (Selected.chunk) {
			ClearButtonPalette();
			$("#palette_desc").css("font-size", "22px").text("マイクに向かってしゃべってください．");
			recognition.start();
		}
		else {
			Speech("Please select any cell.", false);
		}
	}
	else {
		ons.notification.toast('この機種は音声認識をサポートしていません。', {timeout: 2000});
	}
}
