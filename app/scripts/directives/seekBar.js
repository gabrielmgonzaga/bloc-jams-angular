(function() {
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @desc calculates horizontal percent along the seek bar where the event occurs
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1,offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0; // currently playing song time or current volume
                scope.max = 100; // max value for song and volume
                
                /**
                * @desc holds element that matches the directive <seek-bar> as a jQuery object so we can call jQuery methods on it
                */
                var seekBar = $(element);
                
                /**
                * @function percentString
                * @desc calculates percent based on the value and max value of a seek bar
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + '%';
                };
                
                /**
                * @function fillStyle
                * @desc returns the width of the seek bar fill element based on the calculated percent
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function thumbStyle
                * @desc updates the position of the seekbar thumb
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @desc updates the seek bar value based on the seek bars width and the location of the users click on the seek bar
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function trackThumb
                * @desc uses $apply to constantly apply the change in value of scope.value as the user drags the seekbar thumb
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular 
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar])
})();