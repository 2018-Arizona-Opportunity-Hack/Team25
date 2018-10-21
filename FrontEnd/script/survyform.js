jQuery(".draggable").draggable({
  start: function(event, ui) {
    // flag to indicate that we want to remove element on drag stop
    //ui.helper.removeMe = true;
  },
  stop: function(event, ui) {
    // remove draggable if flag is still true
    // which means it wasn't unset on drop into parent
    // so dragging stopped outside of parent
    // if (ui.helper.removeMe) {
    //   ui.helper.remove();
    // }
  },
  // move back if dropped into a droppable
  revert: 'valid'
});

jQuery("#droppable").droppable({
  drop: function(event, ui) {
    // unset removeMe flag as child is still inside parent
    //ui.helper.removeMe = false;
    if(jQuery(ui.draggable[0]).is('.questiontype')){
    	addQuestion(ui.draggable[0].id);
    }
    
  }
});

function addQuestion(type){
	console.log("Adding question of type", type);
	jQuery(".questiondialog").show();
	jQuery("#selqtype").val(type);

	jQuery("#radiooptionspace").css("display", "none");
	jQuery("#sliderspace").css("display", "none");
	jQuery("#multiplechoicespace").css("display", "none");
	jQuery("#openendedspace").css("display", "none");

	if(type == "1"){
		jQuery("#radiooptionspace").css("display", "block");
	}else if(type == "2"){
		jQuery("#sliderspace").css("display", "block");
		var handle = jQuery( "#custom-handle" );
		jQuery("#dummyslider").slider({
		      value:1,
		      min: 0,
		      max: 10,
		      step: 1,
			create: function() {
				handle.text( jQuery( this ).slider( "value" )+" / 10" );
			},
			slide: function( event, ui ) {
				handle.text( ui.value + " / 10" );
			}});
	}else if(type == "3"){
		jQuery("#multiplechoicespace").css("display", "block");
	}else if(type == "4"){
		jQuery("#openendedspace").css("display", "block");
	}

}
function addradrow(ele){
	jQuery(ele).parent().after("<div><input type='text' value='enter new option '/><div id='addradrow' class='addradrow btn' onclick=addradrow(this)>+</div><div id='delradrow' class='btn' onclick='delradrow(this)'>-</div></div>")
}
function delradrow(ele){
	jQuery(ele).parent().remove();
}
qctr = 0;
function appendQuestion(type){
	elem = '<div class="qtext" id="q'+qctr+'">'+jQuery('#qtext').val()+'</div>'
	
	if(type == 1){
		select = '';
		opts = jQuery('#radiooptionspace').find("input");
		jQuery.each(opts, function(k, v){
			select += '<input type="radio" name="r'+qctr+'" value="'+jQuery(v).val()+'">'+jQuery(v).val()+'</input>';
		});
		elem += select;
		jQuery('.questions').append('<li>'+elem+'</li>');
	}else if(type == 2){
		select = '<div id="slider'+qctr+'" style="width:50%;"></div>';
		select += '<div id="custom-handle'+qctr+'" style="width:50%;"></div>';
		elem += select;
		jQuery('.questions').append('<li>'+elem+'</li>');
		var handle = jQuery( "#custom-handle"+qctr );
		jQuery("#slider"+qctr).slider({
		      value:1,
		      min: 0,
		      max: 10,
		      step: 1,
			create: function() {
				handle.text( jQuery( this ).slider( "value" )+" / 10" );
			},
			slide: function( event, ui ) {
				handle.text( ui.value + " / 10" );
			}});
	}else if(type == 3){
		select = '';
		opts = jQuery('#multiplechoicespace').find("input");
		jQuery.each(opts, function(k, v){
			select += '<input type="checkbox" name="c'+qctr+'" value="'+jQuery(v).val()+'">'+jQuery(v).val()+'</input>';
		});
		elem += select;
		jQuery('.questions').append('<li>'+elem+'</li>');
	}else if(type == 4){
		select = '<textarea style="width:100%;" rows=4></textarea>';
		elem += select;
		jQuery('.questions').append('<li>'+elem+'</li>');
	}
	qctr+=1;
	
	jQuery(".questiondialog").hide();
}
function closedialog(){
	jQuery(".questiondialog").hide();
}
jQuery( "#sortable" ).sortable();
jQuery( "#sortable" ).disableSelection();
jQuery( ".questiondialog" ).draggable();