uploaded
raterJs
	^ '
$(function() {
	$(''input[type=radio].ratingRadio'').change(function() {
		$($(''input[type=radio][name="''+this.name+''"]'').parent()).addClass("unselected");
		$(this.parentNode).removeClass("unselected");
		$("[id=''"+this.name+"'']").val($(this).val());
	});
});'