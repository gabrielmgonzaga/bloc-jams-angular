(function() {
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
        
    function CollectionCtrl(Fixtures) {
        // append images with loop
        this.albums = Fixtures.getCollection(1);

    };

})();
