function seperateALL(x){
 x = x.split(/([0-9]*)/g) ;
 x.pop(); x.shift(); return x ;
}

function operator(a,b,op){
	switch (op){
		case '.' : return (a.toString()+'.'+b.toString());
		case '/' : return parseFloat(a) / parseFloat(b) ;
		case '*' : return parseFloat(a) * parseFloat(b) ;
		case '+' : return parseFloat(a) + parseFloat(b) ;
		case '-' : return parseFloat(a) - parseFloat(b) ;
		
	}
}

function solveOperator(Arr, sym){
	if (Arr.indexOf(sym)>=0) {
		var i = Arr.indexOf(sym);
		Arr[i] = operator(Arr[i-1],Arr[i+1],sym) ;
		Arr.splice(i-1,1) ; Arr.splice(i,1) ;
		return solveOperator(Arr, sym) ;
	} else return Arr ;
}

function solve(str){
	return solveOperator(
			solveOperator(
				solveOperator(
					solveOperator(
						solveOperator(seperateALL(str),'.'),'/'),'*'),'+'),'-')[0];
}

jQuery(document).ready(function($){
	$('.key').click(function(e){
		$('#disp').append($(this).text());
	});
	$('#dot').click(function(e){
		$('#disp').append('.');
	});

	$('#equals').click(function(e){
		try{
			var equation = $('#disp').text() ;
			var solved = solve(equation);
			$('#disp').text(solved);
		} catch(e){
			console.error(e);
			$('#disp').text('syntax error');
		}
	});

	$('#clear').click(function(e){
		$('#disp').html('&nbsp;');
	});

	$('#delete').click(function(e){
		var s = $('#disp').text();
		$('#disp').text(s.substr(0,s.length-1));
	});
});