(function() {
    function CollectionCtrl(Fixtures) {
        // append images with loop
        this.albums = Fixtures.getCollection(12);
    };
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();