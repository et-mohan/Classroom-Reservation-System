 
function remove_entry(redir_cont){
	
	if(confirm("Do you really want to remove entry?")){
		window.location=base_url+"index.php/"+redir_cont;
	}
	
}



function updategroup(vall,gid){
	 
	var formData = {group_name:vall};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/user/update_group/"+gid,
		success: function(data){
		$("#message").html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}

function updategroupprice(vall,gid){
	 
	var formData = {price:vall};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/user/update_group/"+gid,
		success: function(data){
		$("#message").html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}


function updategroupvalid(vall,gid){
	 
	var formData = {valid_day:vall};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/user/update_group/"+gid,
		success: function(data){
		$("#message").html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}



function updatecategory(vall,cid){
	 
	var formData = {category_name:vall};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/qbank/update_category/"+cid,
		success: function(data){
		$("#message").html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}



function getexpiry(){
	 var gid=document.getElementById('gid').value;
	var formData = {gid:gid};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/user/get_expiry/"+gid,
		success: function(data){
		$("#subscription_expired").val(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}


function updatelevel(vall,lid){
	 
	var formData = {level_name:vall};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/qbank/update_level/"+lid,
		success: function(data){
		$("#message").html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}



function hidenop(vall){
	if(vall == '1' || vall=='2' || vall=='3'){
		$("#nop").css('display','block');
	}else{
	$("#nop").css('display','none');
	}
}



function addquestion(quid,qid){
	 var did='#q'+qid;
	var formData = {quid:quid};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/quiz/add_qid/"+quid+'/'+qid,
		success: function(data){
		$(did).html(document.getElementById('added').value);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
	
}





 
var position_type="Up";
var global_quid="0";
var global_qid="0";
var global_opos="0";

function cancelmove(position_t,quid,qid,opos){
save_answer(qn);
position_type=position_t;
global_quid=quid;
global_qid=qid;
global_opos=opos;

if((document.getElementById('warning_div').style.display)=="block"){
document.getElementById('warning_div').style.display="none";
}else{
document.getElementById('warning_div').style.display="block";
if(position_type=="Up"){
var upos=parseInt(global_opos)-parseInt(1);
}else{
var upos=parseInt(global_opos)+parseInt(1);
}
document.getElementById('qposition').value=upos;

}

}


function movequestion(){

var pos=document.getElementById('qposition').value;

if(position_type=="Up"){
var npos=parseInt(global_opos)-parseInt(pos);
window.location=base_url+"index.php/quiz/up_question/"+global_quid+"/"+global_qid+"/"+npos;
}else{
var npos=parseInt(pos)-parseInt(global_opos);
window.location=base_url+"index.php/quiz/down_question/"+global_quid+"/"+global_qid+"/"+npos;
}
}



function no_q_available(lid){
	var cid=document.getElementById('cid').value;
	
		var formData = {cid:cid};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/quiz/no_q_available/"+cid+'/'+lid,
		success: function(data){
		$('#no_q_available').html(data);
			
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
}




// quiz attempt functions 

var noq=0;
var qn=0;
var lqn=0;

function fide_all_question(){
	
	for(var i=0; i < noq; i++){
		
		var did="#q"+i;
	$(did).css('display','none');
	}
}


function show_question(vqn){
	change_color(vqn);
	fide_all_question();
	var did="#q"+vqn;
	$(did).css('display','block');
	// hide show next back btn
	if(vqn >= 1){
	$('#backbtn').css('visibility','visible');
	}
	
	if(vqn < noq){
	$('#nextbtn').css('visibility','visible');
	}
	if((parseInt(vqn)+1) == noq){
	  
	$('#nextbtn').css('visibility','hidden');
	}
	if(vqn == 0){
	$('#backbtn').css('visibility','hidden');
	}
	
	// last qn
	qn=vqn;
lqn=vqn;
setIndividual_time(lqn);
save_answer(lqn);
	
}

function show_next_question(){

//alert("hi");
	
	if((parseInt(qn)+1) < noq){
	fide_all_question();
	qn=(parseInt(qn)+1);
	var did="#q"+qn;
	$(did).css('display','block');
	}

	//alert(qn);
	// hide show next back btn
	if(qn >= 1){
	$('#backbtn').css('visibility','visible');
	}
	if((parseInt(qn)+1) == noq){
	$('#nextbtn').css('visibility','hidden');
	}

	//alert(lqn);
	change_color(lqn);
	setIndividual_time(lqn);
	save_answer(lqn);
	
	// last qn

	lqn=qn;	
	
		
}
function show_back_question(){
	
	if((parseInt(qn)-1) >= 0 ){
	fide_all_question();
	qn=(parseInt(qn)-1);
	var did="#q"+qn;
	$(did).css('display','block');
	}
	// hide show next back btn
	if(qn < noq){
	$('#nextbtn').css('visibility','visible');
	}
	if(qn == 0){
	$('#backbtn').css('visibility','hidden');
	}
	change_color(lqn);
	setIndividual_time(lqn);
	save_answer(lqn);
	
	// last qn
	lqn=qn;	
		
}


function change_color(qn){
	var did='#qbtn'+qn;
	var q_type='#q_type'+lqn;
	
	// if not answered then make red
	// alert($(did).css('backgroundColor'));
	if($(did).css('backgroundColor') != 'rgb(68, 157, 68)' && $(did).css('backgroundColor') != 'rgb(236, 151, 31)'){
	$(did).css('backgroundColor','#c9302c');
	$(did).css('color','#ffffff');
	}
	
	// answered make green
	if(lqn >= '0' && $(did).css('backgroundColor') != 'rgb(236, 151, 31)'){
	var ldid='#qbtn'+lqn;
		
		if($(q_type).val()=='1' || $(q_type).val()=='2'){
		var green=0;
		for(var k=0; k<=10; k++){
			var answer_value="answer_value"+lqn+'-'+k;
			if(document.getElementById(answer_value)){
				if(document.getElementById(answer_value).checked == true){	
				green=1;
				}
			}
		}
		if(green==1){			
		$(ldid).css('backgroundColor','#449d44');
		$(ldid).css('color','#ffffff');	
		}		
		}		
 		
		if($(q_type).val()=='3' || $(q_type).val()=='4'){
		var answer_value="#answer_value"+lqn;

		alert(answer_value);

		if($(answer_value).val()!=''){			
		$(ldid).css('backgroundColor','#449d44');
		$(ldid).css('color','#ffffff');	
		}
		}		
 		
		if($(q_type).val()=='5'){
			var green=0;
			for(var k=0; k<=10; k++){
				var answer_value="answer_value"+lqn+'-'+k;
				if(document.getElementById(answer_value)){
					if(document.getElementById(answer_value).value != '0'){	
					green=1;
					}
				}
			}
			if(green==1){			
			$(ldid).css('backgroundColor','#449d44');
			$(ldid).css('color','#ffffff');	
			}		
		}		
		
	}
	
}


// clear radio btn response
function clear_response(){
var q_type='#q_type'+qn;
		
		if($(q_type).val()=='1' || $(q_type).val()=='2'){
		 
		for(var k=0; k<=10; k++){
			var answer_value="answer_value"+lqn+'-'+k;
			
			if(document.getElementById(answer_value)){
				
				if(document.getElementById(answer_value).checked == true){
					
				document.getElementById(answer_value).checked=false;
				}
			}
		}
	 		
		}	
		
		if($(q_type).val()=='3' || $(q_type).val()=='4'){
		var answer_value="answer_value"+qn;
		document.getElementById(answer_value).value='';
		}	
		
		
		
		if($(q_type).val()=='5'){
			 
			for(var k=0; k<=10; k++){
				var answer_value="answer_value"+qn+'-'+k;
				if(document.getElementById(answer_value)){
					if(document.getElementById(answer_value).value != '0'){	
					document.getElementById(answer_value).value='0';
					}
				}
			}
		 		
		}			
	var did='#qbtn'+qn;
	$(did).css('backgroundColor','#c9302c');
	$(did).css('color','#ffffff');
}

var review_later;
function review_later(){

	//alert("hi");
	
 
	if(review_later[qn] && review_later[qn]){
	
		review_later[qn]=0;
		var did='#qbtn'+qn;
	$(did).css('backgroundColor','#c9302c');
			$(did).css('color','#ffffff');	
	}else{
		//alert(qn);
		review_later[qn]=1;
	var did='#qbtn'+qn;
	$(did).css('backgroundColor','#ec971f');
	$(did).css('color','#ffffff');
	}
	
}




function save_answer(qn){
	//alert("save answer");
							// signal 1
							$('#save_answer_signal1').css('backgroundColor','#00ff00');
								setTimeout(function(){
							$('#save_answer_signal1').css('backgroundColor','#666666');		
								},5000);
								
								    var str = $( "form" ).serialize();
 
 
						var formData = {user_answer:str};

						//alert(qn);
						$.ajax({
							 type: "POST",
							 data : str,
								url: base_url + "/RETest/save_answer/",
							success: function(data){
							//alert(data);
							$('#save_answer_signal2').css('backgroundColor','#00ff00');
								setTimeout(function(){
							$('#save_answer_signal2').css('backgroundColor','#666666');		
								},5000);
								
								},
							error: function(xhr,status,strErr){
								//alert(status);
								
							// signal 1
							$('#save_answer_signal2').css('backgroundColor','#ff0000');
								setTimeout(function(){
							$('#save_answer_signal2').css('backgroundColor','#666666');		
								},5500);

								}	
							});
	 		
		 
	
}


function setIndividual_time(cqn='0'){
		  if(cqn=='0'){
		ind_time[qn]=parseInt(ind_time[qn])+parseInt(ctime);	
		 
		  }else{
			  
			ind_time[cqn]=parseInt(ind_time[cqn])+parseInt(ctime);	
		  
		  }
	
	ctime=0;
	  
	 document.getElementById('individual_time').value=ind_time.toString();
	 
	 var iid=document.getElementById('individual_time').value;
	 
	 	 
	var formData = {individual_time:iid};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "RETest/set_ind_time",
		success: function(data){
	 	
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});
		
}




function submit_quiz(){
	
	save_answer(qn);
	setIndividual_time(qn);
	window.location.href = base_url+"/RETest/submit_quiz/";
	//window.location=base_url+"/RETest/submit_quiz/";
}



function switch_category(c_k){
	
	var did=document.getElementById(c_k).value;
	show_question(did);
	
}


function count_char(answer,span_id){
	var chcount=answer.split(' ').length;
	if(answer == ''){
		chcount=0;
	}
	document.getElementById(span_id).innerHTML=chcount; 
	
}



function sort_result(limit,val){
	window.location=base_url+"index.php/result/index/"+limit+"/"+val;
	
}


function assign_score(rid,qno,score){
	 var evaluate_warning=	document.getElementById('evaluate_warning').value;
	 if(confirm(evaluate_warning)){
	var formData = {rid:rid};
	$.ajax({
		 type: "POST",
		 data : formData,
			url: base_url + "index.php/quiz/assign_score/"+rid+'/'+qno+'/'+score,
		success: function(data){
	 	var did="#assign_score"+qno;
		$(did).css('display','none');
			},
		error: function(xhr,status,strErr){
			//alert(status);
			}	
		});	
	 }
}



function show_question_stat(id){
	var did="#stat-"+id;
	 
	if($(did).css('display')=='none'){
		$(did).css('display','block');
	}else{
		$(did).css('display','none');
	}
	 
}

function getqb(){

	
	var topic_id = $('#topic_id').val();

	//alert("Hi");

	if(topic_id != '')
  {
	$.ajax({
		 type: "POST",
		 data:{topic_id:topic_id},
			url:"http://localhost:81/examcell/Exam/fetch_qb/"+topic_id,
		success: function(data){
				//	alert(data);
					$('#qb_id').html(data);

			}
		});
}
else
{
	$('#qb_id').html('<option value="">Select QB</option>');
}
	
}



 

// end - quiz attempt functions 