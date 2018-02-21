/*Test.js*/
(function ($) {
    /*
    	var dataTable = function () {
    		var fnObj= {
    			addEvents: function () {
    				$(document).ready(function(){
    					alert("hello world");
    				});
    			}
    		}
    		function start() {
    			fnObj.addEvents();
    		}
    		return {
    			start: start
    		}
    	};
    	
    	var dataTableObj = new dataTable();
    	d.start();
    	//dataTable().start();*/


})(jQuery);

$(document).ready(function () {
    $('#example').DataTable();

    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

});